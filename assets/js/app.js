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
var timeLeft = 60;
var usedQuestions = [];
var mainContainer = document.querySelector('.main-container');
var timeEl = document.querySelector('#timer');
var startButton = document.querySelector('.start-button');
var display = document.getElementById("timer");
var scoreEl = document.querySelector('.score');
var timeLeft = 60;
var question;

scoreEl.innerHTML = score;

var loadStartBtn = function(){
    var html = `
    <button class="start-button">Start!</button>
    `
    mainContainer.innerHTML = html;
}

var randomQuestion = function(){
    var randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}

var loadIntoStorage = function(){
    questions.forEach(function(question){
        localStorage.setItem("question", JSON.stringefy(questions)); // is for loop necessary
    })
    localStorage.setItem('score', JSON.stringefy(score));
}

var endGame = function(){
    window.alert("The game is ended!");
    timeLeft = 60;
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
        runGame();
    } else {
        loadStartBtn();
    }
}

var startTimer = function() {
    var timeInterval = setInterval(function(){
        if (timeLeft > 1) {
            display.textContent = `${timeLeft} seconds remaining`
            timeLeft--
        } else if (timeLeft === 1) {
            display.textContent = `${timeLeft} second remaining`
        } else {
            clearInterval(timeInterval);
            display.textContent = '';
        }
    }, 1000)
}

var loadQuestion = function() {
    question = randomQuestion()
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
    `;
    mainContainer.innerHTML = html;
    var answers = document.querySelector('.answers');
    answers.addEventListener('click', function(event){
        var selection = event.target.dataset.id;
        if (selection === question.correct) {
            score++;
            score.innerHTML = score;
        } else {
            timer -= 10;
        }
    });
}

var runGame = function(){
    startTimer();
    loadIntoStorage();
    loadQuestion();
}

// questions are added all at once, so that length of usedQuestions is immediately same length of questions
// Want to loop through questions array, but not 

startButton.addEventListener('click', runGame)


// To Do: 
// Remove randomization - unnecessary
// Score still isn't working; timer won't subtract 
// Implement "view high scores" section