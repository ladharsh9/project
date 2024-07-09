const startbtn = document.getElementById('start-btn');
const restartbtn = document.getElementById('restart');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons_element = document.getElementById('answer-buttons');
const timer_element = document.getElementById('time');
const quiz_box = document.getElementById('quiz');
const result_box = document.getElementById('result');
const score_element = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timer;

const questions = [
    {
        question: 'What does HTML stands for ?',
        answers: [
            { text: 'Hypertext Markup Language.', correct: true },
            { text: 'Hypertext and links markup language.', correct: false },
            { text: 'Hypertext Machine language.', correct: false },
            { text: 'Hightext machine language.', correct: false }

        ]
    },
    {
        question: 'Which of the following HTML Elements is used for making any text bold ?',
        answers: [
            { text: '<br>', correct: false },
            { text: '<i>', correct: false },
            { text: '<li>', correct: false },
            { text: '<b>', correct: true }
        ]
    },
    {
        question: 'Which of the following HTML element is used for creating an unordered list?',
        answers: [
            { text: '<ul>', correct: true },
            { text: '<i>', correct: false },
            { text: '<li>', correct: false },
            { text: '<ol>', correct: false }
        ]
    },
    {
        question: 'How is document type initialized in HTML5?',
        answers: [
            { text: '</DOCTYPE html>', correct: false },
            { text: '</DOCTYPE>', correct: false },
            { text: '<!DOCTYPE HTML>', correct: true },
            { text: '</DOCTYPE html>', correct: false }
        ]
    },
    {
        question: 'What is the purpose of using div tags in HTML?',
        answers: [
            { text: 'For creating Different styles', correct: false },
            { text: 'For creating different sections', correct: true },
            { text: 'For adding headings', correct: false },
            { text: 'For adding titles', correct: false }
        ]
    },
    {
        question: 'In JavaScript, which of the following is a logical operator?',
        answers: [
            { text: '%', correct: false },
            { text: '/', correct: false },
            { text: '&&', correct: true },
            { text: '|', correct: false }
        ]
    },
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<js>', correct: false },
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false },
            { text: '<scripting>', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'Colorful Style Sheet', correct: false },
            { text: 'Common Style Sheet', correct: false },
            { text: 'Computer Style Sheet', correct: false },
            { text: 'Cascading Style Sheet', correct: true }
        ]
    },
    {
        question: 'What does SQL stand for?',
        answers: [
            { text: 'Stylish Question Language', correct: false },
            { text: 'Structured Query Language', correct: true },
            { text: 'Statement Question Language', correct: false },
            { text: 'Stylesheet Query Language', correct: false }
        ]
    },
    {
        question: 'What does PHP stand for?',
        answers: [
            { text: 'Hypertext Programming', correct: false },
            { text: 'Hypertext Preprogramming', correct: false },
            { text: 'Hypertext Preprocessor', correct: true },
            { text: 'Hometext Preprocessor', correct: false }
        ]
    }

];

startbtn.addEventListener('click', startquiz);
restartbtn.addEventListener('click', restartquiz);

function startquiz() {
    startbtn.parentElement.classList.add('hidden');
    quiz_box.classList.remove('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn', 'answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons_element.appendChild(button);
    });
}


function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtons_element.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    clearInterval(timer);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setTimeout(setNextQuestion, 1000); 
    } else {
        setTimeout(showResult, 1000); 
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    let timeLeft = 10;
    timer_element.innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timer_element.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeOut();
        }
    }, 1000);
}

function handleTimeOut() {
    Array.from(answerButtons_element.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quiz_box.classList.add('hidden');
    result_box.classList.remove('hidden');
    score_element.innerText = score;
}

function restartquiz() {
    result_box.classList.add('hidden');
    startbtn.parentElement.classList.remove('hidden');
}

function resetState() {
    clearStatusClass(document.body);
    while (answerButtons_element.firstChild) {
        answerButtons_element.removeChild(answerButtons_element.firstChild);
    }
}
