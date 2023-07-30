// Wait for the DOM to finish loading before running the game
// Get the button element and add event listeners to it

document.addEventListener("DOMContentLoaded", funtion () {
    let button = document.getElementByTagName("button");

    for(button) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") == "submit") {
                alert("You Clicked Submit");
            } else {
                let buttonType = this.getAttribute("data-type");
                alert(`you clicked ${buttonType}`);
            }
        })
    }
})
function runGame() {

}

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

