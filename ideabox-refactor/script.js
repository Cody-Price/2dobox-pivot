$(document).ready(getDataStorage);

var NewCard = function(title , body, quality) {
  this.id = Date.now();
  this.title = title;
  this.body = body;
  this.quality = quality;
};

function render(data) {
  var html = `<div id="${data.id}" class="card-container">
                <h2 class="title-of-card" contenteditable="true"> 
                  ${data.title} 
                </h2>
                <button class="delete-button circle-button"></button>
                <p class="body-of-card" contenteditable="true">
                  ${data.body} 
                </p>
                <div class="voting-div">
                  <button class="upvote circle-button"></button> 
                  <button class="downvote circle-button"></button> 
                  <p class="quality"> quality: <span class="quality-variable">${data.quality}</span>  
                  </p>
                </div>
                <button class="complete-btn">Completed Task</button> 
              </div>`
  $('.card-section').prepend(html);
}

function storeData(card) {
  var stringifiedCard = JSON.stringify(card);
  localStorage.setItem(card.id, stringifiedCard);
}

function getDataStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var getData = localStorage.getItem(localStorage.key(i));
    var parsedData = JSON.parse(getData);
    render(parsedData)
  }
}

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
              </div>`
  return card;
}

function updateLocalStorage(card, quality, targetId, title, body) {
  updateCard(card, quality, targetId, title, body);
  storeData(card);
}

$('#search-input').on('keyup', function(event) {
  var filterInput = $('#search-input').val().toLowerCase();
  var taskArray = $('.card-container');
  for (var i = 0; i < taskArray.length; i++) {
    if ($(taskArray[i].children[0]).text().toLowerCase().indexOf(filterInput) === -1 
      && $(taskArray[i].children[2]).text().toLowerCase().indexOf(filterInput) === -1) {
      $(taskArray[i]).slideUp();
    } else {
      $(taskArray[i]).slideDown();
    }
  }
});

$('.card-section').on('keyup', function(event) {
  var quality = $(event.target).siblings('.voting-div').children('.quality').children('.quality-variable').text();
  var targetId = $(event.target).parent().attr('id');
  var title = $(event.target).closest('.title-of-card').text() || $(event.target).siblings('.title-of-card').text()
  var body = $(event.target).siblings('.body-of-card').text() || $(event.target).closest('.body-of-card').text()
  var card = JSON.parse(localStorage.getItem(targetId));
  var key = event.which || event.keyCode;
  var text = $(event.target).text();
  if ($(event.target).hasClass('title-of-card')){
    updateLocalStorage(card, quality, targetId, text, body);
  }
  if ($(event.target).hasClass('body-of-card')){
    updateLocalStorage(card, quality, targetId, title, text);
  }
});

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    var card = new NewCard($('#title-input').val(), $('#body-input').val(), 'swill')
    render(card);
    $( ".card-section" ).prepend(card);
    storeData(card);
    $('form')[0].reset();
    $('.save-btn').attr('disabled', true);
});


$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('upvote')) {
    upVote();
  }
})

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('downvote')) {
    downVote();
  }
});

function upVote() {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'swill') {
    $(quality).text('plausible');
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('genius');
  } 
};

function downVote() {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'genius') {
    $(quality).text('plausible');
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('swill');
  } 
};

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('complete-btn')) {
    markAsCompleted();
  }
});

function markAsCompleted(){
  $('.title-of-card').addClass('completed');
  $('.card-container').addClass('completed');
};

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('delete-button')) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  localStorage.removeItem(cardHTML[0].id);
  } 
});

$('#title-input').on('input', function() {
  checkInputs();
});

$('#body-input').on('input', function() {
  checkInputs();
});

function checkInputs(){
  if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
    $('.save-btn').attr('disabled', false);
    return true;
  } else {
    return false;
  }
};
