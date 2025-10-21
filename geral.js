// Questões gerais — mesmo formato do quiz de Geografia e Matemática
const questions = [
  {
    question: "Quem pintou a Mona Lisa?",
    image: "img/qg1.jpg",
    answers: [
      { text: "Leonardo da Vinci", correct: true },
      { text: "Michelangelo", correct: false },
      { text: "Rafael", correct: false },
      { text: "Donatello", correct: false }
    ]
  },
  {
    question: "Qual é o planeta mais próximo do Sol?",
    image: "img/qg2.jpg",
    answers: [
      { text: "Mercúrio", correct: true },
      { text: "Vênus", correct: false },
      { text: "Terra", correct: false },
      { text: "Marte", correct: false }
    ]
  },
  {
    question: "Em que ano o homem pisou na Lua pela primeira vez?",
    image: "img/qg3.jpg",
    answers: [
      { text: "1969", correct: true },
      { text: "1972", correct: false },
      { text: "1965", correct: false },
      { text: "1970", correct: false }
    ]
  },
  {
    question: "Qual é o maior animal do planeta Terra?",
    image: "img/qg4.jpg",
    answers: [
      { text: "Baleia-azul", correct: true },
      { text: "Elefante-africano", correct: false },
      { text: "Tubarão-branco", correct: false },
      { text: "Girafa", correct: false }
    ]
  },
  {
    question: "Quem foi o primeiro presidente do Brasil?",
    image: "img/qg5.jpg",
    answers: [
      { text: "Marechal Deodoro da Fonseca", correct: true },
      { text: "Getúlio Vargas", correct: false },
      { text: "Dom Pedro II", correct: false },
      { text: "Floriano Peixoto", correct: false }
    ]
  },
  {
    question: "Qual é o elemento químico representado pelo símbolo O?",
    image: "img/qg6.jpg",
    answers: [
      { text: "Oxigênio", correct: true },
      { text: "Ouro", correct: false },
      { text: "Prata", correct: false },
      { text: "Ósmio", correct: false }
    ]
  },
  {
    question: "Qual é o idioma mais falado do mundo atualmente?",
    image: "img/qg7.jpg",
    answers: [
      { text: "Mandarim (Chinês)", correct: true },
      { text: "Inglês", correct: false },
      { text: "Espanhol", correct: false },
      { text: "Árabe", correct: false }
    ]
  },
  {
    question: "Quem é considerado o 'pai da informática'?",
    image: "img/qg8.jpg",
    answers: [
      { text: "Alan Turing", correct: true },
      { text: "Bill Gates", correct: false },
      { text: "Steve Jobs", correct: false },
      { text: "Charles Babbage", correct: false }
    ]
  },
  {
    question: "Qual é o país com o maior número de habitantes do mundo?",
    image: "img/qg9.jpg",
    answers: [
      { text: "Índia", correct: true },
      { text: "China", correct: false },
      { text: "Estados Unidos", correct: false },
      { text: "Indonésia", correct: false }
    ]
  },
  {
    question: "Quantos planetas existem no Sistema Solar?",
    image: "img/qg10.jpg",
    answers: [
      { text: "8", correct: true },
      { text: "9", correct: false },
      { text: "7", correct: false },
      { text: "10", correct: false }
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
