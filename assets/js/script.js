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

let playerOneFrameCounter = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
let playerTwoFrameCounter = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
let totalNumberOfFrames = parseInt(document.getElementById('number-of-frames').innerHTML);
let currentPlayerScoreMarker = document.getElementById('player-one-score')
let activePlayerOneMarker = document.getElementById('active-left');
let activePlayerTWOMarker = document.getElementById('active-right');

let points = 0; // points each ball is worth
let breaktotal = 0; // total of current break
let remainingPoints = 147; // remaining points on the table


let playerScore = 0

// start button event listener
startBtn.addEventListener('click', function () {
    startPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
});

// back button event listener
backBtn.addEventListener('click', function () {
    startPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
});

//start game button event listener
startGameBtn.addEventListener('click', getGameSettings)

// ball buton event listerners
for (let ballBtn of ballBtns) {
    ballBtn.addEventListener('click', function () {
        points = parseInt(this.innerHTML)
        breaktotal = breaktotal + points;
        playerScore = playerScore + points;
        console.log(playerScore, breaktotal)
        currentPlayerScoreMarker.innerHTML = playerScore
        changeDisplay(points)
        displayBreakBalls(points)
    });
}

// end break button event listener
endBreakBtn.addEventListener('click', function () {
    breaktotal = 0
    console.log(breaktotal)
    switchPlayer()
    clearBreak()
});



/**
 * Gets the users input and displays it in the scoreboard element
 */
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
 * swaps the the scoring between the two players 
 * */
function switchPlayer() {
    changeDisplay()
    if (activePlayerOneMarker.classList.contains('active')) {
        alert('player tws turn');
        activePlayerOneMarker.classList.remove('active');
        activePlayerTWOMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-two-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML)
    } else {
        alert('players one turn')
        activePlayerTWOMarker.classList.remove('active');
        activePlayerOneMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-one-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML);
    }

}

/**
 * removes hidden class from the breakball counters bases on the number of points put through 
 * the funtion
 * adds one to the break counter of the breakball counter
 */
function displayBreakBalls(num, ) {
    let ballCounter;
    let num1
    if (num == 1) {
        alert('display red')
        document.getElementById('red-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('red-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('red-break-counter').innerHTML = num1;
    } else if (num == 2) {
        alert('display yellow')
        document.getElementById('yellow-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('yellow-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('yellow-break-counter').innerHTML = num1;
    } else if (num == 3) {
        alert('display green')
        document.getElementById('green-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('green-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('green-break-counter').innerHTML = num1;
    } else if (num == 4) {
        alert('display brown')
        document.getElementById('brown-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('brown-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('brown-break-counter').innerHTML = num1;
    } else if (num == 5) {
        alert('display blue')
        document.getElementById('blue-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('blue-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('blue-break-counter').innerHTML = num1;
    } else if (num == 6) {
        alert('display pink')
        document.getElementById('pink-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('pink-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('pink-break-counter').innerHTML = num1;
    } else if (num == 7) {
        alert('display black')
        document.getElementById('black-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('black-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('black-break-counter').innerHTML = num1;
    }
}

/**
 * adds class of hidden to break counter elements
 * and resets counters to 0
 */
function clearBreak() {
    let breakCounters = document.getElementsByClassName('small');
    let breakCounterInners = document.getElementsByClassName('break-ball-counter');

    for (let breakCounter of breakCounters) {
        breakCounter.classList.add('hidden')
    }

    for (let breakCounterInner of breakCounterInners) {
        breakCounterInner.innerHTML = 0;
    }
}

function trackRemainingPoints() {

}