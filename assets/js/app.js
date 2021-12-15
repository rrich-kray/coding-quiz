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

var usedQuestions = [];
var mainContainer = document.querySelector('.main-container');
var timeEl = document.querySelector('#timer');
var startButton = document.querySelector('.start-button');
var display = document.getElementById("timer");
var scoreEl = document.querySelector('.score');
var timeLeft;
var question;
var score;

scoreEl.innerHTML = score;

var loadStartBtn = function(){;
    var html = `
    <button class="start-button">Start!</button>
    `
    mainContainer.innerHTML = html;
}

var randomQuestion = function(){
    if (usedQuestions.length === questions.length){
        return false;
    }
    var randomIndex = Math.floor(Math.random() * questions.length);
    var rQuestion = questions[randomIndex];
    if (!usedQuestions.includes(rQuestion)){
        usedQuestions.push(rQuestion)
    } else {
        return randomQuestion();
    }
    return rQuestion;
}

/* var loadIntoStorage = function(){
    questions.forEach(function(question){
        localStorage.setItem("question", JSON.stringify(questions)); // is for loop necessary
    })
    localStorage.setItem('score', JSON.stringify(score));
} */

var endGame = function(){
    window.alert("The game is ended!");
    window.alert(`Your final score is ${score}!`)
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
    if (!question){
        endGame();
    }
    var html = `
    <div class="question flex-row">
        <h2 class="question">${question.question}</h2>
    </div>
    <div class="answers flex-column">
        <div class="answer" id="answer1"><button data-id='choice1'>${question.choice1}</button></div>
        <div class="answer" id="answer2"><button data-id='choice2'>${question.choice2}</button></div>
        <div class="answer" id="answer3"><button data-id='choice3'>${question.choice3}</button></div>
        <div class="answer" id="answer4"><button data-id='choice4'>${question.choice4}</button></div>
    </div>
    `;
    mainContainer.innerHTML = html;
    var answers = document.querySelector('.answers');
    answers.addEventListener('click', function(event){
        var selection = event.target.dataset.id;
        console.log(selection) 
        if (selection === question.correct) {
            score += 1;
            scoreEl.innerHTML = score;
        } else {
            timeLeft -= 10;
            timeEl.innerHTML = timer;
        }
        loadQuestion();
    });
}

var runGame = function(){
    timeLeft = 60;
    timeEl.innerHTML = timeLeft
    score = 0;
    scoreEl.innerHTML = score;
    usedQuestions = [];
    startTimer();
    /* loadIntoStorage(); */
    loadQuestion();
}

startButton.addEventListener('click', runGame)


// Bugs: 
// Final score is not displayed - fixed
// Also display final stats when time runs out - fixed
// Clock continues to run aster all questions are answered - fixed
// incorrect answer penalized with time subtraction - fixed
// When user opts to play again, clock runs unusually fast
// loadStartBtn() returns question and choices labeled "undefined"
// Implement "view high scores" section
// formatting