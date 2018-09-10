// getStorage();

var NewCard = function(id , title , body , quality) {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = quality;
  return `<div id="${id}" class="card-container">
            <h2 class="title-of-card" contenteditable="true"> 
              ${title} 
            </h2>
            <button class="delete-button circle-button"></button>
            <p class="body-of-card" contenteditable="true">
              ${body} 
            </p>
            <div class="voting-div">
              <button class="upvote circle-button"></button> 
              <button class="downvote circle-button"></button> 
              <p class="quality"> quality: <span class="quality-variable">${quality}</span>  
              </p>
            </div>
            <hr> 
          </div>`;
};

function cardObject() {
    return {
        title: $('#title-input').val(),
        body: $('#body-input').val(),
        quality:'swill'
    };
}

// $.each(localStorage, function(key) {
//     var cardData = JSON.parse(this);
//     $( ".card-section" ).prepend(NewCard(key, cardData.title, cardData.body, cardData.quality));
// });


// function localStoreCard() {
//   var cardString = JSON.stringify(cardObject());
//   localStorage.setItem('card', cardString);
// }

// // function getStorage() {
// //   localStorage.getItem('card', cardString);
// //   parse(cardString);

// // }

// function getStorage() {
//   var cards = [];
//   var storedCards = Object.keys(localStorage);
//   storedCards.forEach(function(card) {
//     cards.push(JSON.parse(localStorage.getItem(card)));
//   // for (var i = 0; i < storedCards.length; i++) {
//   //   cards.push(JSON.parse(localStorage.getItem(card)))
//   });
//   renderCards(cards);
// };

// function renderCards(cards) {
//   cards.forEach(function(card) {
//     $('.card-section').prepend(card)
//   });
//   // var card = 
//   // for (var i = 0; i < cards.length; i++) {
//   //   cards.prepend(card);
//   }

$('#title-input').on('keyup', function() {
  checkInputs();
})

$('#body-input').on('keyup', function() {
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

$('.save-btn').on('click', function(event) {
    event.preventDefault();
    if (checkInputs()) { 
    $( ".card-section" ).prepend(NewCard('id', $('#title-input').val(), $('#body-input').val(), 'swill')); 
    // localStoreCard();
    $('form')[0].reset();
    $('.save-btn').attr('disabled', true);
 }else {
  return 
 }
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
  var quality = $(event.target).closest('.card-container').find('.quality-variable')[0];
  if ($(quality).text() === 'swill') {
    $(quality).text('plausible');
    return 'plausible';
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('genius');
    return 'genius'
  } else {
    return;
  }
}
function downVote() {
  var quality = $(event.target).closest('.card-container').find('.quality-variable')[0];
  if ($(quality).text() === 'genius') {
    $(quality).text('plausible');
    return 'plausible';
  } else if ($(quality).text() === 'plausible') {
    $(quality).text('swill');
    return 'swill'
  } else {
    return;
  }
}

// $(".card-section").on('click', function(event){


//   var cardHTML = $(event.target).closest('.card-container');
//   var cardHTMLId = cardHTML[0].id;
//   var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//   var cardObjectInJS = JSON.parse(cardObjectInJSON);

//   cardObjectInJS.quality = qualityVariable;

//   var NewCardJSON = JSON.stringify(cardObjectInJS);
//   localStorage.setItem(cardHTMLId, NewCardJSON);
//   }
   
// });
      

$('.card-section').on('click', function(event) {
  if ($(event.target).hasClass('delete-button')) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  var cardHTMLId = cardHTML[0].id;
  localStorage.removeItem(cardHTMLId);
  } else {
   return;
  }
});

