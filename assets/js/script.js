let currentQuestion = 0;
let correctScore = 0;
let incorrectScore = 0;
let totalQuestions = 3;

// Wait for the DOM to finish loading before running the game
// Get the button element and add event listeners to it

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let buttonType = this.getAttribute("data-type");
                runGame();
            }
        });
    }

    runGame();
});

function runGame() {
    // This sets the answer box to empty after each game is played and recorded
    document.getElementById("answer-box").value = "";

    // This lets the cursor stay in the answer-box rather than the user clicking in it to type answer
    document.getElementById("answer-box").focus();

    let quizDatas = [
        { imageSrc: 'assets/image/flags/portugal.jpeg', answer: 'portugal' },
        { imageSrc: 'assets/image/flags/portugal.jpeg', answer: 'portugal' },
        { imageSrc: 'assets/image/flags/turkey.jpeg', answer: 'turkey' },
        // Add more quiz questions and answers here...
    ];

    displayQuestion(quizDatas[currentQuestion]);
}

function displayQuestion(question) {
    document.getElementById("image").src = question.imageSrc;
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer-box").value.toLowerCase().trim();
    let currentQuizData = quizDatas[currentQuestion];
    let isCorrect = userAnswer === currentQuizData.answer;

    if (isCorrect) {
        document.getElementById("message").textContent = "Congrats! You got the correct answer.";
        incrementScore();
    } else {
        document.getElementById("message").textContent = `Aww.. Your answer was wrong. The correct answer is ${currentQuizData.answer}.`;
        incrementIncorrectScore();
    }

    decrementRemainingQuestions();
}

function incrementScore() {
    correctScore++;
    document.getElementById("score").textContent = correctScore;
}

function incrementIncorrectScore() {
    incorrectScore++;
    document.getElementById("incorrect").textContent = incorrectScore;
}

function decrementRemainingQuestions() {
    totalQuestions--;
    document.getElementById("remaining").textContent = totalQuestions;

    if (totalQuestions === 0) {
        endGame();
    } else {
        currentQuestion++;
        displayQuestion(quizDatas[currentQuestion]);
    }
}

function endGame() {
    let messageElement = document.getElementById("message");
    if (correctScore >= 2) {
        messageElement.textContent = `Well done, you passed! You scored ${correctScore} out of 3.`;
    } else {
        messageElement.textContent = `Game over, you failed. You scored ${correctScore} out of 3.`;
    }
}



/*
function checkAnswer() {

}

function incrementScore() {

}

function incrementIncorrectAnswer() {

}

function decrementRemainingQuestions() {

}

function displayQuestion() {

}

======================

*/