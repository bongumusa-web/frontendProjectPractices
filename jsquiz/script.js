const questions = [
    {
        image:"<img src='images/pig.jpg' alt ='pig'>",
        question:'Which animal is this in the image? ',
        answers:[
            {text:"Goat", correct: false},
            {text:"Dog", correct: false},
            {text:"Pig", correct: true},
            {text:"Cow", correct: false},
        ]
    },
    {
        image:"<img src='images/goat.jpg' alt ='Goat'>",
        question:'what do you see in the image? ',
        answers:[
            {text:"Goat", correct: true},
            {text:"Dog", correct: false},
            {text:"Pig", correct: false},
            {text:"Cow", correct: false},
        ]
    },
    {
        image:"<img src='images/Messi.jpg' alt ='Messi'>",
        question:'This player has won many trophies',
        answers:[
            {text:"Mbabbe", correct: false},
            {text:"Ronald", correct: false},
            {text:"Kane", correct: false},
            {text:"Messi", correct: true},
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Highlevel Text Managing Language", correct: false },
            { text: "Hyperlinks and Text Management Language", correct: false },
            { text: "Home Tool Markup Language", correct: false }
        ]
    },
];

const questionTodo = document.getElementById("questionTodo");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("nex-btn");
const imageContainer = document.getElementById("image-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML ='Next';
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    // checking if the question has image if yes we display the image div and the image or else we display nothing 
    if(currentQuestion.image){
        imageContainer.innerHTML = currentQuestion.image;
        imageContainer.style.display ="block";
    }
    else{
        imageContainer.style.display ="none";
    }

    // display the question number and the question 
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
};

function resetState(){
    nextButton.style.display ='none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
};

// function for right and wrong answer: correct = light green, wrong = light red 
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // ✅ Added this block outside the if-statement so it runs every time
    let totalQuestions = questions.length;
    let questionLeft = totalQuestions - currentQuestionIndex - 1;
    questionTodo.innerHTML = "Question " + (currentQuestionIndex + 1) + " of " + totalQuestions;
    // ✅ End of added/adjusted section

    // checking if the selected answer is correct and change the background color to light green
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    // disabling the clicking of buttons after selecting an answer and show the correct answer 
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display ="block";
};




// shows score fuction

function showScore(){
    resetState();
    const percentage = (score / questions.length) * 100;

    // ✅ Create a custom message based on performance
    let message = "";
    if (percentage >= 80) {
        message = `<h1 style="color: #28a745; font-size: 2rem; text-align:center;">
                     🎉 Congratulations! 🎉<br>
                     You scored ${score} out of ${questions.length} (${percentage.toFixed(0)}%)
                   </h1>`;
    } else if (percentage >= 50) {
        message = `<h1 style="color: #ffc107; font-size: 2rem; text-align:center;">
                     👍 Good effort!<br>
                     You scored ${score} out of ${questions.length} (${percentage.toFixed(0)}%)
                   </h1>`;
    } else {
        message = `<h1 style="color: #dc3545; font-size: 2rem; text-align:center;">
                     😔 Keep practicing!<br>
                     You scored ${score} out of ${questions.length} (${percentage.toFixed(0)}%)
                   </h1>`;
    }

    // ✅ Display result
    questionElement.innerHTML = message;

    // ✅ Change button text to restart
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


// function to start the quiz or move to next question
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
};

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
