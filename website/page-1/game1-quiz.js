"use strict"
/**
 * Used "How To Make Quiz App Using JavaScript | Build Quiz App With HTML CSS & JavaScript" Tutorial on YouTube
 * (https://www.youtube.com/watch?v=PBcqGxrr9g8)
 */

const questions = [
    {
        question: "In what way do we own nothing?",
        answers: [
            { text: "We pay taxes.", correct: false },
            { text: "We live in a subscription based society.", correct: true },
            { text: "We are not a part of the 1%.", correct: false },
        ]
    },

    {
        question: "What year was Youtube founded in?",
        answers: [
            { text: "In 1997.", correct: false },
            { text: "In 2009.", correct: false },
            { text: "In 2005.", correct: true },
        ]
    },
    {
        question: "Where is Capitalism?",
        answers: [
            { text: "Everywhere.", correct: true },
            { text: "Nowhere.", correct: false },
            { text: "Capitalism does not exist.", correct: false },
        ]
    },

    {
        question: "Who is Hatsune Miku?",
        answers: [
            { text: "A Vocaloid Artist.", correct: true },
            { text: "A blue charachter.", correct: true },
            { text: "All of the above.", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();