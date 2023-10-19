/* Wait for the DOM to finish loading before running the game
 * Get the button elements and add event listeners to them
*/
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

    /** this adds a listener to the Enter key on the keyboard so that our answers can log when user presses Enter on keyboard
     *This means the user don't always have to us the submit button to enter their answer */
    document.getElementById("math-answer-box").addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }

    });

    runGame("addition");

});


/**
 * The main game "loop" will be called when the script is first loaded
 * and after the user's answer has been processed
 */
function runGame(gameType) {
    // This sets the answer box to empty after each game is played and recorded
    document.getElementById("math-answer-box").value = "";

    //this lets the cursor stay in the answer-box rather than the user clicking in it to type answer
    document.getElementById("math-answer-box").focus();

    //This creates a random number between 1 and 25
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
        throw `Unknow game type: ${gameType}. Abborting!`;
    }
}

/**
 * checks the answer against the first element in the calculateCorrectAnswer()
 * array
 * Also checks if user submits without an input and displays an error message
 */
function checkAnswer() {
    let userAnswer = document.getElementById("math-answer-box").value.trim(); // Trim the input
    if (userAnswer === "") {
        alert("Invalid input. Please enter your answer first, then press the Enter key or click Submit Answer to continue."); // msg for no input error
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
        runGame(calculatedAnswer[1]);
    }
}


/**
 * Gets the operands (the random numbers) and operator (addition, divide etc)
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
        throw `Unimplemented operator ${operator}. Abborting!..`;
    }


}

/** 
 * Gets code from the DOM and increments it by 1, then displays it in the score box
 */
function incrementScore() {
    let oldScore = parseInt(document.getElementById('math-score').innerText);
    document.getElementById('math-score').innerText = ++oldScore;

}

/** 
 * Gets code from the DOM and increments it by 1, then displays it in the incorrect box
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
    /** we use ternary operation here to call an if statement on the subtract function 
     * so that if the first number is greater than the second number, 
     * the ternary function will automatically put the bigger number in front before the subtraction takes place
     * this is to avoid getting a negative (minus) result
     * */
    document.getElementById('operand1').textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById('operand2').textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById('operator').textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand1').textContent = operand1;
    document.getElementById('operand2').textContent = operand2;
    document.getElementById('operator').textContent = "*";

}