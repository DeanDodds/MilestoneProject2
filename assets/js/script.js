//slider

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
}

// Getting Pages by id
const startPage = document.getElementById('start-page');
const settingsPage = document.getElementById('settingspage');
const RedBallPage = document.getElementById('red-ball-section');
const colorBall = document.getElementById('colored-balls-section');
const scoreboard = document.getElementById('score-board');

// Getting Game Elements by id 
const startBtn = document.getElementById('start-btn');
const backBtn = document.getElementById('back-game-btn');
const startGameBtn = document.getElementById('start-game-btn');
const ballBtns = document.getElementsByClassName('size-big');
const gameBtns = document.getElementById('game-buttons');
const endBreakBtn = document.getElementById('end-break-btn');
const endFrameBtn = document.getElementById('end-frame-btn');
const endOfGameBtn = document.getElementById('end-game-btn');
const foulBtn = document.getElementById('send-foul');

let playerOneFrameCounter = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
let playerTwoFrameCounter = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
let totalNumberOfFrames = parseInt(document.getElementById('number-of-frames').innerHTML);
let currentPlayerScoreMarker = document.getElementById('player-one-score');
let inactivePlayerScoreMarker = document.getElementById('player-two-score')
let activePlayerOneMarker = document.getElementById('active-left');
let activePlayerTWOMarker = document.getElementById('active-right');

// Game Tallys
let points = 0; // points each ball is worth
let breaktotal = 0; // total of current break
let red = 15; // number of reds on the table
let colours = 27;
let i = 1
let remainingPoints = (red * 8) + colours // remaining points on the table
let playerOneBreakTally = [0]; // array that holds all player ones breaks
let playerTwoBreakTally = [0]; // array that holds all player twos breaks
let playerOneFoulTally = [0]; // array to hold all player ones fouls
let playerTwoFoulTally = [0]; // array to hold all player twos fouls
console.log(remainingPoints);

let playerScore = 0;

// <--------------------------- display functions ------------------------------------------>

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
startGameBtn.addEventListener('click', function () {
    event.preventDefault();
    getGameSettings();
})

// ball buton event listerners
for (let ballBtn of ballBtns) {
    ballBtn.addEventListener('click', function () {
        points = parseInt(this.innerHTML)
        breaktotal = breaktotal + points;
        playerScore = playerScore + points;
        currentPlayerScoreMarker.innerHTML = playerScore;
        red = trackRemainingreds(red, points);
        displayBreakBalls(points, breaktotal);
        colours = removeColourPoints(colours, points, remainingPoints);
        remainingPoints = trackRemainingPoints(red, colours, points);
        noPointsLeft(remainingPoints);
        changeDisplay(points, red, remainingPoints, i);
        viewRemaingingpoints(remainingPoints)

    });
}

// endbreak button event listener
endBreakBtn.addEventListener('click', function () {
    if (activePlayerOneMarker.classList.contains('active')) {
        playerOneBreakTally.push(breaktotal)
    } else {
        playerTwoBreakTally.push(breaktotal)
    }
    breaktotal = 0;
    switchPlayer()
    clearBreak()
    changeDisplay()
    if (remainingPoints === 34) {
        reemainingPoints = remainingPoints = 27;
        points = 2
        alert(remainingPoints)
        alert(points)
        changeDisplay(points, red, remainingPoints, i);
    } else if (remainingPoints <= 27) {
        changeDisplay(points, red, remainingPoints, i);
    } else {
        changeDisplay()
    }
});

// End of frame event listerner 
endFrameBtn.addEventListener('click', function () {
    if (activePlayerOneMarker.classList.contains('active')) {
        playerOneBreakTally.push(breaktotal)
    } else {
        playerTwoBreakTally.push(breaktotal)
    }
    endFrame();
    clearPoints();
    clearBreak();
    startFrame();

});

// End of game event listerner
endOfGameBtn.addEventListener('click', function () {
    if (activePlayerOneMarker.classList.contains('active')) {
        playerOneBreakTally.push(breaktotal)
    } else {
        playerTwoBreakTally.push(breaktotal)
    }
    alert('end of game pressed')
    endFrame()
    displayEndGameInfo(playerOneBreakTally, playerTwoBreakTally, playerOneFoulTally, playerTwoFoulTally)
    clearPoints();
    clearBreak();
})

// Foul button event listerner
foulBtn.addEventListener('click', function () {
    foul = parseInt(output.innerHTML);
    let = freeball = document.querySelector('#freeball:checked') !== null;
    let = retake = document.querySelector('#retake:checked') !== null;
    let = removeRed = document.querySelector('#remove-red:checked') !== null;
    alert(foul)

    if (freeball) {}

    if (removeRed) {
        red = red - 1;
    }

    if (retake) {
        console.log('players turn again')
    } else {
        if (activePlayerOneMarker.classList.contains('active')) {
            playerOneBreakTally.push(breaktotal)
        } else {
            playerTwoBreakTally.push(breaktotal)
        }
        breaktotal = 0
        switchPlayer()
        clearBreak()
    }

    inactivePlayerScoreMarker.innerHTML = parseInt(inactivePlayerScoreMarker.innerHTML) + foul;

    if (activePlayerOneMarker.classList.contains('active')) {
        playerOneFoulTally.push(foul)
    } else {
        playerTwoFoulTally.push(foul)
    }
    changeDisplay()

})

// <--------------------------- display functions ------------------------------------------>

/**
 * Gets the users input and displays it in the scoreboard element
 */
function getGameSettings() {
    document.getElementById('settings').checkValidity();
    let numberOfFrames = document.getElementById('frames-input').value;
    let playerOne = document.getElementById('player-one-input').value;
    let playerTwo = document.getElementById('player-two-input').value;
    document.getElementById('number-of-frames').innerHTML = numberOfFrames
    document.getElementById('player-one-name').innerHTML = playerOne;
    document.getElementById('player-two-name').innerHTML = playerTwo;
    document.getElementById('score-board').classList.remove('hidden')
    startFrame()
}

/**
 * The Start Game functions hides all elements and displays the game buttons by adding and removing the hidden class.
 */
function startFrame() {
    console.log('starting frame')
    RedBallPage.classList.remove('hidden')
    gameBtns.classList.remove('hidden')
    colorBall.classList.add('hidden');
    settingsPage.classList.add('hidden');
    document.getElementById('footer').classList.add('hidden');
}

/** 
 * change Display funtion changes between the red ball display and color ball display by adding and removing the hidden class.
 */
function changeDisplay(num, num2, num3, num4) {
    if (num == 1 || num2 === 0 && num3 > 27) {
        RedBallPage.classList.add('hidden');
        colorBall.classList.remove('hidden')
        i = 1;
    } else if (num3 <= 27) {
        i = lastcolorDiplay(num4);
    } else {
        colorBall.classList.add('hidden');
        RedBallPage.classList.remove('hidden');
        i = 1
    }
    return i;
}

function displayEndGameInfo(num1, num2, num3, num4) {
    console.log('displaying ending')
    console.log(num1, num2, num3, num4)
    RedBallPage.classList.add('hidden');
    gameBtns.classList.add('hidden');
    colorBall.classList.add('hidden');
    document.getElementById('footer').classList.remove('hidden');
    scoreboard.classList.add('hidden')
    console.log('display end game done');

    playerOne = document.getElementById('player-one-name').innerHTML
    playerTwo = document.getElementById('player-two-name').innerHTML
    playerOneFrames = document.getElementById('player-one-frame-counter').innerHTML
    playerTwoFrames = document.getElementById('player-two-frame-counter').innerHTML
    playerOneHighestBreak = Math.max(...num1);
    playerTwoHighestBreak = Math.max(...num2);
    console.log(playerOneHighestBreak, playerTwoHighestBreak)
    playerOneFouls = getSum(num3);
    playerTwoFouls = getSum(num4);

    console.log(playerOneFouls, playerTwoFouls);

    document.getElementById('game-area-section').innerHTML = `
    <div class-"player-display-scores">
    <h2>${playerOne}</h2>
    <p>Number of frames won: <span>${playerOneFrames}</span></p>
    <p>Highest break won: <span>${playerOneHighestBreak}</span></p>
    <p>Points giving away in fouls: <span>${playerOneFouls}</span></p>
    </div>

    <div class-"player-display-scores">
    <h2>${playerTwo}</h2>
    <p>Number of frames won: <span>${playerTwoFrames}</span></p>
    <p>Highest break won: <span>${playerTwoHighestBreak}</span></p>
    <p>Points giving away in fouls <span>${playerTwoFouls}</span></p>
    `
}

// <--------------------------- games functions ------------------------------------------>

/** 
 * The switch player fumction swaps the active triangle between the players and 
 * swaps the the scoring between the two players 
 * */
function switchPlayer() {
    if (activePlayerOneMarker.classList.contains('active')) {
        activePlayerOneMarker.classList.remove('active');
        activePlayerTWOMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-two-score');
        inactivePlayerScoreMarker = document.getElementById('player-one-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML)
    } else {
        activePlayerTWOMarker.classList.remove('active');
        activePlayerOneMarker.classList.add('active');
        currentPlayerScoreMarker = document.getElementById('player-one-score');
        inactivePlayerScoreMarker = document.getElementById('player-two-score');
        playerScore = parseInt(currentPlayerScoreMarker.innerHTML);
    }

}

/**
 * removes hidden class from the breakball counters bases on the number of points put through 
 * the funtion
 * adds one to the break counter of the breakball counter
 */
function displayBreakBalls(num, num2) {
    let ballCounter;
    let num1;
    let breakMarker = document.getElementById("current");
    document.getElementById('current-Break').innerHTML = num2;
    breakMarker.classList.remove('hidden')
    if (num == 1) {
        document.getElementById('red-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('red-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('red-break-counter').innerHTML = num1;
    } else if (num == 2) {
        document.getElementById('yellow-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('yellow-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('yellow-break-counter').innerHTML = num1;
    } else if (num == 3) {
        document.getElementById('green-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('green-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('green-break-counter').innerHTML = num1;
    } else if (num == 4) {
        document.getElementById('brown-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('brown-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('brown-break-counter').innerHTML = num1;
    } else if (num == 5) {
        document.getElementById('blue-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('blue-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('blue-break-counter').innerHTML = num1;
    } else if (num == 6) {
        document.getElementById('pink-ball-break-counter').classList.remove('hidden');
        ballCounter = parseInt(document.getElementById('pink-break-counter').innerHTML);
        num1 = ballCounter + 1;
        document.getElementById('pink-break-counter').innerHTML = num1;
    } else if (num == 7) {
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
    console.log('clear break')
    document.getElementById("current").classList.add('hidden')
    let breakCounters = document.getElementsByClassName('small');
    let breakCounterInners = document.getElementsByClassName('break-ball-counter');

    for (let breakCounter of breakCounters) {
        breakCounter.classList.add('hidden')
    }
    for (let breakCounterInner of breakCounterInners) {
        breakCounterInner.innerHTML = 0;
    }


}

function clearPoints() {
    console.log('clear points')
    let scores = document.getElementsByClassName('player-score');
    for (let score of scores) {
        score.innerHTML = 0;
    }
}

/**
 * 
 * @param {*red} num 
 * @param {*points} num2
 * if points is 1 then funtion will minus one red 
 * @returns red
 */
function trackRemainingreds(num, num2) {
    if (num2 === 1) {
        console.log('track reds')
        num = num - 1;
    } else {
        console.log('notred')
    }
    return num;
}

/**
 * 
 * @param {*red} num 
 * @param {*colours} num1 
 * @param {*points} num2 
 * if the player is on a colour remianing points = reds times 8 + 27 (the remianing colours)
 * if the player is on a colour remianing points = reds times 8 + 27 (the remianing colours) + 7
 *   
 * @returns remiaining points 
 */
function trackRemainingPoints(num, num1, num2) {
    let num3;
    if (num2 === 1) {
        console.log('on color track points');
        num3 = (num * 8) + num1 + 7;
        console.log(num3);
    } else {
        console.log('on reds track points');
        num3 = (num * 8) + num1;
        console.log(num3);
    }
    return num3
}

function removeColourPoints(num1, num2, num3) {
    if (num3 <= 27) {
        num1 = num1 - num2;
    } else {
        num1 = 27;
    }
    console.log(num1)
    return num1
}

function endFrame() {
    let playerOneScore = parseInt(document.getElementById('player-one-score').innerHTML);
    let playerTwoScore = parseInt(document.getElementById('player-two-score').innerHTML);
    let playerOneFrame = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
    let playerTwoFrame = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
    console.log(playerOneFrame)
    if (playerOneScore > playerTwoScore) {
        playerOneFrame = playerOneFrame + 1
        console.log(playerOneFrame)
        document.getElementById('player-one-frame-counter').innerHTML = playerOneFrame
        alert('player one wins')
    } else if (playerTwoScore > playerOneScore) {
        playerTwoFrame = playerTwoFrame + 1
        console.log(playerTwoFrame)
        document.getElementById('player-two-frame-counter').innerHTML = playerTwoFrame
        alert('player two wins this frame');
    } else {
        console.log('error');
    }
    checkframes(playerOneFrame, playerTwoFrame)
}

function noPointsLeft(num) {
    if (num === 0) {
        endFrame();
    } else {
        console.log('still poins')
    }
}

function checkframes(num1, num2) {
    console.log('check frames funtion')
    num3 = parseInt(document.getElementById('number-of-frames').innerHTML)
    num4 = num3 / 2;
    console.log(num1, num2, num3, )
    if (num1 >= num4 || num2 >= num4) {
        endGame()
    }

}

function endGame() {
    if (activePlayerOneMarker.classList.contains('active')) {
        playerOneFoulTally.push(foul)
    } else {
        playerTwoFoulTally.push(foul)
    }
    clearBreak()
    displayEndGameInfo(playerOneBreakTally, playerTwoBreakTally, playerOneFoulTally, playerTwoFoulTally)

}

function getSum(num) {
    console.log('getsum function');
    let sum = 0;
    let num1 = num;
    for (let i = 0; i < num1.length; i++) {
        sum += num[i]
    }
    console.log(sum)
    return sum;
}

function lastcolorDiplay(num) {
    document.getElementById('colored-balls-section').classList.remove('hidden')
    let colours = document.getElementsByClassName('ball');
    for (let colour of colours) {
        colour.classList.add('hidden')
    }
    if (num <= 7) {
        colours[num].classList.remove('hidden')
        num++
    }
    return num;
}

function freeballDisplay() {

}

function viewRemaingingpoints(num) {
    console.log(num)
    console.log('view remaining points')
    console.log(num)
    document.getElementById('remaining-points').innerHTML = num;
    document.getElementById('remaining').classList.remove('hidden')

}