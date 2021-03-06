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
        document.getElementById('settingspage').classList.add('hidden');
        document.getElementById('start-page').classList.remove('hidden');
    }

    /**
     * Displays settings page
     */
    function displaySettingsPage() {
        document.getElementById('start-page').classList.add('hidden');
        document.getElementById('settingspage').classList.remove('hidden');
    }

    /**
     * Gets the users input data and displays it in the scoreboard element
     */
    function getGameSettings() {
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
        let colours = document.getElementsByClassName('size-big');
        for (let colour of colours) {
            colour.classList.remove('hidden');
        }
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
        red = 15;
        colours = 27;
        remainingPoints = trackRemainingPoints(red, colours, points);
        currentScoreDifference = checkDiffernce();
        changeDisplay(points, red, remainingPoints, i);
        hideRemainingPoints();
        endOfTurn();
        startFrame();
    }

    /**
     * changes display throughout the game
     * @param {*points} num 
     * @param {*red} num2 
     * @param {*remaining points} num3 
     * @param {*i} num4 
     * @returns i
     */
    function changeDisplay(points, red, remainingPoints, increment) {
        if (points == 1 || red === 0 && remainingPoints > 27) {
            RedBallPage.classList.add('hidden');
            colorBall.classList.remove('hidden');
            i = 1;
        } else if (remainingPoints <= 27) {
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
    function endOfTurn(currentScoreDifference) {
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        breakTotal = 0;
        switchPlayer();
        clearBreak();
        remainingPoints = trackRemainingPoints(red, colours, points);
        if (remainingPoints === 34) {
            remainingPoints = remainingPoints = 27;
            points = 2;
            changeDisplay(points, red, remainingPoints, i);
        } else if (remainingPoints <= 27) {
            changeDisplay(points, red, remainingPoints, i);
        } else {
            changeDisplay();
        }
        remainingPoints = trackRemainingPoints(red, colours, 2);
        viewRemaingingpoints(remainingPoints);
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
        hideRemainingPoints();
        RedBallPage.classList.add('hidden');
        gameBtns.classList.add('hidden');
        colorBall.classList.add('hidden');
        scoreboard.classList.add('hidden');
        document.getElementById('footer').classList.remove('hidden');
        let playerOne = document.getElementById('player-one-name').innerHTML;
        let playerTwo = document.getElementById('player-two-name').innerHTML;
        let playerOneFrames = document.getElementById('player-one-frame-counter').innerHTML;
        let playerTwoFrames = document.getElementById('player-two-frame-counter').innerHTML;
        let playerOneHighestBreak = Math.max(...playerOneBreak);
        let playerTwoHighestBreak = Math.max(...playerTwoBreak);
        playerOneFouls = getSum(playerOneFouls);
        playerTwoFouls = getSum(playerTwoFouls);

        document.getElementById('game-area-section').innerHTML = `
        <section id="end-display">
            <div class="player-display-scores text-center">
                <div class="player-display-heading text-center" >
                    <h2>${playerOne} </h2><h1 id="player-one-wins"></h1>
                </div>
                <p>Number of frames won: <span>${playerOneFrames}</span></p>
                <p>Highest break: <span>${playerOneHighestBreak}</span></p>
                <p>Points won in fouls: <span>${playerOneFouls}</span></p>
            </div>

            <div class="player-display-scores text-center">
                <div class="player-display-heading text-center" >
                    <h2>${playerTwo} </h2><h1 id="player-two-wins"></h1>
                </div>
                <p>Number of frames won: <span>${playerTwoFrames}</span></p>
                <p>Highest break: <span>${playerTwoHighestBreak}</span></p>
                <p>Points won in fouls <span>${playerTwoFouls}</span></p>
            </div>

            <button id="reset-button" class="btn btn-secondary">Restart</button>  
        </section>
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

    /**
     * displays remaining points element 
     * @param {remainingPoints} 
     */
    function viewRemaingingpoints(remainingPoints) {
        document.getElementById('remaining-points').innerHTML = remainingPoints;
        document.getElementById('remaining').classList.remove('hidden');


    }

    /**
     * hides the remaining points element 
     */
    function hideRemainingPoints() {
        document.getElementById('remaining-points-section').classList.add('hidden');
    }

    /** Displays freeball modal */
    function displayFreeBall() {
        $('#freeball-modal').modal('show');
    }

    /** Closes freeball modal */
    function closeFreeBallModal() {
        $('#freeball-modal').modal('hide');
    }

    /** Closes sound modal */
    function closeSoundModal() {
        $('#sound-modal').modal('hide');
    }

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

    // <--------------------------- Sound Functions ------------------------------------------>
    /** Starts theme song */
    function playTheme() {
        document.getElementById('theme-song').play();
    }
    /** Plays pot sound */
    function playPotSound() {
        document.getElementById('pot-sound').play();
    }

    /**  stops them song */
    function stopTheme() {
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
        let ballCounter;
        let newBreakTotal;
        let breakMarker = document.getElementById("current");
        document.getElementById('current-Break').innerHTML = breakTotal;
        breakMarker.classList.remove('hidden');
        switch (points) {
            case 1:
                document.getElementById('red-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('red-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('red-break-counter').innerHTML = newBreakTotal;
                break;
            case 2:
                document.getElementById('yellow-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('yellow-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('yellow-break-counter').innerHTML = newBreakTotal;
                break;
            case 3:
                document.getElementById('green-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('green-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('green-break-counter').innerHTML = newBreakTotal;
                break;
            case 4:
                document.getElementById('brown-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('brown-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('brown-break-counter').innerHTML = newBreakTotal;
                break;
            case 5:
                document.getElementById('blue-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('blue-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('blue-break-counter').innerHTML = newBreakTotal;
                break;
            case 6:
                document.getElementById('pink-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('pink-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('pink-break-counter').innerHTML = newBreakTotal;
                break;
            case 7:
                document.getElementById('black-ball-break-counter').classList.remove('hidden');
                ballCounter = parseInt(document.getElementById('black-break-counter').innerHTML);
                newBreakTotal = ballCounter + 1;
                document.getElementById('black-break-counter').innerHTML = newBreakTotal;
                break;
        }
    }

    /**
     * adds class of hidden to break counter elements
     * and resets counters to 0
     */
    function clearBreak() {
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
        }
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
        let newRemainingPointsTotal;
        if (points === 1) {
            newRemainingPointsTotal = (red * 8) + colours + 7;
        } else {
            newRemainingPointsTotal = (red * 8) + colours;
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
    function endFrame(currentScoreDifference) {
        let playerOneScore = parseInt(document.getElementById('player-one-score').innerHTML);
        let playerTwoScore = parseInt(document.getElementById('player-two-score').innerHTML);
        let playerOneFrame = parseInt(document.getElementById('player-one-frame-counter').innerHTML);
        let playerTwoFrame = parseInt(document.getElementById('player-two-frame-counter').innerHTML);
        if (playerOneScore > playerTwoScore) {
            playerOneFrame = playerOneFrame + 1;
            document.getElementById('player-one-frame-counter').innerHTML = playerOneFrame;
            alert('player one wins');
        } else if (playerTwoScore > playerOneScore) {
            playerTwoFrame = playerTwoFrame + 1;
            document.getElementById('player-two-frame-counter').innerHTML = playerTwoFrame;
            alert('player two wins this frame');
        }
        playerOneScore.innerHTML = 0;
        playerTwoScore.innerHTML = 0;
        currentScoreDifference = checkDiffernce();
        checkframes(playerOneFrame, playerTwoFrame);
    }

    /**
     * @param {remainingPoints} num 
     * Checks to see if points or still left and runs the end game function if there is none.
     */
    function noPointsLeft(remainingPoints) {
        if (remainingPoints === 0) {
            endCurrentFrame();
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
        document.getElementById('remaining-points-section').classList.remove('hidden');
        document.getElementById('point-difference').innerHTML = scoreDiffence;
        document.getElementById('differnce').classList.remove('hidden');
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
        let totalFramesToPlay = parseInt(document.getElementById('number-of-frames').innerHTML);
        let framesToWin = totalFramesToPlay / 2;
        if (playerOneFrames >= framesToWin || playerTwoFrames >= framesToWin) {
            endGame(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        } else {
            startFrame();
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
     * saves the new breaktally to the current player break tally array 
     * @param {*} activePlayerOneMarker 
     * @param {*} playerOneBreakTally 
     * @param {*} playerTwoBreakTally 
     * @param {*} breakTotal 
     */
    function saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal) {
        if (activePlayerOneMarker.classList.contains('active')) {
            playerOneBreakTally.push(breakTotal);
        } else {
            playerTwoBreakTally.push(breakTotal);
        }
    }

    /**
     * Ends the game 
     */
    function endOfGame() {
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
        clearBreak();
        displayEndGameInfo(playerOneBreakTally, playerTwoBreakTally, playerOneFoulTally, playerTwoFoulTally);
    }

    /**
     * uncheck form boxes
     */
    function uncheckFormBoxesOnSubmit() {
        let checkboxes = document.getElementsByClassName('checkbox');
        for (let checkbox of checkboxes) {
            checkbox.checked = false;
        }
        document.getElementById('myRange').value = 4;
        document.getElementById('demo').innerHTML = 4;

    }

    /**
     * reset free ball slider
     */
    function resetFreeBallSlider() {
        document.getElementById('freeball-counter').value = 1;
        document.getElementById('free-ball-points').innerHTML = 1;

    }

    /**
     * get the data from the the foul form and 
     */
    function playerFoul(currentScoreDifference) {
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

        if (retake === false) {
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
        uncheckFormBoxesOnSubmit()
        saveBreaks(activePlayerOneMarker, playerOneBreakTally, playerTwoBreakTally, breakTotal);
        saveFoul(activePlayerOneMarker, foul);
        breakTotal = 0;
        clearBreak();
        currentScoreDifference = checkDiffernce();
        viewRemaingingpoints(remainingPoints, currentScoreDifference);
    }


    /**
     * Saves fouls to the afoul tally array 
     * @param {*} activePlayerOneMarker 
     * @param {*} foul 
     */
    function saveFoul(activePlayerOneMarker, foul) {
        if (activePlayerOneMarker.classList.contains('active')) {
            playerOneFoulTally.push(foul);
        } else {
            playerTwoFoulTally.push(foul);
        }
    }

    /**
     * runs the the main game 
     */
    function runMainainGame() {
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
        noPointsLeft(remainingPoints);
        viewRemaingingpoints(remainingPoints);
        changeDisplay(points, red, remainingPoints, i);
    }

    /**adds points from the freeball slider */
    function freeballAddPoints() {
        let points = parseInt(sliderTwoOutput.innerHTML);
        i = i - 1;
        changeDisplay(points, red, remainingPoints, i);
        playerScore = playerScore + points;
        currentPlayerScoreMarker.innerHTML = playerScore;
        resetFreeBallSlider();
        closeFreeBallModal();

    }
});