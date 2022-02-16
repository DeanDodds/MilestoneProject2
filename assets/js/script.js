//wait for the dom to load before running game 

document.addEventListener('DOMContentLoaded', function () {
    promptSound();

    // <--------------------------- Slider JavaScript ------------------------------------------>

    //sliders from 3w3schools
    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    let sliderTwo = document.getElementById('freeball-counter');
    let sliderTwoOutput = document.getElementById('free-ball-points');
    output.innerHTML = slider.value; // Display the default slider value
    sliderTwoOutput.innerHTML = sliderTwo.value;

    // Update the current slzider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = this.value;
    };

    sliderTwo.oninput = function () {
        sliderTwoOutput.innerHTML = this.value;
    };

    // Getting Pages by id
    const settingsPage = document.getElementById('settingspage');
    const RedBallPage = document.getElementById('red-ball-section');
    const colorBall = document.getElementById('colored-balls-section');
    const scoreboard = document.getElementById('score-board');

    // Getting Game Elements by id 
    const startBtn = document.getElementById('start-btn');
    const backBtn = document.getElementById('back-game-btn');
    const startGameBtn = document.getElementById('submit-btn');
    const ballBtns = document.getElementsByClassName('size-big');
    const gameBtns = document.getElementById('game-buttons');
    const endBreakBtn = document.getElementById('end-break-btn');
    const endFrameBtn = document.getElementById('end-frame-btn');
    const endOfGameBtn = document.getElementById('end-game-btn');
    const foulBtn = document.getElementById('send-foul');
    const freeballBtn = document.getElementById('free-ball-submit');
    const muteBtn = document.getElementById('mute-btn');
    let inactivePlayerScoreMarker = document.getElementById('player-two-score');
    let activePlayerOneMarker = document.getElementById('active-left');
    let activePlayerTWOMarker = document.getElementById('active-right');

    // Game Tallys
    let currentPlayerScoreMarker = document.getElementById('player-one-score');
    let points = 0; // points each ball is worth
    let breakTotal = 0; // total of current break
    let red = 15; // number of reds on the table
    let colours = 27; // points of colour balls
    let i = 1; // used to increments
    let remainingPoints = (red * 8) + colours; // remaining points on the table
    let playerOneBreakTally = [0]; // array that holds all player ones breaks
    let playerTwoBreakTally = [0]; // array that holds all player twos breaks
    let playerOneFoulTally = [0]; // array to hold all player ones fouls
    let playerTwoFoulTally = [0]; // array to hold all player twos fouls
    let playerScore = 0; // current player score
    ;

    // <--------------------------- Button Event Listerners ------------------------------------------>

    muteBtn.addEventListener('click', mutePage);
    startBtn.addEventListener('click', displaySettingsPage);
    backBtn.addEventListener('click', displayHomePage);
    startGameBtn.addEventListener('click', getGameSettings);
    for (let ballBtn of ballBtns) // loop through all ball buttons  
    {
        ballBtn.addEventListener('click', runMainainGame);
    }
    endBreakBtn.addEventListener('click', endOfTurn);
    endFrameBtn.addEventListener('click', endCurrentFrame);
    endOfGameBtn.addEventListener('click', endOfGame);
    foulBtn.addEventListener('click', playerFoul);
    freeballBtn.addEventListener('click', freeballAddPoints);

    // <--------------------------- Display functions ------------------------------------------>
    /**
     * Displays home page
     */
    function displayHomePage() {
        console.log('displaying Home Page');
        document.getElementById('settingspage').classList.add('hidden');
        document.getElementById('start-page').classList.remove('hidden');
    }

    /**
     * Displays settings page
     */
    function displaySettingsPage() {
        console.log('displaying settings');
        document.getElementById('start-page').classList.add('hidden');
        document.getElementById('settingspage').classList.remove('hidden');
    }

    /**
     * Gets the users input data and displays it in the scoreboard element
     */
    function getGameSettings() {
        console.log('display gettings');
        let numberOfFrames = document.getElementById('frames-input').value;
        let playerOne = document.getElementById('player-one-input').value;
        let playerTwo = document.getElementById('player-two-input').value;
        if (numberOfFrames != "" && playerOne != "" && playerTwo != "") {
            document.getElementById('number-of-frames').innerHTML = numberOfFrames;
            document.getElementById('player-one-name').innerHTML = playerOne;
            document.getElementById('player-two-name').innerHTML = playerTwo;
            document.getElementById('score-board').classList.remove('hidden');
            stopTheme();
            startFrame();
        }
    }
    /**
     * prevents form submission but still allows validation solution
     */
    $("#settings").submit(function (e) {
        e.preventDefault();
    });

    /**
     * The Start Game functions hides all elements and displays the game buttons by adding and removing the hidden class.
     */
    function startFrame() {
        RedBallPage.classList.remove('hidden');
        gameBtns.classList.remove('hidden');
        colorBall.classList.add('hidden');
        settingsPage.classList.add('hidden');
        document.getElementById('footer').classList.add('hidden');
    }

    /** ends current frame */
    function endCurrentFrame() {
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        endFrame();
        clearPoints();
        clearBreak();
        startFrame();
        remainingPoints = 0;
    }

    /**
     * changes display throughout the game
     * @param {*points} num 
     * @param {*red} num2 
     * @param {*remaining points} num3 
     * @param {*i} num4 
     * @returns i
     */
    function changeDisplay(points, red, reemainingPoints, increment) {
        console.log('changing display');
        if (points == 1 || red === 0 && reemainingPoints > 27) {
            RedBallPage.classList.add('hidden');
            colorBall.classList.remove('hidden');
            i = 1;
        } else if (reemainingPoints <= 27) {
            i = lastcolorDiplay(increment);
        } else {
            colorBall.classList.add('hidden');
            RedBallPage.classList.remove('hidden');
            i = 1;
        }
        return i;
    }

    /**
     * ends the current frame
     */
    function endOfTurn() {
        console.log('end of players turn');
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        breakTotal = 0;
        switchPlayer();
        clearBreak();
        remainingPoints = trackRemainingPoints(red, colours, points);
        if (remainingPoints === 34) {
            remainingPoints = remainingPoints = 27;
            points = 2;
            alert(remainingPoints);
            changeDisplay(points, red, remainingPoints, i);
        } else if (remainingPoints <= 27) {} else {
            changeDisplay();
        }
        remainingPoints = trackRemainingPoints(red, colours, 2);
        viewRemaingingpoints(remainingPoints, currentScoreDifference);
    }

    /**
     * adds hidden class to all game elements 
     * sorts through the arrays in the parmeters
     * writes html to the DOM,
     * @param {*playerOneBreakTally} num1 
     * @param {*playerTwoBreakTally} num2 
     * @param {*playerOneFoulTally} num3 
     * @param {*playerTwoFoulTally} num4 
     */
    function displayEndGameInfo(playerOneBreak, playerTwoBreak, playerOneFouls, playerTwoFouls) {
        document.getElementById('break-section-numbers').classList.add('hidden');
        RedBallPage.classList.add('hidden');
        gameBtns.classList.add('hidden');
        colorBall.classList.add('hidden');
        scoreboard.classList.add('hidden');
        document.getElementById('footer').classList.remove('hidden');
        playerOne = document.getElementById('player-one-name').innerHTML;
        playerTwo = document.getElementById('player-two-name').innerHTML;
        playerOneFrames = document.getElementById('player-one-frame-counter').innerHTML;
        playerTwoFrames = document.getElementById('player-two-frame-counter').innerHTML;
        playerOneHighestBreak = Math.max(...playerOneBreak);
        playerTwoHighestBreak = Math.max(...playerTwoBreak);
        playerOneFouls = getSum(playerOneFouls);
        playerTwoFouls = getSum(playerTwoFouls);
        console.log(playerOneHighestBreak, playerTwoHighestBreak);
        console.log(playerOneFouls, playerTwoFouls);

        document.getElementById('game-area-section').innerHTML = `
        <div class="player-display-scores">
            <div class="player-display-heading" >
                <h2>${playerOne} </h2><h1 id="player-one-wins"></h1>
            </div>
            <p>Number of frames won: <span>${playerOneFrames}</span></p>
            <p>Highest break: <span>${playerOneHighestBreak}</span></p>
            <p>Points Won in fouls: <span>${playerOneFouls}</span></p>
        </div>

        <div class="player-display-scores">
            <div class="player-display-heading" >
                <h2>${playerTwo} </h2><h1 id="player-two-wins"></h1>
            </div>
            <p>Number of frames won: <span>${playerTwoFrames}</span></p>
            <p>Highest break: <span>${playerTwoHighestBreak}</span></p>
            <p>Points Won in fouls <span>${playerTwoFouls}</span></p>
        </div>

        <button id="reset-button" class="btn btn-secondary">Restart</button>  
        `;

        if (playerOneFrames > playerTwoFrames) {
            document.getElementById("player-one-wins").innerHTML = '- Winner';
        } else {
            document.getElementById("player-two-wins").innerHTML = '- Winner';
        }

        const resetBtn = document.getElementById('reset-button');

        resetBtn.addEventListener('click', function () {
            location.reload();
        });

    }
    /**
     * 
     * @param {*i} num 
     * displays one ball
     * increment i by one 
     * i @returns 
     */
    function lastcolorDiplay(i) {
        console.log('just colours');
        document.getElementById('colored-balls-section').classList.remove('hidden');
        let colours = document.getElementsByClassName('size-big');
        for (let colour of colours) {
            colour.classList.add('hidden');
        }
        if (i <= 7) {
            colours[i].classList.remove('hidden');
            i++;
        }
        return i;
    }

    // <--------------------------- Sound Functions ------------------------------------------>

    /**
     * Asks user if they would like sound on or off
     */
    function promptSound() {
        $('#sound-modal').modal('show');
        document.getElementById('sound-on').addEventListener('click', closeSoundModal);
        document.getElementById('sound-on').addEventListener('click', playTheme);
        document.getElementById('sound-off').addEventListener('click', closeSoundModal);
        document.getElementById('sound-off').addEventListener('click', mutePage);
    }

    /** Starts theme song */
    function playTheme() {
        console.log('play theme');
        document.getElementById('theme-song').play();
    }
    /** Plays pot sound */
    function playPotSound() {
        console.log('playing pot sound');
        document.getElementById('pot-sound').play();
    }

    /**  stops them song */
    function stopTheme() {
        console.log('stop song');
        document.getElementById('theme-song').pause();
    }

    /** Mutes sounds */
    function muteMe(elem) {
        elem.muted = true;
        elem.pause();
    }
    /* Unmuts sounds */
    function unmuteMe(elem) {
        elem.muted = false;
    }

    /* Mute button functions */
    function mutePage() {
        if (muteBtn.innerHTML === 'Mute') {
            document.querySelectorAll("audio").forEach(elem => muteMe(elem));
            muteBtn.textContent = "Unmute";
        } else {
            document.querySelectorAll("audio").forEach(elem => unmuteMe(elem));
            muteBtn.textContent = "Mute";
        }
    }

    /** Displays freeball modal */
    function displayFreeBall() {
        console.log('displaying freeball');
        $('#freeball-modal').modal('show');
    }

    /** Closes freeball modal */
    function closeFreeBallModal() {
        $('#freeball-modal').modal('hide');
    }

    /** Closes sound modal */
    function closeSoundModal() {
        console.log('close-Modal');
        $('#sound-modal').modal('hide');
    }
    // <--------------------------- games functions ------------------------------------------>

    /** 
     * The switch player fumction swaps the active triangle between the players and 
     * swaps the the scoring between the two players 
     * */
    function switchPlayer() {
        console.log('switch player');
        if (activePlayerOneMarker.classList.contains('active')) {
            activePlayerOneMarker.classList.remove('active');
            activePlayerTWOMarker.classList.add('active');
            currentPlayerScoreMarker = document.getElementById('player-two-score');
            inactivePlayerScoreMarker = document.getElementById('player-one-score');
            playerScore = parseInt(currentPlayerScoreMarker.innerHTML);
        } else {
            activePlayerTWOMarker.classList.remove('active');
            activePlayerOneMarker.classList.add('active');
            currentPlayerScoreMarker = document.getElementById('player-one-score');
            inactivePlayerScoreMarker = document.getElementById('player-two-score');
            playerScore = parseInt(currentPlayerScoreMarker.innerHTML);
        }
    }

    /**
     * * removes hidden class from the breakball counters bases on the number of points put through 
     * the funtion
     * adds one to the break counter of the breakball counter
     * @param {*points} num 
     * @param {*breakTotal} num2 
     */
    function displayBreakBalls(points, breakTotal) {
        console.log('break ball being added');
        let ballCounter;
        let newBreakTotal;
        let breakMarker = document.getElementById("current");
        document.getElementById('current-Break').innerHTML = breakTotal;
        breakMarker.classList.remove('hidden');
        if (points == 1) {
            document.getElementById('red-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('red-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('red-break-counter').innerHTML = newBreakTotal;
        } else if (points == 2) {
            document.getElementById('yellow-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('yellow-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('yellow-break-counter').innerHTML = newBreakTotal;
        } else if (points == 3) {
            document.getElementById('green-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('green-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('green-break-counter').innerHTML = newBreakTotal;
        } else if (points == 4) {
            document.getElementById('brown-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('brown-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('brown-break-counter').innerHTML = newBreakTotal;
        } else if (points == 5) {
            document.getElementById('blue-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('blue-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('blue-break-counter').innerHTML = newBreakTotal;
        } else if (points == 6) {
            document.getElementById('pink-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('pink-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('pink-break-counter').innerHTML = newBreakTotal;
        } else if (points == 7) {
            document.getElementById('black-ball-break-counter').classList.remove('hidden');
            ballCounter = parseInt(document.getElementById('black-break-counter').innerHTML);
            newBreakTotal = ballCounter + 1;
            document.getElementById('black-break-counter').innerHTML = newBreakTotal;
        } else {
            console.log('error');
        }
    }

    /**
     * adds class of hidden to break counter elements
     * and resets counters to 0
     */
    function clearBreak() {
        console.log('clearing break');
        document.getElementById("current").classList.add('hidden');
        let breakCounters = document.getElementsByClassName('small');
        let breakCounterInners = document.getElementsByClassName('break-ball-counter');

        for (let breakCounter of breakCounters) {
            breakCounter.classList.add('hidden');
        }
        for (let breakCounterInner of breakCounterInners) {
            breakCounterInner.innerHTML = 0;
        }
    }

    /**
     * resets player scores to 0 
     */
    function clearPoints() {
        let scores = document.getElementsByClassName('player-score');
        for (let score of scores) {
            score.innerHTML = 0;
        }
    }

    /**
     * 
     * @param {*red} num 
     * @param {*points} num2
     * if points is 1 then funtion will remove one red 
     * @returns red
     */
    function trackRemainingReds(red, points) {
        if (points === 1) {
            red = red - 1;
        } else {}
        console.log('reds =', red);
        return red;
    }

    /**
     * 
     * @param {*red} num 
     * @param {*colours} num1 
     * @param {*points} num2 
     * if the player is on a colour remianing points = reds times 8 + 27 (the remianing colours)
     * if the player is on a colour remianing points = reds times 8 + 27 (the remianing colours) + 7
     * @returns remiaining points 
     */
    function trackRemainingPoints(red, colours, points) {
        console.log('Tracking points');
        let newRemainingPointsTotal;
        if (points === 1) {
            newRemainingPointsTotal = (red * 8) + colours + 7;
            console.log(newRemainingPointsTotal);
        } else {
            newRemainingPointsTotal = (red * 8) + colours;
            console.log(newRemainingPointsTotal);
        }
        return newRemainingPointsTotal;
    }

    /**
     * 
     * @param {colours}  
     * @param {points}  
     * @param {remainingPoints}  
     * @returns colours
     * Once the remaining points is equal too or less then 27 
     * the function starts to remove the points from each ball 
     * from the remaining colours.
     */
    function removeColourPoints(colours, points, remainingPoints) {
        if (remainingPoints <= 27) {
            colours = colours - points;
        } else {
            colours = 27;
        }
        return colours;
    }

    /** get the player scores from the DOM */
    function endFrame() {
        let playerOneScore = parseInt(document.getElementById('player-one-score').innerHTML);
        let playerTwoScore = parseInt(document.getElementById('player-two-score').innerHTML);
        let playerOneFrame = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
        let playerTwoFrame = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
        console.log(playerOneFrame);
        if (playerOneScore > playerTwoScore) {
            playerOneFrame = playerOneFrame + 1;
            console.log(playerOneFrame);
            document.getElementById('player-one-frame-counter').innerHTML = playerOneFrame;
            alert('player one wins');
        } else if (playerTwoScore > playerOneScore) {
            playerTwoFrame = playerTwoFrame + 1;
            console.log(playerTwoFrame);
            document.getElementById('player-two-frame-counter').innerHTML = playerTwoFrame;
            alert('player two wins this frame');
        } else {
            console.log('error');
        }
        checkframes(playerOneFrame, playerTwoFrame);
    }

    /**
     * @param {remainingPoints} num 
     * Checks to see if points or still left and runs the end game function if there is none.
     */
    function noPointsLeft(remainingPoints) {
        if (remainingPoints === 0) {
            endFrame();
        }
    }

    /** Works out the score difference between the two players */
    function checkDiffernce() {
        let playerOneScore = parseInt(document.getElementById('player-one-score').innerHTML);
        let playerTwoScore = parseInt(document.getElementById('player-two-score').innerHTML);
        let scoreDiffence;
        if (playerOneScore >= playerTwoScore) {
            scoreDiffence = playerOneScore - playerTwoScore;
        } else {
            scoreDiffence = playerTwoScore - playerOneScore;
        }
        console.log('difference = ', scoreDiffence);
        document.getElementById('point-difference').innertext = scoreDiffence;
        document.getElementById('remaining-points-section').classList.remove('hidden');
        return scoreDiffence;
    }

    /**
     * gets the total number of frames from the DOM
     * then checks if the number of frames won by either player is 
     * more or equal to half      
     * if it is it ends the game
     * @param {*playerOneFrame}
     * @param {*playertWOFrame} */
    function checkframes(playerOneFrames, playerTwoFrames) {
        console.log('check frames funtion');
        totalFramesToPlay = parseInt(document.getElementById('number-of-frames').innerHTML);
        framesToWin = totalFramesToPlay / 2;
        if (playerOneFrames >= framesToWin || playerTwoFrames >= framesToWin) {
            endGame(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        }
    }


    /**
     * Adds an array together
     * @param {*playerfouls} num 
     * @returns the sum of an array 
     */
    function getSum(fouls) {
        let sum = 0;
        let num1 = fouls;
        for (let i = 0; i < num1.length; i++) {
            sum += fouls[i];
        }
        return sum;
    }

    /**
     * displays remaining points 
     * @param {remainingPoints} 
     */
    function viewRemaingingpoints(remainingPoints, currentScoreDifference) {
        document.getElementById('remaining-points').innerHTML = remainingPoints;
        document.getElementById('remaining').classList.remove('hidden');
        document.getElementById('point-difference').innerHTML = currentScoreDifference;
        document.getElementById('differnce').classList.remove('hidden');

    }

    /**
     * saves the new breaktally to the current player break tally array 
     * @param {*} activePlayerOneMarker 
     * @param {*} playerOneBreakTally 
     * @param {*} playerTwoBreakTally 
     * @param {*} breakTotal 
     */
    function saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal) {
        console.log('saving break');
        if (activePlayerOneMarker.classList.contains('active')) {
            playerOneBreakTally.push(breakTotal);
            console.log(playerOneBreakTally);
        } else {
            playerTwoBreakTally.push(breakTotal);
            console.log(playerTwoBreakTally);
        }
    }

    /**
     * Ends the game 
     */
    function endOfGame() {
        console.log('ending game');
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        endFrame();
        displayEndGameInfo(playerOneBreakTally, playerTwoBreakTally, playerOneFoulTally, playerTwoFoulTally);
        clearPoints();
        clearBreak();
        remainingPoints = 0;
    }

    /**
     * Pushes the last tallys to the arrays they are stored in 
     * Clears the break
     * Sends the player end daits to the 
     */
    function endGame(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal) {
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        clearBreak()
        displayEndGameInfo(playerOneBreakTally, playerTwoBreakTally, playerOneFoulTally, playerTwoFoulTally);
    }

    /**
     * get the data from the the foul form and 
     */
    function playerFoul() {
        let foul = parseInt(output.innerHTML);
        let freeball = document.querySelector('#freeball:checked') !== null;
        let retake = document.querySelector('#retake:checked') !== null;
        let removeRed = document.querySelector('#remove-red:checked') !== null;
        inactivePlayerScoreMarker.innerHTML = parseInt(inactivePlayerScoreMarker.innerHTML) + foul;
        if (freeball) {
            displayFreeBall();
        }

        if (removeRed) {
            red = red - 1;
        }

        if (retake) {
            console.log('players turn again');
        } else {
            switchPlayer();
        }

        if (remainingPoints === 34) {
            remainingPoints = remainingPoints = 27;
            points = 2;
            alert(remainingPoints);
            changeDisplay(points, red, remainingPoints, i);
        } else if (remainingPoints <= 27) {} else {
            changeDisplay();
        }
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        saveFoul(activePlayerOneMarker, foul);
        breakTotal = 0;
        clearBreak();
    }

    /**
     * Saves fouls to the afoul tally array 
     * @param {*} activePlayerOneMarker 
     * @param {*} foul 
     */
    function saveFoul(activePlayerOneMarker, foul) {
        console.log('saving foul');
        if (activePlayerOneMarker.classList.contains('active')) {
            playerOneFoulTally.push(foul);
            console.log(playerOneFoulTally);
        } else {
            playerTwoFoulTally.push(foul);
            console.log(playerTwoFoulTally);
        }
    }

    /**
     * runs the the main game 
     */
    function runMainainGame() {
        console.log('run main game');
        playPotSound();
        points = parseInt(this.innerHTML);
        breakTotal = breakTotal + points;
        playerScore = playerScore + points;
        currentPlayerScoreMarker.innerHTML = playerScore;
        red = trackRemainingReds(red, points);
        displayBreakBalls(points, breakTotal);
        colours = removeColourPoints(colours, points, remainingPoints);
        remainingPoints = trackRemainingPoints(red, colours, points);
        currentScoreDifference = checkDiffernce();
        console.log(currentScoreDifference);
        noPointsLeft(remainingPoints);
        changeDisplay(points, red, remainingPoints, i);
        viewRemaingingpoints(remainingPoints, currentScoreDifference);
    }

    /**adds points from the freeball slider */
    function freeballAddPoints() {
        console.log('adding freeball points');
        let points = parseInt(sliderTwoOutput.innerHTML);
        console.log(points);
        i = i - 1;
        changeDisplay(points, red, remainingPoints, i);
        playerScore = playerScore + points;
        currentPlayerScoreMarker.innerHTML = playerScore;
        closeFreeBallModal();
    }
});