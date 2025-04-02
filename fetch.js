const allbtns = document.querySelectorAll('.nav-button');
const blockWelcome = document.querySelector('.content__welcome');
const blockQuiz = document.querySelector('.quiz__main');
const blockResult = document.querySelector('.result__quiz');
const askElement = document.getElementById('ask_element');
const progressItem = document.querySelector('.progress-item');
const answerItems = document.querySelectorAll('.answer');
const submitAnswer = document.getElementById('answer_submit');
const nextAnswer = document.getElementById('answer_next');
const checkResult = document.getElementById('answer_check');
const playAgain = document.getElementById('play-again');
const err = document.querySelector('.err');
const totalNum = document.getElementById('total_num');

let data;
let currentQuestion = 0;
let currentIndex;
let countOfQuestions;
let correctAnswers = 0;

// Function to update the progress bar
function progress(currentQuestion, countOfQuestions) {
    let progress = (currentQuestion + 1) / countOfQuestions * 100;
    progressItem.style.width = progress + '%';
}
// Function to load and display a question
function questionFunc(ind, num, curr) {
    const questionNum = document.createElement('p');
    const questionEl = document.createElement('p');
    questionNum.classList.add('italic_p');
    questionEl.classList.add('question');
    questionNum.textContent = `Question ${curr + 1} of ${num}`;
    questionEl.textContent = data.quizzes[ind].questions[curr].question;
    askElement.innerHTML = '';

    // Populate answer choices
    answerItems.forEach((element, indexItem) => {
        element.style.pointerEvents = 'auto';
        element.innerHTML = '';
        element.classList.remove('green-border', 'red-border', 'purple-border', 'selected');
        
        const alphabet = "ABCD";
        const alphList = document.createElement('div');
        const answerA = document.createElement('p');
        alphList.classList.add('v-a');
        alphList.textContent = alphabet[indexItem];
        answerA.setAttribute('data-answerCorrect', data.quizzes[ind].questions[curr].options[indexItem] === data.quizzes[ind].questions[curr].answer);
        answerA.textContent = data.quizzes[ind].questions[curr].options[indexItem];
        element.append(alphList, answerA);
        
        element.onclick = null;
        element.addEventListener('click', () => handleAnswerClick(element, answerA));
    });
    askElement.append(questionNum, questionEl);
}

// Function to handle answer selection
function handleAnswerClick(itemEl, ans) {
    answerItems.forEach(el => {
        el.classList.remove('selected', 'green-border', 'red-border', 'purple-border');
        el.style.pointerEvents = 'none';
    });
    itemEl.classList.add('selected', 'purple-border');
    itemEl.querySelector('div').classList.add('purple-ground');
}

// Function to load the next question
function nextQuestion() {
    currentQuestion++;
    progress(currentQuestion, countOfQuestions);
    if (currentQuestion < countOfQuestions) {
        questionFunc(currentIndex, countOfQuestions, currentQuestion);
        submitAnswer.style.display = 'block';
        nextAnswer.style.display = 'none';
    } else {
        nextAnswer.style.display = 'none';
        checkResult.style.display = 'block';
    }
}

// Function to display the quiz result
function showResult() {
    blockQuiz.style.display = 'none';
    blockResult.style.display = 'block';
    document.querySelector('.result_amount').textContent = correctAnswers;
}

// Function to check the selected answer
function checkAnswer() {
    const choosedEl = document.querySelector('.selected');
    if (!choosedEl) {
        err.style.visibility = 'visible';
        return;
    }
    err.style.visibility = 'hidden';
    
    const correctEl = Array.from(answerItems).find(elem => elem.querySelector('p').getAttribute('data-answerCorrect') === 'true');
    let divGround = choosedEl.querySelector('div');
    choosedEl.classList.remove('purple-border');
    divGround.classList.remove('purple-ground');
    const imgIcon = document.createElement('img');

    if (choosedEl.querySelector('p').getAttribute('data-answerCorrect') === "true") {
        choosedEl.classList.add('green-border');
        imgIcon.src = './images/icon-correct.svg';
        imgIcon.classList.add('correct-img');
        choosedEl.append(imgIcon);
        divGround.classList.add('green-ground');
        correctAnswers++;
    } else {
        choosedEl.classList.add('red-border');
        imgIcon.src = './images/icon-incorrect.svg';
        imgIcon.classList.add('incorrect-img');
        choosedEl.append(imgIcon);
        choosedEl.querySelector('div').classList.add('red-ground');
        const imgIconGreen = document.createElement('img');
        imgIconGreen.src = './images/icon-correct.svg';
        imgIconGreen.classList.add('correct-img');
        correctEl.append(imgIconGreen);
    }

    if (currentQuestion < countOfQuestions - 1) {
        submitAnswer.style.display = 'none';
        nextAnswer.style.display = 'block';
    } else {
        nextAnswer.style.display = 'none';
        submitAnswer.style.display = 'none';
        checkResult.style.display = 'block';
    }
}

// Function to restart the quiz
function restartQuiz() {
    blockResult.style.display = 'none';
    blockWelcome.style.display = 'block';
    checkResult.style.display = 'none';
    submitAnswer.style.display = 'block';
}

// Fetch quiz data from JSON file
fetch('./data.json')
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData;
        
        allbtns.forEach((el, index) => {
            el.addEventListener('click', () => {
                currentIndex = index;
                blockWelcome.style.display = 'none';
                blockQuiz.style.display = 'block';
                countOfQuestions = data.quizzes[index].questions.length;
                totalNum.textContent = countOfQuestions;
                currentQuestion = 0;
                correctAnswers = 0;
                questionFunc(index, countOfQuestions, currentQuestion);
                progress(currentQuestion, countOfQuestions);
            });
        });
        
        nextAnswer.addEventListener('click', nextQuestion);
        checkResult.addEventListener('click', showResult);
        submitAnswer.addEventListener('click', checkAnswer);
        playAgain.addEventListener('click', restartQuiz);
    })
    .catch(error => console.log("EEERRROOOORRR!!", error));