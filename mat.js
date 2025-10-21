// Array com as questões de Matemática — formato igual ao do quiz de Geografia
const questions = [ 
  {
    question: "Qual é o valor de x na equação 3x + 7 = 19?",
    image: "img/ma1.jpg",
    answers: [
      { text: "x = 4", correct: true },
      { text: "x = 3", correct: false },
      { text: "x = 6", correct: false },
      { text: "x = 5", correct: false }
    ]
  },
  {
    question: "Qual é a derivada da função f(x) = 5x² + 3x - 2?",
    image: "img/ma2.jpg",
    answers: [
      { text: "10x + 3", correct: true },
      { text: "10x - 3", correct: false },
      { text: "5x + 3", correct: false },
      { text: "2x + 5", correct: false }
    ]
  },
  {
    question: "Qual é o valor de sen(30°) + cos(60°)?",
    image: "img/ma3.jpg",
    answers: [
      { text: "1", correct: true },
      { text: "0,5", correct: false },
      { text: "√3/2", correct: false },
      { text: "0", correct: false }
    ]
  },
  {
    question: "O determinante da matriz [[2,3],[1,4]] é:",
    image: "img/ma4.jpg",
    answers: [
      { text: "5", correct: true },
      { text: "6", correct: false },
      { text: "7", correct: false },
      { text: "4", correct: false }
    ]
  },
  {
    question: "Se log₂(x) = 5, então x é igual a:",
    image: "img/ma5.jpg",
    answers: [
      { text: "25", correct: false },
      { text: "10", correct: false },
      { text: "32", correct: true },
      { text: "64", correct: false }
    ]
  },
  {
    question: "O valor de (2³ × 3²) ÷ 6 é:",
    image: "img/ma6.jpg",
    answers: [
      { text: "6", correct: false },
      { text: "8", correct: false },
      { text: "12", correct: true },
      { text: "10", correct: false }
    ]
  },
  {
    question: "Qual é o número complexo que satisfaz i² + 4i + 4 = 0?",
    image: "img/ma7.jpg",
    answers: [
      { text: "i = -2", correct: true },
      { text: "i = 2", correct: false },
      { text: "i = -4", correct: false },
      { text: "i = 1", correct: false }
    ]
  },
  {
    question: "Qual é o volume de um cubo com aresta de 5 cm?",
    image: "img/ma8.jpg",
    answers: [
      { text: "25 cm³", correct: false },
      { text: "100 cm³", correct: false },
      { text: "125 cm³", correct: true },
      { text: "150 cm³", correct: false }
    ]
  },
  {
    question: "Se a razão de uma PA é 3 e o primeiro termo é 2, qual é o 6º termo?",
    image: "img/ma9.jpg",
    answers: [
      { text: "17", correct: false },
      { text: "20", correct: true },
      { text: "15", correct: false },
      { text: "14", correct: false }
    ]
  },
  {
    question: "Resolva: (x - 3)(x + 2) = 0",
    image: "img/ma10.jpg",
    answers: [
      { text: "x = 3 e x = -2", correct: false },
      { text: "x = -3 e x = 2", correct: true },
      { text: "x = 3 e x = 2", correct: false },
      { text: "x = -3 e x = -2", correct: false }
    ]
  }
];

//variaveis q estão sendo direcionadas aos elementos no html
const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");
//variaveis q marcam a pontuação
let currentQuestionIndex = 0;
let score = 0;
//função q troca as questões
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Próxima pergunta";
  resultContainer.classList.add("hidden");
  document.getElementById("question-container").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  questionImage.style.backgroundImage = `url('${currentQuestion.image}')`;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answersContainer.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answersContainer.innerHTML = "";
}

function selectAnswer(button, correct) {
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => btn.disabled = true);

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  document.getElementById("question-container").classList.add("hidden");
  resultContainer.classList.remove("hidden");

  const percent = Math.round((score / questions.length) * 100);
  let message = "";

  if (percent === 100) message = "Incrível! Você é um verdadeiro explorador 🥇🔥";
  else if (percent >= 70) message = "Excelente! voce sabe muito 💪⚡";
  else if (percent >= 40) message = "Hmm... precisa estudar mais 🥋";
  else message = "kkkkkkk";

  scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>${message}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
