# Brain Teaser Games

![BT logo](assets/images/btlogo.png)

Brain Teaser Games is a web-based application designed for users of all ages to test their knowledge of country flags and basic math calculations. The app currently offers two exciting games: "Flag Quiz" and "Love Math." It aims to provide an enjoyable and educational experience to players. The app was built using `html`, `css`, and `javascript`. The app has gone through testing and debugging stages.

![BT Game pages](assets/images/btgamepage.png)

# Features

## Flag Quiz

![BT FlagGame page](assets/images/flaggame.png)

- The Flag Quiz game challenges users to identify the country associated with a displayed flag.
- The game consists of 25 questions, testing the player's knowledge of flags from around the world.
- At the end of the quiz, the user will receive their score, and the app will provide feedback on their performance.
- Also at the end of the quiz, A **Click OK to Restart Game** message is displayed on the screen to ask users if they would like another try.

## Basic Calculation

![BT MathGame pages](assets/images/mathgame.png)

- Basic Calculation is a math-based game that quizzes users on four different data types: addition, subtraction, multiplication, and division.
- Players can select the specific math operation they want to play.
- The game is designed to help users improve their math skills while having fun.
  
## Registration

![BT Register page](assets/images/registerpage.png)

The game has a register/signup page where users can sign up to receive game updates and activities. The register page has been made very simple and straight-forward so that users can fill up their details in very little time.

## Game Upcoming Update

- We are working on updating the flag game to include a 4 option answers a user can select from rather than typing out the quiz answer by themselves. We hope that users can get a more enjoyable experience while interacting with the game app once this update has been released.

- We are also working on setting difficulty level to the maths game and setting a total number of questions and a pass mark for users who play the game
  
- We are also working on improving math game accessibility across all devices and this will be fixed in the next update

## Future Upcoming Games

In the future, we plan to expand the Brain Teaser Games app by adding more exciting games. Some of the upcoming games include:

- Spelling Game: Test your spelling skills by guessing the correct spelling of words.
- Word Meaning: Guess the meaning of various words and learn new vocabulary.
- Guess the Brand Name: Identify famous brands based on their logos or descriptions.
- Fill in the Gap: Complete sentences by filling in the missing words.
- And more..
  
## Usage

### Running the App Locally

To run the Brain Teaser Games app locally for development and testing purposes, follow these steps:

1. Clone the repository:

   ```bash
    git clone <https://github.com/irishcoders/memory-games.git>
    ```

    Alternatively, you can download the ZIP file and extract it to your local machine.

2. Navigate to the project directory:

   ```bash
    cd memory-games
    ```

3. Install dependencies:
   `npm install`

4. Start the development server:

    ```sql
    npm start
    ```

5. Once the server is running, open your web browser, and visit `http://localhost:3000` to access the app.

## Testing the App

To run the automated tests for the Brain Teaser Games app, use the following command:

 ```bash
 npm test
 ```

This will execute the test suite and provide feedback on the app's functionality.

## Troubleshooting

### Common Debugging Errors

While running the Brain Teaser Games app, you might encounter some common debugging errors. Below is an example of a potential issue and its solution:

- Null Reference Error
  
**Error Description:** This error occurs when the code attempts to access a property or call a method on an object that is null or undefined.
    **Example:**

```javascript
    function updateScore() {

        // Get the score element from the DOM
        var scoreElement = document.getElementById('score');

        // Update the score text
            scoreElement.textContent = score;
        }
```

**Solution:** To avoid this error, it's essential to check if the element exists before accessing its properties or calling methods on it.

**Updated Code:**

```javascript
     function updateScore() {
            // Get the score element from the DOM
            var scoreElement = document.getElementById('score');

            // Check if the element exists before updating the score
            if (scoreElement) {
                scoreElement.textContent = score;
            } else {
                console.error("Score element not found!");
            }
        }
```

By following the above fix, the code will handle the situation where the element with the ID "score" is not found in the HTML document, preventing the Null Reference Error.

### Other Debugging processes

The app `html` and `ccs` code has been tested using The W3C Mark Up Validator (<https://validator.w3.org/nu/#textarea>) and The W3C CSS Validator (<https://jigsaw.w3.org/css-validator/validator>). A LightHouse test has also been carried out during the debugging phase of the app development.

### Unfixed Bugs

- The Math Game media query needs resizing on smaller device. Still in the process of resolving and will be fixed in the next game update. 
- LightHouse reports 68% for Math Game accesibility and this will be fixed in the next game update.

## Future Development

We are excited to expand the app's game collection and enhance the user experience. The upcoming games will offer diverse challenges and learning opportunities. We also plan to create a mobile app version to make Brain Teaser Games easily accessible on smartphones and tablets.

## Credits

We would like to give credit to the following sources:

- Unsplash (<https://www.unsplash.com>) and Pexels (<https://pexels.com>) for providing the images used in the project.

- Code Institute's Love Math project, which served as the inspiration for the math game in our app.

- Adam Khoury Javascript Youtube tutorial (<https://youtu.be/tLxBwSL3lPQ>) for teaching us how to use the Fisher-Yates algorithm to shuffle an array, which was helpful in building certain game components.

- PythonTutor for testing all the code before pasting them in VSCode

- Google searches for learning more about iteration and building complex javascript in the DOM.
  
## Contributing

At the moment, this project is the second assignment project for me, Oluwaseyi Babalola under the full stack web development program at Code Institute. As such, we are not accepting external contributions at this time.

However, we appreciate your interest in the project, and if you have any suggestions or feedback, feel free to reach out to us

## Licensing

This project is the second project in my Full Stack Web Development program and this app is developed to be submitted as my javascript project at (CodeInstitute.com)
