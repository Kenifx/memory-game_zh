//Array of unique card names
const cardNames = ['anchor', 'diamond', 'bomb', 'leaf', 'bolt', 'bicycle', 'paper-plane-o', 'cube'];
//Create full card deck with duplicate card names
const cardDeck = [...cardNames, ...cardNames];

//Variables
let moves = 0;
let starRating = 3;
let openedCards = [];

let now = 0;
let interval = null;
const timer = document.querySelector('.timer');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//Deal cards by shuffling cards, then create HTML fragment for 'ul.deck'
function dealCards() {
  shuffle(cardDeck);
  const fragment = document.createDocumentFragment();

  for (card of cardDeck) {
    const cardContainer = document.createElement('li');
    cardContainer.classList.add('card');
    cardContainer.dataset.cardName = card;
    cardContainer.innerHTML = `<i class="fa fa-${card}"></i>`;
    fragment.appendChild(cardContainer);
  }
  document.querySelector('.deck').appendChild(fragment);
}

// Move-counter functions: reset, increment, print
function resetMoves() {
  moves = 0;
  printMoves();
}

function incrementMoves() {
  ++moves;
  printMoves();

  if(moves > 20 && rateMoves());
}

function printMoves() {
  document.querySelector('.moves').textContent = moves;
}

// Star-rating functions; calculate rating, print, and reset
function rateMoves() {
  moves <= 32 ? (starRating = 2) : (starRating = 1);
  printRating();
}

function printRating() {
  const stars = document.querySelectorAll('.stars .fa-star');

  for (i = starRating; i < stars.length; i++) {
    stars[i].classList.replace('fa-star', 'fa-star-o');
  }
}

function resetRating() {
  const stars = document.querySelectorAll('.stars .fa-star-o');

  for (i = 0; stars.length > 0 && i < stars.length; i++) {
    stars[i].classList.replace('fa-star-o', 'fa-star');
  }
}

// Functions to validate if game is won, with callback if true
function winGame() {
  const totalTime = getTime();
  stopTimer();

  setTimeout(
    function() {
      alert(`
        Woohoo! All cards have matched!
        You did it in ${moves} moves and your star rating is ${starRating} stars.
        That took you ${totalTime} in total.`);
    }, 800
  )
}

function checkIfWon() {
  const matched = document.querySelectorAll('.match');
  if (matched.length === cardDeck.length) {
    winGame();
  }
}

//FUNCTION USED FOR TESTING WINNNING SCENARIO
// function forceWin() {
//   const cards = document.querySelectorAll('.card');
//   cards.forEach(function(value, index, listObj){
//     value.classList.remove('open', 'show');
//     value.classList.add('match');
//   })
//   checkIfWon();
// }


//Listener function to open card when .card is clicked and validation to see if cards match
function validateCard() {

  const cards = document.querySelectorAll('.open.show');

  if (openedCards[0] === openedCards[1]) {
    console.log('Cards match!');
    cards.forEach(function(value, index, listObj) {
      value.classList.remove('open', 'show');
      value.classList.add('match');
    })

    checkIfWon();

  } else {
    console.log('Card DO NOT match!');
    setTimeout(function() {
      cards.forEach(function(value, index, listObj) {
        value.classList.remove('open', 'show');
      })
    }, 500)
  }
  openedCards.length = 0;
}

function openCard(event) {
  const clickedElement = event.target;

  if (clickedElement.matches('.card') && !clickedElement.classList.contains('match') && !clickedElement.classList.contains('open')) {

    clickedElement.classList.toggle('open');
    clickedElement.classList.toggle('show');

    incrementMoves();
    openedCards.push(clickedElement.dataset.cardName);
    if (openedCards.length == 2) {
      validateCard();
    }
  }
}

//Restart function; empties 'ul.deck', resets move-counter and redeals the cards.
function restart() {
  openedCards.length = 0;
  document.querySelector('.deck').innerHTML = '';
  resetMoves();
  resetTimer();
  resetRating();
  dealCards();

  document.querySelector('.deck').addEventListener('click', startTimer, {
    once: true
  });
}

//Timer functions adapted from: codepen.io/pianoace/pen/YJOrMz
function getTime() {

  let elapsedMil = Date.now() - now;
  let mil = (elapsedMil).toFixed(0) % 100;
  let sec = Math.floor(elapsedMil / 1000) % 60;
  let min = Math.floor(elapsedMil / 60000) % 60;

  mil = padTime(mil);
  sec = padTime(sec);
  min = padTime(min);

  function padTime(num) {
    if (num < 10) {
      num = '0' + num;
    }
    return num;
  }

  let time = min + ':' + sec + ':' + mil;
  return time;
}

function printTime() {
  time = getTime();
  timer.textContent = time;
}

function startTimer() {
  now = Date.now();
  interval = window.setInterval(printTime, 10);
}

function stopTimer() {
  window.clearInterval(interval);
}

function resetTimer() {
  stopTimer();
  timer.textContent = '00:00:00';
}



dealCards();

document.querySelector('.deck').addEventListener('click', openCard);

document.querySelector('.deck').addEventListener('click', startTimer, {
  once: true
});

document.querySelector('.restart').addEventListener('click', restart);