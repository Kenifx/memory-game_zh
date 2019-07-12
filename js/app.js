/*
 * 创建一个包含所有卡片的数组
 */

 let cardsArr =  ['fa fa-anchor', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube','fa fa-anchor', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube']
 

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
function displayCards(){
  //shuffle
  shuffle(cardsArr);
  //create HTML for each card and add 
  const fragment = document.createDocumentFragment();

  for (card of cardsArr){
    const cardFragment = document.createElement('li');
    cardFragment.classList.add('card');
    cardFragment.dataset.cardName = card;
    cardFragment.innerHTML = `<i class="${card}"></i>`;
    fragment.appendChild(cardFragment);
  }

  document.querySelector('.deck').appendChild(fragment);

}


// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
* 设置一张卡片的事件监听器。 如果该卡片被点击：
*  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
*  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
*  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
*    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
*    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
*    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
*    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
*/

//* 设置一张卡片的事件监听器。 如果该卡片被点击：



let openCards = [];

function openCard(event){
  const clickedCard = event.target;
  if (openCards.length != 2){
//if clicked card is not matched,
  if (clickedCard.matches('.card') && !clickedCard.classList.contains('open') && !clickedCard.classList.contains('match') ){
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');

    //counting every move
    countMoves();
    //
    openCards.push(clickedCard.dataset.cardName);
  }
    //when 2 cards are open, check match/unmatch
    if (openCards.length == 2){
      validateCards();
    }
  }
}

function validateCards(){
  const cards = document.querySelectorAll('.open.show');
//2 cards match checking
//Match scenario
if (openCards[0] === openCards[1]){
  cards.forEach(function(value){
    value.classList.remove('open','show');
    value.classList.add('match');
  })
  //check if win 
  winCheck();
  //No match scenario
} else{
  //if not matched, remove .open .show to revert it
  setTimeout(function(){
    cards.forEach(function(value){
      value.classList.remove('open','show');
      //console.log('card not match, remove tags');
    })
  }, 600)
  }
  //clear open cards
  openCards = [];
}

/** below are for move counter functions section */
let moves = 0;

//count every move
function countMoves(){
  moves++;
  showMoves();
  //rating logic
  if (moves >2){
    rating();
  }
  
}

//display moves count on screen
function showMoves(){
  document.querySelector('.moves').textContent = moves;
}

//reset move at restart
function resetMoves(){
  moves=0;
  showMoves();
}



/** below are for win check functions section */
function winCheck(){
  const matched = document.querySelectorAll('.match');
  //when all cards are matched
  if (matched.length === cardsArr.length ){
    //game is won
    winGame();
  }
}

function winGame(){
  const timeSpent = getTime();
  stopTimer();

  setTimeout(function(){
    alert(`Congrats! You have won the game with ${moves} moves and  took ${timeSpent}!`);
  },600)

}


//Below are for timer functions
const timer = document.querySelector('.timer');

function getTime(){
  let timeElapsed = Date.now() - startTime;
  let min = Math.floor(timeElapsed/(1000*60)) % 60;
  let sec = Math.floor(timeElapsed/1000) % 60;
  let mil = (timeElapsed % 100).toFixed(0);

  let time = min + ':' + sec + ':' + mil;
  return time;

}

//Below are for Timer functions
function startTimer(){
  startTime = Date.now();
  interval = window.setInterval(printTime, 20);
}

function printTime(){
  time = getTime();
  timer.textContent = time;
}

function stopTimer() {
  window.clearInterval(interval);
}

function resetTimer() {
  stopTimer();
  timer.textContent = '00:00:00';
}



//restart game function
function restart() {
  openCards.length = 0;
  document.querySelector('.deck').innerHTML = '';
  resetMoves();
  resetTimer();
  displayCards();

  stars.innerHTML = star + star + star;
  

  document.querySelector('.deck').addEventListener('click', startTimer, {
    once: true
  });
}

//Rating function
//try not to be too aggressive ;p
/*logic: if win game with <40 moves, 3 stars; 40<= moves <= 60 moves, 2 stars; >60, 1 star
*/
const stars = document.querySelector('.stars')
const star = `<li><i class="fa fa-star"></i></li>`;

function rating(){

  if (moves < 60){
    stars.innerHTML = star + star;
  } else {
    stars.innerHTML = star;
  }
}




//initiate game
displayCards();

document.querySelector('.deck').addEventListener('click', openCard);

document.querySelector('.deck').addEventListener('click', startTimer, {once: true});

//restart game
document.querySelector('.restart').addEventListener('click', restart);