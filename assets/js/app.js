var questions = [
    {
        question: "Arrays in javascript can be used to store:",
        choice1: "Numbers and strings",
        choice2: "Other arrays",
        choice3: "Booleans",
        choice4: "All of the above",
        correct: "choice4"
    },
    {
        question: "Which of the following is NOT a primitive data type?:",
        choice1: "integer",
        choice2: "character",
        choice3: "string",
        choice4: "All of the above are primitive data types",
        correct: "choice3"
    },
    {
        question: "Which of the following is the correct syntax for a 'for' loop?:",
        choice1: "for (var i = 0; i < array.length; i++)",
        choice2: "for var i = 0; i < array.length; i++",
        choice3: "for (var i = 0; i++)",
        choice4: "None of the above",
        correct: "choice1"
    },
    {
        question: "What purpose does the .trim() method serve?:",
        choice1: "Removes spaces from both sides of the designated string",
        choice2: "Removes spaces from a specified side of the designated string",
        choice3: "Removes a specified portion of the designated string",
        choice4: "None of the above",
        correct: "choice1"
    },
    {
        question: "What bootstrap method would add margin to an element?:",
        choice1: "row",
        choice2: "col",
        choice3: "mt-5",
        choice4: "None of the above",
        correct: "choice3"
    },

    
]

var usedQuestions = [];
var mainContainer = document.querySelector('.main-container');
var timeEl = document.querySelector('#timer');
var startButton = document.querySelector('.start-button');
var display = document.getElementById("timer");
var scoreEl = document.querySelector('.score');
var highScores = document.querySelector('.high-scores')
var timeLeft;
var question;
var score = 0;

scoreEl.innerHTML = score;

var randomQuestion = function(){
    if (usedQuestions.length === questions.length){return false}
    var randomIndex = Math.floor(Math.random() * questions.length);
    var rQuestion = questions[randomIndex];
    if (!usedQuestions.includes(rQuestion)){
        usedQuestions.push(rQuestion);
    } else {
        return randomQuestion();
    }
    return rQuestion;
}

var endGame = function(){

    window.alert("The game is ended!");
    window.alert(`Your final score is ${score}!`)
    var initialsPrompt = window.prompt("Please enter your intitials");
    var initObj = {
        initials: initialsPrompt, 
        score: score
    }
    if (!JSON.parse(window.localStorage.getItem('scores'))) {
        window.localStorage.clear();
        var scores = []
        window.localStorage.setItem('scores', JSON.stringify(scores));
        return;
    }
    var scoresList = JSON.parse(window.localStorage.getItem('scores'));
    scoresList.push(initObj);
    window.localStorage.setItem('scores', JSON.stringify(scoresList));

    var playAgain = window.confirm("Would you like to play again?");
    if (playAgain) {
        runGame();
    } else {
        loadStartBtn();
    }
}

var startTimer = function() {
    var timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            display.textContent = `${timeLeft} seconds remaining`;
            timeLeft--
        } else if (timeLeft === 1) {
            display.textContent = `${timeLeft} second remaining`;
            timeLeft--;
        } else {
            clearInterval(timeInterval);
            window.alert("Times up!");
            endGame();
        }
    }, 1000)
}

var loadQuestion = function() {
    question = randomQuestion();
    if (!question){endGame()}
    var html = `
    <div class="question flex-row">
        <h2 class="question">${question.question}</h2>
    </div>
    <div class="answers flex-column">
        <div id="answer1"><button data-id='choice1' class='btn answer-btn'>${question.choice1}</button></div>
        <div id="answer2"><button data-id='choice2' class='btn answer-btn'>${question.choice2}</button></div>
        <div id="answer3"><button data-id='choice3' class='btn answer-btn'>${question.choice3}</button></div>
        <div id="answer4"><button data-id='choice4' class='btn answer-btn'>${question.choice4}</button></div>
    </div>
    `;

    mainContainer.innerHTML = html;
    var answers = document.querySelector('.answers');
    answers.addEventListener('click', function(event){
        var selection = event.target.dataset.id;
        if (selection === question.correct) {
            score += 1;
            scoreEl.innerHTML = score;
        } else {
            timeLeft -= 10;
            timeEl.innerHTML = timeLeft;
        }
        loadQuestion();
    });
}

var loadStartBtn = function(){
    // reset(); 
    mainContainer.innerHTML = `
    <button class="start-button btn">Start!</button>
    `;
    console.log(mainContainer);
    clearInterval(timeInterval);
}

var loadScores = function() {
    mainContainer.innerHTML = `
        <div>
            <ol id='scores-list'>
            </ol>
        </div>
    `
    var scoresList = JSON.parse(localStorage.getItem('scores'));
    if (!scoresList){window.alert("there are no high scores yet!"); loadStartBtn();}
    scoresList.forEach(function(score){
        var listItem = document.createElement('li');
        listItem.className = 'list-item';
        listItem.innerHTML = `User: ${score.initials} Score: ${score.score}`
        document.getElementById('scores-list').appendChild(listItem);
    })
}

var reset = function(){
    score = 0;
    timeLeft = 60;
    mainContainer.innerHTML = ''
    timeEl.innerHTML = timeLeft;
    scoreEl.innerHTML = score;
    usedQuestions = [];
}

var runGame = function(){
    reset();
    startTimer();
    loadQuestion();
}

startButton.addEventListener('click', runGame)
highScores.addEventListener('click', loadScores)
