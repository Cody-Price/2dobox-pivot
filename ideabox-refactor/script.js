// getStorage();

var NewCard = function(id , title , body , quality) {
  this.id = new Date().getTime();
  this.title = title;
  this.body = body;
  this.quality = quality;
  return `<div id="${id}" class="card-container">
            <h2 class="title-of-card"> 
              ${title} 
            </h2>
            <button class="delete-button circle-button"></button>
            <p class="body-of-card">
              ${body} 
            </p>
            <div class="voting-div">
              <button class="upvote circle-button"></button> 
              <button class="downvote circle-button"></button> 
              <p class="quality"> quality: <span class="qualityVariable">${quality}</span>  
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

function checkInputs(){
  if ($('#title-input').val() !== "" && $('#body-input').val() !== "") {
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
 }else {
  return 
 }
});



// $(".card-section").on('click', function(event){
//   var currentQuality = $($(event.target).siblings('p.quality').children()[0]).text().trim();
//   var qualityVariable;

//   if (event.target.className === "upvote" || event.target.className === "downvote"){

//     if (event.target.className === "upvote" && currentQuality === "plausible"){
//         qualityVariable = "genius";
//         $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
           
//     } else if (event.target.className === "upvote" && currentQuality === "swill") {
//         qualityVariable = "plausible";
//         $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);
           
//     } else if (event.target.className === "downvote" && currentQuality === "plausible") {
//         qualityVariable = "swill"
//         $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//     } else if (event.target.className === "downvote" && currentQuality === "genius") {
//         qualityVariable = "plausible"
//         $($(event.target).siblings('p.quality').children()[0]).text(qualityVariable);

//     } else if (event.target.className === "downvote" && currentQuality === "swill") {
//         qualityVariable = "swill";
    
//     } else if (event.target.className === "upvote" && currentQuality === "genius") {
//         qualityVariable = "genius";
//     }

//   var cardHTML = $(event.target).closest('.card-container');
//   var cardHTMLId = cardHTML[0].id;
//   var cardObjectInJSON = localStorage.getItem(cardHTMLId);
//   var cardObjectInJS = JSON.parse(cardObjectInJSON);

//   cardObjectInJS.quality = qualityVariable;

//   var NewCardJSON = JSON.stringify(cardObjectInJS);
//   localStorage.setItem(cardHTMLId, NewCardJSON);
//   }
   
// });
      

$(".card-section").on('click', function(event) {
  if ($(event.target).hasClass('delete-button')) {
  var cardHTML = $(event.target).closest('.card-container').remove();
  var cardHTMLId = cardHTML[0].id;
  localStorage.removeItem(cardHTMLId);
  } else {
   return;
  }
});









