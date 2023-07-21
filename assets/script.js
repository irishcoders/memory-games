// JavaScript code for the quiz game
// Global variables to keep track of the game state
let currentQuestion = 0;
let correctScore = 0;
let incorrectScore = 0;
const totalQuestions = 25;

// Array of quiz questions and answers
const quizData = [
    {
        imageSrc: 'image.jpeg',
        answer: 'lion',
        category: 'Animal Kingdoms'
    },
    // Add more quiz questions and answers for other categories here
];

// Function to load the current question (image) and reset the message
function loadQuestion() {
    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();
    document.getElementById("message").textContent = "";

    if (currentQuestion < totalQuestions) {
        const currentQuiz = quizData[currentQuestion];
        document.getElementById("image").src = currentQuiz.imageSrc;
        document.getElementById("remaining").textContent = totalQuestions - currentQuestion;
    } else {
        // Display the final score after all questions are answered
        document.getElementById("quiz-container").innerHTML = `<p id="final-message">Game Over! You scored ${correctScore} out of ${totalQuestions}</p>`;
    }
}

// Function to check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById("answer-box").value.toLowerCase().trim();
    const currentQuiz = quizData[currentQuestion];

    if (userAnswer === currentQuiz.answer.toLowerCase()) {
        // Correct answer
        document.getElementById("message").textContent = "Well done! You got it!";
        correctScore++;
        document.getElementById("correct-score").textContent = correctScore;
    } else {
        // Incorrect answer
        document.getElementById("message").textContent = `Sorry, that's incorrect. The correct answer is "${currentQuiz.answer}"`;
        incorrectScore++;
        document.getElementById("incorrect-score").textContent = incorrectScore;
    }

    currentQuestion++;
    loadQuestion();
}

// Event listener for the submit button to check the answer and load the next question
document.getElementById("submit-btn").addEventListener("click", checkAnswer);

// Event listener for the Enter key in the answer box
document.getElementById("answer-box").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Start the quiz when the DOM loads
document.addEventListener("DOMContentLoaded", loadQuestion);
