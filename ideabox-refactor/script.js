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
                <hr> 
              </div>`
  $('.card-section').prepend(html);
}

function storeData(obj) {
  var stringifiedObj = JSON.stringify(obj);
  localStorage.setItem(obj.id, stringifiedObj);
}

function getDataStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    var getData = localStorage.getItem(localStorage.key(i));
    var parsedData = JSON.parse(getData);
    render(parsedData)
  }
}

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
})

function upVote() {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'swill') {
    $(quality).text('plausible');
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('genius');
  } 
}

function downVote() {
  var quality = $(event.target).closest('.card-container').find('.quality-variable');
  if ($(quality).text() === 'genius') {
    $(quality).text('plausible');
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('swill');
  } 
}


// // classic code
// $('.card-section').on('keyup', function(event) {
//   var cardHTML = $(event.target).closest('.card-container');
//   // var cardHTMLId = cardHTML[0].id;
//   var cardArray = [];
//   var stringyCard = JSON.stringify(cardHTML);
//   var cardObjectInJSON = localStorage.setItem(cardArray, stringyCard);
//   // var cardObjectInJS = JSON.parse(cardObjectInJSON);
//   // cardObjectInJS.quality = cardHTML.find('.quality-variable').text();
//   // debugger;

//   // // var NewCardJSON = JSON.stringify(cardObjectInJS);
//   // debugger;
//   // localStorage.setItem(cardHTMLId, NewCardJSON);
//   // debugger;
// })
      

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('delete-button')) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  localStorage.removeItem(cardHTML[0].id);
  } 
});

$('#title-input').on('input', function() {
  checkInputs();
})

$('#body-input').on('input', function() {
  checkInputs();
})

function checkInputs(){
  if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
    $('.save-btn').attr('disabled', false);
    return true;
  } else {
    return false;
  }
}
