let currentQuestion = 0;
let correctScore = 0;
let incorrectScore = 0;
let totalQuestions = 25; // total number of questions in the quizdata

let quizDatas = [
    { imageSrc: 'assets/images/flags/argentina.jpeg', answer: 'argentina' },
    { imageSrc: 'assets/images/flags/algeria.jpeg', answer: 'algeria' },
    { imageSrc: 'assets/images/flags/botswana.jpeg', answer: 'botswana' },
    { imageSrc: 'assets/images/flags/croatia.jpeg', answer: 'croatia' },
    { imageSrc: 'assets/images/flags/germany.jpeg', answer: 'germany' },
    { imageSrc: 'assets/images/flags/ghana.jpeg', answer: 'ghana' },
    { imageSrc: 'assets/images/flags/Greece.jpeg', answer: 'greece' },
    { imageSrc: 'assets/images/flags/italy.jpeg', answer: 'italy' },
    { imageSrc: 'assets/images/flags/Ireland.jpeg', answer: 'ireland' },
    { imageSrc: 'assets/images/flags/latvia.jpeg', answer: 'latvia' },
    { imageSrc: 'assets/images/flags/malaysia.jpeg', answer: 'malaysia' },
    { imageSrc: 'assets/images/flags/mexico.jpeg', answer: 'mexico' },
    { imageSrc: 'assets/images/flags/namibia.jpeg', answer: 'namibia' },
    { imageSrc: 'assets/images/flags/nigeria.jpeg', answer: 'nigeria' },
    { imageSrc: 'assets/images/flags/peru.jpeg', answer: 'peru' },
    { imageSrc: 'assets/images/flags/poland.jpeg', answer: 'poland' },
    { imageSrc: 'assets/images/flags/portugal.jpeg', answer: 'portugal' },
    { imageSrc: 'assets/images/flags/Seychelles.jpeg', answer: 'seychelles' },
    { imageSrc: 'assets/images/flags/SouthAfrica.jpeg', answer: 'south africa' },
    { imageSrc: 'assets/images/flags/spain.jpeg', answer: 'spain' },
    { imageSrc: 'assets/images/flags/ukraine.jpeg', answer: 'ukraine' },
    { imageSrc: 'assets/images/flags/zimbabwe.jpeg', answer: 'zimbabwe' },
    { imageSrc: 'assets/images/flags/oman.jpeg', answer: 'oman' },
    { imageSrc: 'assets/images/flags/suriname.jpeg', answer: 'suriname' },
    { imageSrc: 'assets/images/flags/tuvalu.jpeg', answer: 'tuvalu' },

];

// Shuffle the quizDatas array to display questions in random order
shuffleArray(quizDatas);

document.addEventListener("DOMContentLoaded", function () {
    let button = document.getElementsByTagName("submit");

    button.addEventListener("click", function () {
        let ans = document.getElementById("answer-box");
        let validAns = validateAns(ans.value);
        button.disabled = true;
        if (validAns == true) {
            checkAnswer();
        } else {
            runGame(); 
        }
        
    });

    runGame(); // Call runGame() here to start game
});

function validateAns(answer) {
    let error = document.getElementById("error");
    if (answer-trim() == "") {
        error.innerHTML = "Invalid Input. Please enter an answer.";
        return false;
    } else {
        error.innerHTML = "";
        return true;
    }
}
// Call

function runGame() {
    // This sets the answer box to empty after each game is played and recorded
    document.getElementById("answer-box").value = "";

    // This lets the cursor stay in the answer-box rather than the user clicking in it to type answer
    document.getElementById("answer-box").focus();

    displayQuestion(quizDatas[currentQuestion]);
}

function displayQuestion(question) {
    document.getElementById("image").src = question.imageSrc;
    //this will hide the display msg after it displays
    document.getElementById("message").textContent = "";
}

function checkAnswer() {
    let userAnswer = document.getElementById("answer-box").value.toLowerCase().trim();
    let currentQuizData = quizDatas[currentQuestion];
    let isCorrect = userAnswer === currentQuizData.answer;

    if (isCorrect) {
        document.getElementById("message").textContent = "Brilliant! You got the correct answer.";
        incrementScore();
    } else {
        document.getElementById("message").textContent = `Sorry.. Your answer was wrong. You entered ${userAnswer}. The correct answer is ${currentQuizData.answer}.`;
        incrementIncorrectScore();
    }

    // Clear the answer box for new user input after submitting
    document.getElementById("answer-box").value = "";

    // Clear the display message after a set time of 2seconds before loading the next question
    setTimeout(() => {
        document.getElementById("message").textContent = "";
        decrementRemainingQuestions();
    }, 2000);
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
    if (correctScore >= 20) {
        messageElement.textContent = `Well done, you passed! You scored ${correctScore} out of 25.`;
    } else {
        messageElement.textContent = `Game over, you failed. You scored ${correctScore} out of 25.`;
    }
    // this will display alert to restart the game
    setTimeout(() => {
        alert("Click OK to restart the game.");
        resetGame();
    }, 500);
}

function resetGame() {
    currentQuestion = 0;
    correctScore = 0;
    incorrectScore = 0;
    totalQuestions = 25; // Reset to the total number of questions

    // Shuffle the quizDatas array again to display questions in random order
    shuffleArray(quizDatas);

    // Clear the alert
    document.getElementById("message").textContent = "";

    // reset the score boxes back to 0
    document.getElementById("score").textContent = "0";
    document.getElementById("incorrect").textContent = "0";
    document.getElementById("remaining").textContent = totalQuestions;

    runGame(); // Restart the game
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
