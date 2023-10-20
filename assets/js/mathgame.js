/* Wait for the DOM to finish loading before running the game */
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                runGame();
            }
        });
    }

    document.getElementById("math-answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    runGame();
});

let totalQuestions = 10;
let correctAnswers = 0;
let incorrectAnswers = 0;

function decrementTotalQuestions() {
    totalQuestions--;
    document.getElementById("total-questions").innerText = totalQuestions;
}

function runGame() {
    // Randomly select a game type
    const gameTypes = ["addition", "subtract", "multiply"];
    const randomIndex = Math.floor(Math.random() * gameTypes.length);
    const gameType = gameTypes[randomIndex];

    if (totalQuestions === 0) {
        showResultAlert();
    } else {
        document.getElementById("math-answer-box").value = "";
        document.getElementById("math-answer-box").focus();

        let num1 = Math.floor(Math.random() * 25) + 1;
        let num2 = Math.floor(Math.random() * 25) + 1;

        decrementTotalQuestions(); // Decrement total questions when a new question is displayed

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

function checkAnswer() {
    let userAnswer = document.getElementById("math-answer-box").value.trim();
    if (userAnswer === "") {
        alert("Invalid input. Please enter your answer first.");
    } else {
        let parsedAnswer = parseInt(userAnswer);
        let calculatedAnswer = calculateCorrectAnswer();
        if (parsedAnswer === calculatedAnswer[0]) {
            alert("Congrats! You got the correct answer");
            incrementScore();
        } else {
            alert(`Aww.. Your answer was wrong. The correct answer is ${calculatedAnswer[0]}`);
            incrementWrongAnswer();
        }
        runGame();
    }
}

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
        alert(`Unimplemented operator ${operator}`);
        throw `Unimplemented operator ${operator}. Aborting!`;
    }
}

function incrementScore() {
    let oldScore = parseInt(document.getElementById('math-score').innerText);
    document.getElementById('math-score').innerText = ++oldScore;
    correctAnswers++;
}

function incrementWrongAnswer() {
    let oldScore = parseInt(document.getElementById('math-incorrect').innerText);
    document.getElementById('math-incorrect').innerText = ++oldScore;
    incorrectAnswers++;
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

function showResultAlert() {
    if (correctAnswers >= 6) {
        alert(`Congratulations! You passed. You scored ${correctAnswers} out of 10`);
    } else {
        alert(`Sorry, you failed. You scored ${correctAnswers} out of 10`);
    }

    const restart = confirm("Click 'OK' to Restart or 'Cancel' to Quit Game");
    if (restart) {
        correctAnswers = 0;
        incorrectAnswers = 0;
        totalQuestions = 10; // Reset the total questions count
        document.getElementById("math-score").innerText = correctAnswers;
        document.getElementById("math-incorrect").innerText = incorrectAnswers;
        document.getElementById("total-questions").innerText = totalQuestions; // Update the total questions element
        runGame();
    } else {
        const quitMessage = "You have chosen to quit the game. Goodbye!";
        alert(quitMessage);
        window.location.href = "index.html#home";
    }
}
