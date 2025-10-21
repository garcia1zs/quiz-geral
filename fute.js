const questions = [ 
  {
    question: "Quem venceu a Copa do Mundo de 2018?",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/FIFA_World_Cup_2018_Trophy.jpg",
    answers: [
      { text: "Brasil", correct: false },
      { text: "França", correct: true },
      { text: "Croácia", correct: false },
      { text: "Alemanha", correct: false }
    ]
  },
  {
    question: "Quem é conhecido como 'CR7'?",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Cristiano_Ronaldo_2018.jpg",
    answers: [
      { text: "Lionel Messi", correct: false },
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Neymar Jr.", correct: false },
      { text: "Kylian Mbappé", correct: false }
    ]
  },
  {
    question: "Qual jogador argentino é famoso por seu drible e golaços, jogando no PSG atualmente?",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Lionel_Messi_20180626.jpg",
    answers: [
      { text: "Paulo Dybala", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Sergio Agüero", correct: false },
      { text: "Angel Di María", correct: false }
    ]
  },
  {
    question: "Qual clube europeu tem mais títulos da UEFA Champions League?",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d8/UEFA_Champions_League_trophy.jpg",
    answers: [
      { text: "Real Madrid", correct: true },
      { text: "Barcelona", correct: false },
      { text: "AC Milan", correct: false },
      { text: "Liverpool", correct: false }
    ]
  },
  {
    question: "Quem ganhou a Bola de Ouro em 2021?",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/15/World_Ballon_d%27Or.jpg",
    answers: [
      { text: "Cristiano Ronaldo", correct: false },
      { text: "Lionel Messi", correct: true },
      { text: "Robert Lewandowski", correct: false },
      { text: "Neymar Jr.", correct: false }
    ]
  },
  {
    question: "Em qual país nasceu Pelé?",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Pele_1963.jpg",
    answers: [
      { text: "Argentina", correct: false },
      { text: "Brasil", correct: true },
      { text: "Uruguai", correct: false },
      { text: "Portugal", correct: false }
    ]
  },
  {
    question: "Qual seleção venceu a Copa do Mundo de 2014?",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Germany_national_football_team_2014_FIFA_World_Cup.jpg",
    answers: [
      { text: "Brasil", correct: false },
      { text: "Alemanha", correct: true },
      { text: "Argentina", correct: false },
      { text: "Espanha", correct: false }
    ]
  },
  {
    question: "Quem é o maior artilheiro da história da Champions League?",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/95/Cristiano_Ronaldo_in_action_2018.jpg",
    answers: [
      { text: "Lionel Messi", correct: false },
      { text: "Cristiano Ronaldo", correct: true },
      { text: "Raúl", correct: false },
      { text: "Robert Lewandowski", correct: false }
    ]
  },
  {
    question: "Qual é o estádio do Manchester United?",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Old_Trafford_Inside.JPG",
    answers: [
      { text: "Emirates Stadium", correct: false },
      { text: "Old Trafford", correct: true },
      { text: "Anfield", correct: false },
      { text: "Camp Nou", correct: false }
    ]
  },
  {
    question: "Qual seleção venceu a Eurocopa de 2020?",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/UEFA_Euro_2020_trophy.jpg",
    answers: [
      { text: "Itália", correct: true },
      { text: "Inglaterra", correct: false },
      { text: "Espanha", correct: false },
      { text: "França", correct: false }
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
