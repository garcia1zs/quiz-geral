const questions = [ 
  {
    question: "Quem é o capitão dos Chapéus de Palha?",
    image: "img/op1.webp",
    answers: [
      { text: "Zoro", correct: false },
      { text: "Monkey D. Luffy", correct: true },
      { text: "Sanji", correct: false },
      { text: "Usopp", correct: false }
    ]
  },
  {
    question: "Qual é o nome do poder que Luffy ganha ao comer uma Akuma no Mi?",
    image: "img/op2.jpg",
    answers: [
      { text: "Mera Mera no Mi", correct: false },
      { text: "Gomu Gomu no Mi", correct: true },
      { text: "Hie Hie no Mi", correct: false },
      { text: "Ope Ope no Mi", correct: false }
    ]
  },
  {
    question: "Qual é o sonho de Zoro?",
    image: "img/op3.webp",
    answers: [
      { text: "Ser o Rei dos Piratas", correct: false },
      { text: "Ser o maior espadachim do mundo", correct: true },
      { text: "Encontrar o One Piece", correct: false },
      { text: "Ser o mais forte da Marinha", correct: false }
    ]
  },
  {
    question: "Qual é o nome do navio dos Chapéus de Palha após o Going Merry?",
    image: "img/op4.webp",
    answers: [
      { text: "Sunny Go", correct: false },
      { text: "Thousand Sunny", correct: true },
      { text: "Red Force", correct: false },
      { text: "Oro Jackson", correct: false }
    ]
  },
  {
    question: "Quem é o irmão de Luffy que tem o poder do fogo?",
    image: "img/op5.jpg",
    answers: [
      { text: "Sabo", correct: false },
      { text: "Portgas D. Ace", correct: true },
      { text: "Dragon", correct: false },
      { text: "Shanks", correct: false }
    ]
  },
  {
    question: "Qual é o nome do médico da tripulação?",
    image: "img/op6.gif",
    answers: [
      { text: "Franky", correct: false },
      { text: "Tony Tony Chopper", correct: true },
      { text: "Brook", correct: false },
      { text: "Usopp", correct: false }
    ]
  },
  {
    question: "Qual é o nome do criador do anime/mangá One Piece?",
    image: "img/op7.gif",
    answers: [
      { text: "Masashi Kishimoto", correct: false },
      { text: "Eiichiro Oda", correct: true },
      { text: "Akira Toriyama", correct: false },
      { text: "Tite Kubo", correct: false }
    ]
  },
  {
    question: "Qual desses personagens é um Yonkou (Imperador do Mar)?",
    image: "img/op8.gif",
    answers: [
      { text: "Buggy", correct: false },
      { text: "Kaido", correct: true },
      { text: "Smoker", correct: false },
      { text: "Crocodile", correct: false }
    ]
  },
  {
    question: "Qual é o nome do reino natal da Nami?",
    image: "img/op9.webp",
    answers: [
      { text: "Ilha Drum", correct: false },
      { text: "Vila Cocoyashi", correct: true },
      { text: "Alabasta", correct: false },
      { text: "Skypiea", correct: false }
    ]
  },
  {
    question: "Qual é o nome do lendário tesouro procurado por todos os piratas?",
    image: "img/op10.webp",
    answers: [
      { text: "Eternal Pose", correct: false },
      { text: "One Piece", correct: true },
      { text: "Log Pose", correct: false },
      { text: "Road Poneglyph", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const questionImage = document.getElementById("question-image");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreText = document.getElementById("score-text");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let score = 0;

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

  if (percent === 100) message = "Yosh! Você é o verdadeiro Rei dos Piratas! ☠️🏴‍☠️";
  else if (percent >= 70) message = "Ótimo! Você navegou bem pelos mares de One Piece! ⚓";
  else if (percent >= 40) message = "Tá indo bem, mas ainda não chegaria em Raftel... ⛵";
  else message = "Seu navio afundou antes da Grand Line 😅 Treine mais, marinheiro!";

  scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>${message}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
