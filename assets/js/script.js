// Getting Pages by id
const startPage = document.getElementById('start-page');
const settingsPage = document.getElementById('settingspage');
const RedBallPage = document.getElementById('red-ball-section');
const gameBtns = document.getElementById('game-buttons');

// Getting Buttons by id 
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-game-btn');
const startGameBtn = document.getElementById('start-game-btn');

startBtn.addEventListener('click', function () {
    startPage.classList.add('hidden');
    settingsPage.classList.remove('hidden');
});

backBtn.addEventListener('click', function () {
    startPage.classList.remove('hidden');
    settingsPage.classList.add('hidden');
});

startGameBtn.addEventListener('click', getGameSettings)

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

function startGame() {
    RedBallPage.classList.remove('hidden')
    gameBtns.classList.remove('hidden')
    settingsPage.classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
}