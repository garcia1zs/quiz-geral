
//Array q fica a lista onde estão as propriedas: 
// questio-> questão
//image-> a imagem q é carregada 
//answers são os botões no caso as opções clicaveis, é um array q contem objetos dentro dele, com duas propriedades(text e correct)


const questions = [ 
  {
    question: "Qual é o maior país do mundo em extensão territorial?",
    image: "img/ge1.webp",
    answers: [
      { text: "Brasil", correct: false },
      { text: "Russia", correct: true },
      { text: "Eua", correct: false },
      { text: "Venezuela", correct: false }
    ]
  },
  {
    question: "Qual é o continente mais populoso do mundo?",
    image: "img/ge2.webp",
    answers: [
      { text: "America", correct: false },
      { text: "Europa", correct: false },
      { text: "Africa", correct: false },
      { text: "Ásia", correct: true }
    ]
  },
  {
    question: "O ponto mais alto da Terra é:",
    image: "img/ge3.webp    ",
    answers: [
      { text: "Monte Kilimanjaro", correct: false },
      { text: "Monte Everest", correct: true },
      { text: "Monte Aconcágua", correct: false },
      { text: "Monte Fuji", correct: false }
    ]
  },
  {
    question: "Qual é o maior deserto do mundo?",
    image: "img/ge5.webp",
    answers: [
      { text: "Saara", correct: false },
      { text: "Deserto da Arábia", correct: false },
      { text: "Deserto de Gobi", correct: false },
      { text: "Deserto da Antártida", correct: true }
    ]
  },
  {
    question: "Qual é o maior oceano do planeta?",
    image: "img/ge4.webp",
    answers: [
      { text: "Oceano Atlântico", correct: false },
      { text: "Oceano Índico", correct: false },
      { text: "Oceano Pacífico", correct: true },
      { text: "Oceano Ártico", correct: false }
    ]
  },
  {
    question: "O rio mais extenso do mundo é:",
    image: "img/ge6.jpg",
    answers: [
      { text: "Rio Mississipi", correct: false },
      { text: "Rio Nilo", correct: false },
      { text: "Rio Amazonas", correct: true },
      { text: "Rio Yangtzé", correct: false }
    ]
  },
  {
    question: "Qual destes países é formado por ilhas?",
    image: "img/ge7.webp",
    answers: [
      { text: "Chile", correct: false },
      { text: "Japão", correct: true },
      { text: "Alemanha", correct: false },
      { text: "Canadá", correct: false }
    ]
  },
  {
    question: "Onde fica localizada a maior parte da água doce do planeta?",
    image: "img/ge8.jpg",
    answers: [
      { text: "Nos rios", correct: false },
      { text: "Nos lagos", correct: false },
      { text: "Nas geleiras e calotas polares", correct: true },
      { text: "Nos aquíferos subterrâneos", correct: false }
    ]
  },
  {
    question: "Qual é o bioma caracterizado por clima quente e úmido e grande biodiversidade?",
    image: "img/ge9.jpg",
    answers: [
      { text: "Cerrado", correct: false },
      { text: "Floresta Amazônica", correct: true },
      { text: "Deserto do Saara", correct: false },
      { text: "Taiga", correct: false }
    ]
  },
  {
    question: "Qual linha imaginária divide a Terra em hemisfério norte e sul?",
    image: "img/ge10.jpg",
    answers: [
      { text: "Linha do Equador", correct: true },
      { text: "Trópico de Câncer", correct: false },
      { text: "Meridiano de Greenwich", correct: false },
      { text: "Trópico de Capricórnio", correct: false }
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
