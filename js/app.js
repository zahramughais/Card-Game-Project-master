function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    array[randomIndex].style.order = randomIndex;
    }
    return array;
}

// varible
// game varibles 
let hasOpenedCard = false;
let firstCard , secondCard;
let first , second;
let lockBorad = false;

// timer varibles 
let time = 0;
let timerId = 0;
let timerOut = true;

// moves varibles 
let clicksCount = 0;

//Elements in a variable
let cards = document.getElementsByClassName("card");
const restart = document.querySelector("#restart");
const timer = document.querySelector("#timer");
let hearts = document.querySelectorAll(".bi-heart-fill");
let moves = document.querySelector("#moves");
const cardToShuffle = document.querySelectorAll("#deck li");

//shuffling array
let arr = Array.from(cardToShuffle);

// functions
// starting the game
const startGame = () => {
    let allCards = [];
    for (let i = 0; i < cards.length; i++){
        cards[i].classList.remove("open", "match");
        allCards.push(cards[i]);
    }
    reShuffle();
}
//reshuffling
function reShuffle(){
    let shuffled =  shuffle(arr);
    for(let card of shuffled){
        deck.appendChild(card);
    }
}
reShuffle();
// opening cards
const openedCard = (c, m) => {
    if (lockBorad) return;
    c.classList.toggle("open");
    if (!hasOpenedCard){
        hasOpenedCard = true;
        firstCard = c;
        first = m;
    } else {
        hasOpenedCard = false;
        secondCard = c;
        second = m;
        moveCounter();
        checkForMatch();
    }
}

// checking for a match
const checkForMatch = () => {
    if(first == second){
        firstCard.classList.add("match");
        secondCard.classList.add("match");
    } else {
        lockBorad = true;
        setTimeout(() => {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        lockBorad = false;
        }, 500);
    }
} 

//start the timer
const initClock = () => {
    timerOut = false;
    timerId = setInterval(() => {
        time++;
        timerCount();
    }, 1000);
}

//update the timer values
const timerCount = () => {
    const min = Math.floor(time/60);
    const sec = time%60;
    if (sec < 10){
        timer.innerHTML = `${min}:0${sec}`;
    } else {
        timer.innerHTML = `${min}:${sec}`;
    }
}

// stop and clear the timer
const stopClock = () => {
    clearInterval(timerId);    
}

// adding time listener to the cards  
for (const card of cards){
    card.addEventListener("click", (event) => {
        if (!card.classList.contains("open")){
            let cardChildClass = event.target.firstElementChild.classList.value;
            openedCard(card, cardChildClass);
        }
        if(timerOut){
            initClock();
        }
    });
};

// restarting the game 
restart.addEventListener("click", function(){
    // restarting the timer
    stopClock();
    timerOut = true;
    time = 0;
    timerCount();
    //restartig the moves 
    clicksCount = 0;
    moves.innerHTML = `${clicksCount} moves` ;
    for (var i= 0; i < hearts.length; i++){
        hearts[i].style.visibility = "visible";
    }
    //shuffle the cards 
    startGame();
});

// counting the moves 
const moveCounter = () => {
    clicksCount ++;
    moves.innerHTML = `${clicksCount} moves` ;
    if (clicksCount > 7 && clicksCount < 14){
        for( i= 0; i < 3; i++){
            if(i > 1){
                hearts[i].style.visibility = "collapse";
            }
        }
    }
    else if (clicksCount > 15){
        for( i= 0; i < 3; i++){
            if(i > 0){
                hearts[i].style.visibility = "collapse";
            }
        }
    }
}