const questions = [ 
  {
    question: "Qual é o nome do protagonista principal de Dragon Ball?",
    image: "img/d1.jpg",
    answers: [
      { text: "Vegeta", correct: false },
      { text: "Goku", correct: true },
      { text: "Gohan", correct: false },
      { text: "Piccolo", correct: false }
    ]
  },
  {
    question: "Qual é o nome do planeta natal de Goku?",
    image: "img/d2.webp",
    answers: [
      { text: "Terra", correct: false },
      { text: "Namekusei", correct: false },
      { text: "Planeta Vegeta", correct: true },
      { text: "Planeta Saiya", correct: false }
    ]
  },
  {
    question: "Quem foi o primeiro vilão derrotado por Goku adulto em Dragon Ball Z?",
    image: "img/d3.gif",
    answers: [
      { text: "Freeza", correct: false },
      { text: "Raditz", correct: true },
      { text: "Cell", correct: false },
      { text: "Majin Buu", correct: false }
    ]
  },
  {
    question: "Qual transformação vem depois do Super Saiyajin 2?",
    image: "img/d4.gif",
    answers: [
      { text: "Super Saiyajin 3", correct: true },
      { text: "Super Saiyajin Deus", correct: false },
      { text: "Super Saiyajin Blue", correct: false },
      { text: "Kaioken", correct: false }
    ]
  },
  {
    question: "Quem matou Freeza pela primeira vez?",
    image: "img/d5.jpg",
    answers: [
      { text: "Goku", correct: false },
      { text: "Trunks do Futuro", correct: true },
      { text: "Vegeta", correct: false },
      { text: "Piccolo", correct: false }
    ]
  },
  {
    question: "Quantas Esferas do Dragão existem?",
    image: "img/d6.webp",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false }
    ]
  },
  {
    question: "Quem foi o criador das Esferas do Dragão da Terra?",
    image: "img/d7.webp",
    answers: [
      { text: "Kami-Sama", correct: true },
      { text: "Dende", correct: false },
      { text: "Piccolo Daimaoh", correct: false },
      { text: "Guru", correct: false }
    ]
  },
  {
    question: "Quem é o pai de Gohan?",
    image: "img/d8.webp",
    answers: [
      { text: "Vegeta", correct: false },
      { text: "Piccolo", correct: false },
      { text: "Goku", correct: true },
      { text: "Mr. Satan", correct: false }
    ]
  },
  {
    question: "Qual é o nome da técnica usada para derrotar Majin Buu?",
    image: "img/d9.webp",
    answers: [
      { text: "Kamehameha", correct: false },
      { text: "Genki Dama", correct: true },
      { text: "Final Flash", correct: false },
      { text: "Makankosappo", correct: false }
    ]
  },
  {
    question: "Quem é o Deus da Destruição do Universo 7?",
    image: "img/d10.webp",
    answers: [
      { text: "Bills (Beerus)", correct: true },
      { text: "Champa", correct: false },
      { text: "Whis", correct: false },
      { text: "Zeno", correct: false }
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

  if (percent === 100) message = "Incrível! Você é um verdadeiro Super Saiyajin Lendário! 🥇🔥";
  else if (percent >= 70) message = "Excelente! Seu poder de luta é impressionante! 💪⚡";
  else if (percent >= 40) message = "Hmm... precisa treinar mais com o Mestre Kame! 🥋";
  else message = "Seu poder de luta é menor que 5... 🤣 Raditz ficaria decepcionado!";

  scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>${message}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
