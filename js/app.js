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

//Elements in a variable
const cards = document.getElementsByClassName("card");
const restart = document.querySelector("#restart");
const timer = document.querySelector("#timer");

//functions
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
        }, 750);
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
    stopClock();
    timerOut = true;
    time = 0;
    timerCount();
    // add restart the whole game not just the timer 
});
