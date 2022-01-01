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

let hasOpenedCard = false;
let firstCard , secondCard;
let first , second ;

const openedCard = (c, m) => {
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

const checkForMatch = () => {
    if(first == second){
        firstCard.classList.add("match");
        secondCard.classList.add("match");
        // firstCard.removeEventListener("click", (event));
    } else {
        setTimeout(() => {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        }, 1000);
    }
} 

//Variables
let time = 0;
let timerId = 0;
let timerOut = true;
//Elements in a variable
const restart = document.querySelector("#restart");
const timer = document.querySelector("#timer");
//use this function to start the timer
const initClock = () => {
    timerOut = false;
    timerId = setInterval(() => {
        time++;
        timerCount();
    }, 1000);
}
//this function update the timer values
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



const cards = document.querySelectorAll(".card");
for (const card of cards){
    card.addEventListener("click", (event) => {
        let cardChildClass = event.target.firstElementChild.classList.value;
        openedCard(card, cardChildClass);
        if(timerOut){
            initClock();
        }
    });
};

restart.addEventListener("click", function(){
    stopClock();
    timerOut = true;
    time = 0;
    timerCount();
    // add restart the whole game not just the timer 
});

//functions





// event listeners