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
]

// build timer, get it displaying on the page, then subtract from timer value when question is answered incorrectly

var score = 0;

var mainContainer = document.querySelector('.main-container');
var timeEl = document.querySelector('#timer');
var startButton = document.querySelector('.start-button');
var display = document.getElementById("timer");
var scoreEl = document.querySelector('.score');
var minute = 60;

scoreEl.innerHTML = score;

var usedQuestions = [];

var endGame = function(){
    window.alert("The game is ended!");
    usedQuestions = [];
    var html = `
    <div class='endgame'>
        <h1>Game Over!</h1>
        <p>Your final score is <span class="score">${score}</span>
    </div>
    `;
    mainContainer.innerHTML = html;
    var playAgain = window.confirm("Would you like to play again?")
    if (playAgain) {
        startGame();
    } else {
        loadQuestion();
    }
}

var randomQuestion = function(){
    var randomIndex = Math.floor(Math.random() * questions.length);
    var rQuestion =  questions[randomIndex];
    if (!usedQuestions.includes(rQuestion)) {
        usedQuestions.push(rQuestion);
    } else {
        randomQuestion();
    }
    return rQuestion;
} 

var startTimer = function(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function(){
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = `${minutes}:${seconds}`;
        if (--timer === 0) {
            window.alert("You have run out of time!");
            timer = duration;
            startGame();
        }
    }, 1000)
}

var question = randomQuestion();

var loadQuestion = function() {
    console.log(randomQuestion())
    question = randomQuestion();
    var html = `
    <div class="question flex-row">
        <h2 class="question">${question.question}</h2>
    </div>
    <div class="answers flex-column">
        <div class="answer" id="answer1" data-id='choice1'><button>${question.choice1}</button></div>
        <div class="answer" id="answer2" data-id='choice2'><button>${question.choice2}</button></div>
        <div class="answer" id="answer3" data-id='choice3'><button>${question.choice3}</button></div>
        <div class="answer" id="answer4" data-id='choice4'><button>${question.choice4}</button></div>
    </div>
    `
    mainContainer.innerHTML = html;
    var answers = document.querySelector('.answers')
    answers.addEventListener('click', answerQuestion);
    
    if (usedQuestions.length === questions.length) {
        window.alert("You have completed the quiz!");
        endGame();
    }
}

var answerQuestion = function(event){
    var selection = event.target.dataset.id;
    if (selection === question.correct) {
        score++;
        score.innerHTML = score;
        loadQuestion();
    } else {
        timer -= 10;
        loadQuestion();
    }
}

var startGame = function(){
    startButton.addEventListener('click', loadQuestion);
    startTimer(minute, display);
}

startGame();

// To Do: 
// Ensure that questions do not repeat
// Score still isn't working; timer won't subtract 
// Implement "view high scores" section