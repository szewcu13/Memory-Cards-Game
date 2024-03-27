const moves = document.getElementById('moves-count');
const timer = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const gameBox = document.querySelector('.game-box');
const result = document.getElementById('result');
const controls = document.querySelector('.controls-box');

let cards;
let interval;
let firstCard = false;
let secondCard = false;

//
// ARRAY
//

const picture = [
	{ name: "basketball", image: "./img/basketball.png" },
	{ name: "bicycle", image: "./img/bicycle.png" },
	{ name: "burger", image: "./img/burger.png" },
	{ name: "shoes", image: "/img/shoes.png" },
	{ name: "television", image: "./img/television.png" },
	{ name: "toy-train", image: "./img/toy-train.png" },
	{ name: "box", image: "./img/box.png" },
	{ name: "tree", image: "./img/tree.png" },
    { name: "seater-sofa", image: "./img/seater-sofa.png" },
	{ name: "pizza", image: "./img/pizza.png" },
	{ name: "car", image: "./img/car.png" },
	{ name: "house", image: "./img/house.png" },
	{ name: "airplane", image: "./img/airplane.png" },
	{ name: "cargo-ship", image: "./img/cargo-ship.png" },
	{ name: "shiba", image: "./img/shiba.png" },
	{ name: "cat", image: "./img/cat.png" }	
];

//
// TIME
//

let seconds = 0;
let minutes = 0;

//
// MOVESNUMBER AND WIN COUNT
//

let movesNumber = 0;
let winCount = 0;

//
// TIMER
//

const timeGenerator = () => {
	seconds += 1;

	if (seconds >= 60) {
		minutes += 1;
		seconds = 0;
	}

	let secondsTime = seconds < 10 ? `0${seconds}` : seconds;
	let minutesTime = minutes < 10 ? `0${minutes}` : minutes;

	timer.innerHTML = `<span>Czas: </span>${minutesTime} : ${secondsTime}`;
};

// 
// CALCULTAING MOVES 
//

const movesCounter = () => {
    movesNumber += 1;
    moves.innerHTML = `<span>Liczba prób: </span>${movesNumber}`;
}

// 
// PICK RANDOM PICTURES FROM ARRAY 
// 

const pickRandomImage = (size = 4) => {
    let newArray = [...picture];
    let cardValues = [];
    size = (size * size) / 2 ;
    
    for(let i = 0; i < size; i++){
        const randomIndex = Math.floor(Math.random() * newArray.length);
        cardValues.push(newArray[randomIndex]);
        newArray.splice(randomIndex, 1);
    }

    return cardValues;
};

const generatePicTable = (cardValues, size = 4) => {
    gameBox.innerHTML = '';
    cardValues = [...cardValues, ...cardValues];

    cardValues.sort(() => Math.random() - 0.5);
    for(let i = 0; i < size * size; i++){
        gameBox.innerHTML += `
        <div class="card-box" data-card-value="${cardValues[i].name}">
        <div class="card-before"></div>
        <div class="card-after">
        <img src = "${cardValues[i].image}" class="image"/></div>
        </div>`;
    }

    // GRID 
    gameBox.style.gridTemplateColumns = `repeat(${size}, auto)`

    // CARDS

    cards = document.querySelectorAll('.card-box');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if(!card.classList.contains('matched')) {
                card.classList.add('flipped');

                if(!firstCard) {
                    firstCard = card;

                    firstCardValue = card.getAttribute('data-card-value');
                }
                else {
                    movesCounter();
    
                    secondCard = card;
                    let secondCardValue = card.getAttribute('data-card-value');
                    if(firstCardValue == secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
    
                        firstCard = false;
    
                        winCount += 1;
    
                        if(winCount  == Math.floor(cardValues.length / 2)) {
                            result.innerHTML = `<h2>Wygrałeś</h2>
                            <h4>Liczba prób: ${movesNumber}</h4>`;
                            stopGame();
                        }
                    }
                    else {
                        let[tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 900);
                    }
                }
            }
        });
    });
   
};


// 
// START GAME 
// 

startButton.addEventListener('click', () => {
    movesNumber = 0;
    seconds = 0;
    minutes = 0;

    controls.classList.add('hide');
    stopButton.classList.remove('hide');
    startButton.classList.add('hide');

    // start time

    interval = setInterval(timeGenerator, 1000);

    moves.innerHTML = `<span>Liczba prób:</span> ${movesNumber}`;
})

// 
// STOP GAME 
// 

stopButton.addEventListener('click', (stopGame = () => {
    controls.classList.remove('hide');
    stopButton.classList.add('hide');
    startButton.classList.remove('hide');
    clearInterval(interval);
}))


const initializer = () => {
    result.innerText = '';
    winCount = 0;
    let cardValues = pickRandomImage();
    console.log(cardValues);
    generatePicTable(cardValues)
}

initializer();