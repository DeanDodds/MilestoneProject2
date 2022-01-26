// Getting Pages by id
const startPage = document.getElementById('start-page');
const settingsPage = document.getElementById('settingspage');
const RedBallPage = document.getElementById('red-ball-section');
const colorBall = document.getElementById('colored-balls-section');


// Getting Game Elements by id 
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-game-btn');
const startGameBtn = document.getElementById('start-game-btn');
const ballBtns = document.getElementsByClassName('size-big');
const gameBtns = document.getElementById('game-buttons');
const endBreakBtn = document.getElementById('end-break-btn');
const 

let playerOneFrameCounter = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
let playerTwoFrameCounter = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
let totalNumberOfFrames = parseInt(document.getElementById('number-of-frames').innerHTML);
let currentPlayerScoreMarker = document.getElementById('player-one-score')
let activePlayerOneMarker = document.getElementById('active-left');
let activePlayerTWOMarker = document.getElementById('active-right');

let winner 
let points = 0;
let breaktotal = 0;


let playerScore = 0

startBtn.addEventListener('click', function () {
    startPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
});

backBtn.addEventListener('click', function () {
    startPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
});

startGameBtn.addEventListener('click', getGameSettings)

for (let ballBtn of ballBtns) {
    ballBtn.addEventListener('click', function () {
        points = parseInt(this.innerHTML)
        breaktotal = breaktotal + points;
        playerScore = playerScore + points;
        console.log(playerScore, breaktotal)
        currentPlayerScoreMarker.innerHTML = playerScore
        changeDisplay(points)
    });
}

endBreakBtn.addEventListener('click', function () {
    breaktotal = 0
    console.log(breaktotal)
    switchPlayer()
});

function getGameSettings() {
    event.preventDefault()
    let numberOfFrames = document.getElementById('frames-input').value;
    let playerOne = document.getElementById('player-one-input').value;
    let playerTwo = document.getElementById('player-two-input').value;
    document.getElementById('number-of-frames').innerHTML = numberOfFrames
    document.getElementById('player-one-name').innerHTML = playerOne;
    document.getElementById('player-two-name').innerHTML = playerTwo;
    document.getElementById('score-board').classList.remove('hidden')
    startGame()
}


/**
 * The Start Game functions hides all elements and displays the game buttons by adding and removing the hidden class.
 */
function startGame() {
    RedBallPage.classList.remove('hidden')
    gameBtns.classList.remove('hidden')
    settingsPage.classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
}

/** 
 * change Display funtion changes between the red ball display and color ball display by adding and removing the hidden class.
*/
function changeDisplay(num) {
    if (num == 1) {
        RedBallPage.classList.add('hidden');
        colorBall.classList.remove('hidden')
    } else {
        colorBall.classList.add('hidden');
        RedBallPage.classList.remove('hidden');
    }
}
/** 
 * The switch player fumction swaps the active triangle between the players and 
 * swaps the 
 * */ 
function switchPlayer() {
    changeDisplay()
    if (activePlayerOneMarker.classList.contains('active')){
        alert('player tws turn');
        activePlayerOneMarker.classList.remove('active');
        activePlayerTWOMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-two-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML)
    }else {
        alert('players one turn')
        activePlayerTWOMarker.classList.remove('active');
        activePlayerOneMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-one-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML);
    }

}

function displayBreakTotal(){

}
