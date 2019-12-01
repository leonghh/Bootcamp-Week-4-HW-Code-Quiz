/**
 * On Game Page
 */

// Prepare Global Variables
var score = 0;
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["The head section", "The body section", "Both the head and body are correct", "The css file"],
        answer: "Both the head and body are correct"
    },
    {
        title: "How do you create a function in JavaScript??",
        choices: ["function:myFunction()", "function = myFunction()", "function myFunction()", "MyFunction(function)"],
        answer: "function myFunction()"
    },
    {
        title: "Which event occurs when the user clicks on an HTML element?",
        choices: ["onclick", "onchange", "onmouseover", "onmouseclick"],
        answer: "onclick"
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        title: "How do you select an element with id demo?",
        choices: ["#demo", "demo", ".demo", "*demo"],
        answer: "#demo"
    },
    {
        title: "How do you select elements with class name test?",
        choices: ["#test", "*test", ".test", "test"],
        answer: ".test"
    },
    {
        title: "What does HTML stand for?",
        choices: ["Home Tool Markup Language", "Hyper Text Markup Language", "Hyper Tool Mark Language", "Hyperlinks and Text Markup Language"],
        answer: "Hyper Text Markup Language"
    },
    {
        title: "Choose the correct HTML element for the largest heading:",
        choices: ["h1", "h6", "head", "heading"],
        answer: "h1"
    },
]
var currentQuestionIndex = 0;
var scoreCounter = 0;
var secondsLeft = 90;
// var remainingSeconds = totalSeconds;
var timeEl = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var highScorebtn = document.getElementById("highScorebtn");
var startPage = document.getElementById("startPage");
var quizPage = document.getElementById("quizPage");
var scorePage = document.getElementById("scorePage");
var highScorePage = document.getElementById("highScorePage");
var questionDisplay = document.getElementById("quizDisplay");
var choiceList = document.getElementById("buttons");
var resultDisplay = document.getElementById("resultDisplay");
var userResult = document.getElementById("userResult");
var userInitial = document.getElementById("userInitial");
var submitBtn = document.getElementById("submitBtn");
var highScoreList = document.getElementById("highScoreList")
var timesPlayedCount = document.getElementById("timesPlayed")
var restartBtn = document.getElementById("restartBtn"); 
var clearBtn = document.getElementById("clearBtn");

var highscores = [];

// startButton onClick
startBtn.addEventListener("click", function () {
    // Hide startButton
    currentQuestionIndex = 0;
    secondsLeft = 90;
    startPage.style.display = "none";
    quizPage.style.display = "block";
    // startCountDown (totalSeconds), inside of the interval function
    // remainingSeconds --
    // If time finished
    // stopTimer
    // saveCurrentScore(initial)
    // Else
    renderTimer();
    // Display the first question. 
    // Get the first question. (currentQuestion = questions[currentQuestionIndex])
    renderQuestion();
});

function renderQuestion() { 
    if (currentQuestionIndex == questions.length) {
        displayResult()
    }
    resetState()
    // show question
    questionDisplay.innerHTML = questions[currentQuestionIndex].title
    // show choices
    for (var i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
        var button = document.createElement('button')
        button.innerText = questions[currentQuestionIndex].choices[i]
        button.classList.add("choice-button-style", "choiceBtn")
        button.addEventListener('click', selectAnswer)
        choiceList.appendChild(button)    
    }
}

function resetState() {
    // titleEl = doc.getTitle
    // choiceListEl = doc.getChoices
    // question.getTitle
    // question.getChoices
    // question.getAnswer
    // titleEl.text = questionTitle

    // choiceListEl = questionChoices (involces appending <li> <li> <li> <li>)
    // for (var i = 0; i < questions[i].choices.length; i++) {
    //     var choiceBtn = document.getElementsByClassName("choiceBtn")
    //     console.log(choiceBtn.textContent)
    //     choiceBtn.textContent = ""
    // }
    var div = document.getElementById('buttons');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}


function selectAnswer() {
    // Get userChoice from button (which did user choose?)
    var userChoice = this.innerHTML;
    // Compare userChoice with answer
    // If correct
    if (userChoice == questions[currentQuestionIndex].answer) {
        // Increment Score (score++)
        scoreCounter++;
        // Alert user
        resultDisplay.innerHTML = "Correct!";
        currentQuestionIndex++;
        renderQuestion();
        return;
    }
    else {
        // remainingSeconds--
        for (var i = 0; i < 15; i++) {
            secondsLeft--
        };
        // alert user
        resultDisplay.innerHTML = "Wrong!";
        currentQuestionIndex++;
        renderQuestion();
    }
}

function displayResult() {
    quizPage.style.display = "none";
    scorePage.style.display = "block";
    var finalScore = parseInt(secondsLeft) + parseInt(scoreCounter);
    if (finalScore < 0) {
        finalScore = 0
    }
    userResult.innerHTML = finalScore;
}

        // If there IS a nextQuestionIndex. (nextQuestionIndex = currentQuestionIndex + 1)

        // If nextQuestionIndex == (question.length -1).
        // Get the next question (nextQuestion = questions[nextQuestionIndex])
        // render(nextQuestion)

        // Else, means last question ALREADY finished
        // stopTimer
        // If remainingSeconds
        // Add remainingSeconds to score
        // saveCurrentScore(initial)


// function renderTimer() {
function renderTimer() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = "Timer: " + secondsLeft;

        if (secondsLeft < 0) {
            clearInterval(timerInterval);
            alert("Time ran out!")
            displayResult()
        }
        if (currentQuestionIndex == questions.length) {
            clearInterval(timerInterval);
        }
        highScorebtn.addEventListener("click", function() {
            clearInterval(timerInterval);
        });

    }, 1000);
}

init();

function renderUserHighScore() {
    highScoreList.innerHTML = "";
    timesPlayedCount.textContent = highscores.length;

    for (var i = 0; i < highscores.length; i++) {
        var highscore = highscores[i];

        var li = document.createElement("li");
        li.textContent = highscore;
        li.setAttribute("data-index", i)

        var button = document.createElement("button");
        button.textContent = "Complete";

        highScoreList.appendChild(li)
    }
}
    // var userInitial = localStorage.getItem("userInitial");
    // var finalScore = localStorage.getItem("finalScore");

    // highScoreList.innerHTML = userInitial + " - " + finalScore;
// }


function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("highscores"));

    if (storedHighScores !== null) {
        highscores = storedHighScores;
      }

      renderUserHighScore();
}

function storeHighScores() {
    localStorage.setItem("highscores", JSON.stringify(highscores));
}



submitBtn.addEventListener("click", function() {
    scorePage.style.display = "none";
    highScorePage.style.display = "block";
    event.preventDefault();

    var userInitialText = userInitial.value.toUpperCase();
    var finalScoreText = userResult.innerHTML
    var highScoreText = userInitialText + " - " + finalScoreText


    highscores.push(highScoreText);
    userInitial.value = "";

    storeHighScores();
    renderUserHighScore();
});


    // var userInitial = document.getElementById("userInitial").value.toUpperCase();
    // if (userInitial === "") {
    //     alert("Please type in your initials");
    //   }

    // localStorage.setItem("userInitial", userInitial);
    // renderUserHighScore();
// });

restartBtn.addEventListener("click", function() {
    highScorePage.style.display = "none";
    startPage.style.display = "block";
    location.reload();
});

clearBtn.addEventListener("click", function() {
    timesPlayedCount.textContent = "0";
    localStorage.clear();
    var div = document.getElementById('highScoreList');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
});

highScorebtn.addEventListener("click", function() {
    showHighScorePage()
});

function showHighScorePage() {
    highScorePage.style.display = "block";
    startPage.style.display = "none";
    quizPage.style.display = "none";
    scorePage.style.display = "none";
}


// function saveCurrentScore() {
// var initial = Ask for initials
// create a score object
// var currentScore = {
//     "name": initial,
//     "score": score
// }
// append currentScore to LocalStorage
// goToHighScorePage
// }















/**
 *  On HighScore Page
 */

    // function getHighScores() {
        // getHighScores from LocalStorage
        // Sort
    // }

    // getHighScores()
    // renderList()

    // Display highScores
    // renderList()

    // clearButton.onClick
    // clear LocalStorage
    // alert user

    // If we are staying on the page
    // getHighScores() // return []
    // renderList() // renders empty list
    // Else we are going back to gamePage
    // goBack to GamePage

    // renderList()
    // getListEl
    // for each highScore (from LocalStorage)
    // create <li>
    // li.text = highScore
    // listEl.appendChild(li)
    // Collapse



