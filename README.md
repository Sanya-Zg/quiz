
# Quiz  
#### Video Demo: [<URL HERE>](https://youtu.be/7qwgCl0hK6I)  
#### Description:  

This is an interactive web quiz that allows users to test their knowledge in various categories. Currently, it includes HTML, CSS, JS, and Accessibility, but the number of categories can be expanded—this is just a short demonstration. The project is built using web technologies and has a simple, intuitive interface. The main goal of this quiz is to make learning fun and engaging.  

First, in the **Answers** tab, you can review the questions along with a brief explanation that describes the correct answer.  
In the **Quiz** tab, you can select a quiz by topic. Each question has four answer choices (only one is correct). When selecting the correct answer, the button's border turns green, and a green icon appears. If the answer is incorrect, the button's border turns red, and a red icon appears. If no answer is selected, a red message appears at the bottom, prompting you to choose an answer.  
At the end of the quiz, you can see how many correct answers you provided.  
All data is retrieved from a `.json` file using the `fetch()` function.  

## Demo  
You can test the application at:  
👉 ![Quiz](https://sanya-zg.github.io/quiz/index.html)  

## Main Features  
- Selection of different question categories.  
- Automatic validation of correct and incorrect answers.  
- Score calculation at the end of the quiz.  
- Responsive design for mobile and desktop devices.  

## Technologies Used  
This project is built using:  
- **HTML** – for structuring the page.  
- **CSS** – for styling the interface and responsive design.  
- **JavaScript** – for handling quiz logic, timer, and answer validation.  

## Project Structure  
The project includes the following main files:  

- **index.html** – the main page of the project, which provides general information about the available quiz topics.  
- **quiz.html** – the main quiz page where questions and answer choices are displayed.  
- **styles.css** – styles for page layout, buttons, and other UI elements.  
- **script.js** – Contains the main JavaScript logic that powers the quiz, including:
  - Fetching questions from `data.json`.
  - Handling user interactions (answer selection, displaying results, etc.).
  - Managing visual feedback for correct and incorrect answers.
- **data.json** – a file containing an array of questions and answer options.  

## GitHub username : zg-prog
## edX username: SanyaMas
