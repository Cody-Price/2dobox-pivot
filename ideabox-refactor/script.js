$(document).ready(getDataStorage);

var NewCard = function(title , body, quality) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = quality;
};

function render(card) {
  var html = `<div id="${card.id}" class="card-container">
                <h2 class="title-of-card" contenteditable="true"> 
                  ${card.title} 
                </h2>
                <button class="delete-button circle-button"></button>
                <p class="body-of-card" contenteditable="true">
                  ${card.body} 
                </p>
                <div class="voting-div">
                  <button class="upvote circle-button"></button> 
                  <button class="downvote circle-button"></button> 
                  <p class="quality"> quality: <span class="quality-variable">${card.quality}</span>  
                  </p>
                </div>
                <button class="complete-btn">Completed Task</button> 
              </div>`;
  $('.card-section').prepend(html);
};

function updateCard(card, quality, targetId, title, body) {
  card.id = targetId;
  card.quality = quality;
  card.title = title;
  card.body = body;
  card.html = `<div id="${card.id}" class="card-container">
                <h2 class="title-of-card" contenteditable="true"> 
                  ${card.title} 
                </h2>
                <button class="delete-button circle-button"></button>
                <p class="body-of-card" contenteditable="true">
                  ${card.body} 
                </p>
                <div class="voting-div">
                  <button class="upvote circle-button"></button> 
                  <button class="downvote circle-button"></button> 
                  <p class="quality"> quality: <span class="quality-variable">${card.quality}</span>  
                  </p>
                </div>
                <button class="complete-btn">Completed Task</button>
              </div>`;
  return card;
};

function checkInputs(){
  if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
    $('.save-btn').attr('disabled', false);
    return true;
  } else {
    return false;
  }
};

function storeData(card) {
  var stringifiedCard = JSON.stringify(card);
  localStorage.setItem(card.id, stringifiedCard);
};

function getDataStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var getData = localStorage.getItem(localStorage.key(i));
    var parsedData = JSON.parse(getData);
    render(parsedData);
  };
};

function updateLocalStorage(card, quality, targetId, title, body) {
  updateCard(card, quality, targetId, title, body);
  storeData(card);
};

function upVote(quality) {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'None') {
    $(quality).text('Low');
    return 'Low'
  } else if ($(quality).text() === 'Low') {
    $(quality).text('Normal');
    return 'Normal'
  } else if ($(quality).text() === 'Normal') {
    $(quality).text('High');
    return 'High'
  } else if ($(quality).text() === 'High') {
    $(quality).text('Critical');
    return 'Critical'
  } else if ($(quality).text() === 'Critical') {
    return 'Critical'
  }
};

function downVote(quality) {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'Critical') {
    $(quality).text('High');
    return 'High'
  } else if ($(quality).text() === 'High') {
    $(quality).text('Normal');
    return 'Normal'
  } else if ($(quality).text() === 'Normal') {
    $(quality).text('Low');
    return 'Low'
  } else if ($(quality).text() === 'Low') {
    $(quality).text('None');
    return 'None'
  } else if ($(quality).text() === 'None') {
    return 'None'
  }
};

$('#title-input').on('input', function() {
  checkInputs();
});

$('#body-input').on('input', function() {
  checkInputs();
});

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var card = new NewCard($('#title-input').val(), $('#body-input').val(), 'None')
    render(card);
    $( ".card-section" ).prepend(card);
    storeData(card);
    $('form')[0].reset();
    $('.save-btn').attr('disabled', true);
});

$('#search-input').on('keyup', function(event) {
  var filterInput = $('#search-input').val().toLowerCase();
  var taskArray = $('.card-container');
  for (var i = 0; i < taskArray.length; i++) {
    if ($(taskArray[i].children[0]).text().toLowerCase().indexOf(filterInput) === -1 
      && $(taskArray[i].children[2]).text().toLowerCase().indexOf(filterInput) === -1) {
      $(taskArray[i]).slideUp();
    } else {
      $(taskArray[i]).slideDown();
    };
  };
});

$('.card-section').on('keyup', function(event) {
  var quality = $(event.target).siblings('.voting-div').children('.quality').children('.quality-variable').text();
  var targetId = $(event.target).parent().attr('id');
  var title = $(event.target).closest('.title-of-card').text() || $(event.target).siblings('.title-of-card').text();
  var body = $(event.target).siblings('.body-of-card').text() || $(event.target).closest('.body-of-card').text();
  var card = JSON.parse(localStorage.getItem(targetId));
  var text = $(event.target).text();
  if ($(event.target).hasClass('title-of-card')){
    updateLocalStorage(card, quality, targetId, text, body);
  }
  if ($(event.target).hasClass('body-of-card')){
    updateLocalStorage(card, quality, targetId, title, text);
  };
});

$('.card-section').on('click', function(event) {
  var targetId = $(event.target).parent().parent().attr('id');
  var quality;
  if ($(event.target).hasClass('upvote')) {
    quality = upVote('quality');
    var card = JSON.parse(localStorage.getItem(targetId));
    updateLocalStorage(card, quality, targetId, card.title, card.body);
  };
});

$('.card-section').on('click', function(event) {
  var targetId = $(event.target).parent().parent().attr('id');
  var quality;
  if ($(event.target).hasClass('downvote')) {
    quality = downVote('quality');
    var card = JSON.parse(localStorage.getItem(targetId));
    updateLocalStorage(card, quality, targetId, card.title, card.body); 
  };
});

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('delete-button')) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  localStorage.removeItem(cardHTML[0].id);
  } 
});

$('.card-section').on('click', function(event) {
  var card = $(event.target).closest('.card-container');
  if ($(event.target).hasClass('complete-btn')) {
  card.addClass('completed');
  card.children().addClass('completed');
  }
});
