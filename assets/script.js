// JavaScript code for the quiz game
const quizData = [
  {
    imageSrc: "assets/images/flags/nigeria.jpeg",
    answer: "nigeria",
  },
  {
    imageSrc: "assets/images/flags/Ireland.jpeg",
    answer: "ireland",
  },
  // Add more questions here...
];

let currentQuestion = 0;
let score = 0;

const imageElement = document.getElementById("image");
const answerBox = document.getElementById("answer-box");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const incorrectScore = document.getElementById("incorrect");

// Function to load the current question (image)
function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];
  imageElement.src = currentQuiz.imageSrc;
  answerBox.value = "";
  answerBox.focus();
}

// Function to check the user's answer
function checkAnswer() {
  const userAnswer = answerBox.value.toLowerCase().trim();
  const currentQuiz = quizData[currentQuestion];
  
  if (userAnswer === currentQuiz.answer.toLowerCase()) {
    score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Display the final score or redirect to another page after all questions are answered
    imageElement.style.display = "none";
    answerBox.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.textContent = `Final Score: ${score} out of ${quizData.length}`;
  }
}

// Event listener for the submit button to check the answer and load the next question
submitButton.addEventListener("click", checkAnswer);

// Start the quiz when the page loads (optional)
loadQuestion();
