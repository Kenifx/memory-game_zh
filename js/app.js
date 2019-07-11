/*
 * 创建一个包含所有卡片的数组
 */

 const cardsArr =  ['fa fa-anchor', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube']
 

/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */
function displayCards(){
  //shuffle
  shuffle(cardsArr);
  //create HTML for each card
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
document.querySelector('.deck').addEventListener('click', openCard);


let openCards = [];

function openCard(event){
  const clickedCard = event.target;
//if clicked card is not matched, 
  if (clickedCard.matches('.card') && !clickedCard.classList.contains('open') && !clickedCard.classList.contains('match') ){
    clickedCard.classList.toggle('open');
    clickedCard.classList.toggle('show');
    //每次点击的计数器

    //
    openCards.push(clickedCard.dataset.cardName);
    //当有2张卡片被点开时，验证2张卡片
    if (openCards.length ==  2){
      validateCards();
    }
  }
  )
}

function validateCards(){
//
if (openCards[0] === openCards[1]){
  
}
}