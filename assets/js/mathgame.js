document.addEventListener("DOMContentLoaded", function () {
    const totalQuestions = 10;
    let correctAnswers = 0;
    let initialIncorrectAnswers = 0; // Store the initial incorrect score
    let incorrectAnswers = initialIncorrectAnswers; // Reset incorrect score
    let currentQuestion = 0;
    let isGameInProgress = false; // Boolean to keep track of game status

    const mathScoreElement = document.getElementById('math-score');
    const mathIncorrectElement = document.getElementById('math-incorrect');
    const totalQuestionsElement = document.getElementById('total-questions');
    const answerBox = document.getElementById('math-answer-box');
    const messageElement = document.getElementById('message');

    mathScoreElement.innerText = correctAnswers;
    mathIncorrectElement.innerText = initialIncorrectAnswers; // Resets previous incorrect score
    totalQuestionsElement.innerText = totalQuestions;

    const buttons = document.querySelectorAll("button");
    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                if (isGameInProgress) { // this ensures the game is in progress before checking the answer
                    checkAnswer();
                }
            }
        });
    });

    answerBox.addEventListener("keydown", function (event) {
        if (isGameInProgress && event.key === "Enter") { // this checks the answer on Enter key press during the game
            checkAnswer();
        }
    });

    function decrementTotalQuestions() {
        totalQuestionsElement.innerText = totalQuestions - currentQuestion;
        currentQuestion++;
    }

    function generateRandomNumber(max) {
        return Math.floor(Math.random() * max) + 1;
    }

    function calculateCorrectAnswer(operand1, operand2, operator) {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            default:
                throw new Error(`Unknown/Unimplemented operator ${operator}`);
        }
    }

    function displayMathQuestion(operand1, operand2, operator) {
        const operand1Element = document.getElementById('operand1');
        const operand2Element = document.getElementById('operand2');
        const operatorElement = document.getElementById('operator');

        operand1Element.textContent = operand1;
        operand2Element.textContent = operand2;
        operatorElement.textContent = operator;
    }

    function runGame() {
        isGameInProgress = true; // Set the game in progress

        if (currentQuestion >= totalQuestions) {
            showResultAlert(correctAnswers, incorrectAnswers);
        } else {
            answerBox.value = "";
            answerBox.focus();

            const gameTypes = ["addition", "subtract", "multiply"];
            const randomIndex = Math.floor(Math.random() * gameTypes.length);
            const gameType = gameTypes[randomIndex];

            const num1 = generateRandomNumber(25);
            const num2 = generateRandomNumber(25);

            decrementTotalQuestions();

            if (gameType === "addition") {
                displayMathQuestion(num1, num2, "+");
            } else if (gameType === "subtract") {
                const maxNum = Math.max(num1, num2);
                const minNum = Math.min(num1, num2);
                displayMathQuestion(maxNum, minNum, "-");
            } else if (gameType === "multiply") {
                displayMathQuestion(num1, num2, "*");
            }
        }
    }

    function checkAnswer() {
        const userAnswer = answerBox.value.trim();
        messageElement.textContent = "";

        if (userAnswer === "") {
            messageElement.textContent = "Invalid input. Please enter your answer first.";
        } else {
            const parsedAnswer = parseInt(userAnswer);
            const operand1 = parseInt(document.getElementById("operand1").textContent);
            const operand2 = parseInt(document.getElementById("operand2").textContent);
            const operator = document.getElementById("operator").textContent;
            const correctAnswer = calculateCorrectAnswer(operand1, operand2, operator);

            if (parsedAnswer === correctAnswer) {
                messageElement.textContent = "Brilliant! You got the correct answer";
                incrementScore();
            } else {
                messageElement.textContent = `Aww.. Sorry your answer was wrong. The correct answer is ${correctAnswer}`;
                incrementWrongAnswer();
            }

            // Set a timeout to clear the message and load the next question after a 2 secs delay 
            setTimeout(function () {
                messageElement.textContent = "";
                runGame();
            }, 2000); // Displays the restart game alert after 2 seconds
        }
    }

    function incrementScore() {
        correctAnswers++;
        mathScoreElement.innerText = correctAnswers;
    }

    function incrementWrongAnswer() {
        incorrectAnswers++;
        mathIncorrectElement.innerText = incorrectAnswers;
    }

    function showResultAlert(score, incorrect) {
        isGameInProgress = false; // Set the game as not in progress

        let resultMessage;

        if (score >= 6) {
            resultMessage = `Congratulations! you passed. You scored ${score} out of 10`;
        } else {
            resultMessage = `Sorry, you failed this time. You scored ${score} out of 10`;
        }

        messageElement.textContent = resultMessage;

        // Set a timeout to display the restart game alert after 3 seconds.
        setTimeout(function () {
            const restart = confirm("Choose 'OK' to Restart or 'Cancel' to Quit Game");
            messageElement.textContent = ""; // Clear the display message immediately

            if (restart) {
                currentQuestion = 0;
                correctAnswers = 0; // Reset the correct score
                incorrectAnswers = initialIncorrectAnswers; // Reset the incorrect score to the initial value
                mathScoreElement.innerText = 0;
                mathIncorrectElement.innerText = initialIncorrectAnswers; // Update the incorrect score display
                totalQuestionsElement.innerText = totalQuestions;
                runGame();
            } else {
                const quitMessage = "You have chosen to Quit the game. Goodbye!";
                messageElement.textContent = quitMessage;
                window.location.href = "index.html#home";
            }
        }, 3000); // This displays the restart game alert after 3 seconds
    }

    runGame();
});
