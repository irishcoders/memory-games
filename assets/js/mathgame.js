/* Wait for the DOM to finish loading before running the game */
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    // This adds a listener to the Enter key on the keyboard so that answers can be submitted when the Enter key is pressed
    document.getElementById("math-answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame("addition");

});

let totalQuestions = 25; // Set the total number of questions

let correctAnswers = 0; // Initialize the correct answers counter

/**
 * The main game "loop" will be called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    if (correctAnswers >= totalQuestions) {
        // Check if the user has answered all questions
        const userScore = correctAnswers + " out of " + totalQuestions;
        if (correctAnswers >= 20) {
            alert`Congratulations! You passed. You scored ${correctAnswers} out of ${totalQuestions}`;
        } else {
            alert("Sorry, you failed. You scored " + userScore);
        }
        const restart = confirm("Would you like to restart the game or quit?");
        if (restart) {
            correctAnswers = 0; // Reset the correct answers counter
            document.getElementById("math-score").innerText = correctAnswers;
            document.getElementById("math-incorrect").innerText = 0; // Reset incorrect answers counter
        } else {
            const quitMessage = "You have chosen to quit the game. Goodbye!";
            alert(quitMessage);
            // Redirect the user to another page (example: go to the homepage)
            window.location.href = "index.html#home"; // Replace "index.html" with the URL you want to redirect to
        }
    } else {
        // This sets the answer box to empty after each game is played and recorded
        document.getElementById("math-answer-box").value = "";

        // This lets the cursor stay in the answer box rather than the user clicking in it to type an answer
        document.getElementById("math-answer-box").focus();

        // This creates random numbers between 1 and 25
        let num1 = Math.floor(Math.random() * 25) + 1;
        let num2 = Math.floor(Math.random() * 25) + 1;

        if (gameType === "addition") {
            displayAdditionQuestion(num1, num2);
        } else if (gameType === "subtract") {
            displaySubtractQuestion(num1, num2);
        } else if (gameType === "multiply") {
            displayMultiplyQuestion(num1, num2);
        } else {
            alert(`Unknown game type: ${gameType}`);
            throw `Unknown game type: ${gameType}. Aborting!`;
        }
    }
}

/**
 * Checks the answer against the correct answer
 * Also checks if the user submits without an input and displays an error message
 */
function checkAnswer() {
    let userAnswer = document.getElementById("math-answer-box").value.trim(); // Trim the input
    if (userAnswer === "") {
        alert("Invalid input. Please enter your answer first, then press the Enter key or click Submit Answer to continue.");
    } else {
        let parsedAnswer = parseInt(userAnswer);
        let calculatedAnswer = calculateCorrectAnswer();
        if (parsedAnswer === calculatedAnswer[0]) {
            alert("Congrats! You got the correct answer");
            incrementScore();
        } else {
            alert(`Aww.. Your answer was wrong, your answer was ${parsedAnswer}, but the correct answer is ${calculatedAnswer[0]}!`);
            incrementWrongAnswer();
        }
        correctAnswers++;
        runGame(calculatedAnswer[1]);
    }
}

/**
 * Gets the operands (the random numbers) and operator (addition, subtraction, multiplication)
 * directly from the DOM and returns the correct answer
 */
function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "*") {
        return [operand1 * operand2, "multiply"];
    } else {
        alert(`Unimplemented operator ${operator} `);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

/** 
 * Gets the score from the DOM and increments it by 1, then displays it in the score box
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('math-score').innerText);
    document.getElementById('math-score').innerText = ++oldScore;
}

/** 
 * Gets the incorrect score from the DOM and increments it by 1, then displays it in the incorrect box
 */
function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('math-incorrect').innerText);
    document.getElementById('math-incorrect').innerText = ++oldScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";
}
