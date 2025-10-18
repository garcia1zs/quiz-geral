  const questions = [
  {
    question: "Qual é o Pokémon número 25 na Pokédex?",
    image: "img/per1.webp",
    answers: [
      { text: "Charmander", correct: false },
      { text: "Bulbasaur", correct: false },
      { text: "Pikachu", correct: true },
      { text: "Jigglypuff", correct: false }
    ]
  },
  {
    question: "Quem é o treinador principal do anime Pokémon?",
    image: "img/per2.webp",
    answers: [
      { text: "Gary Oak", correct: false },
      { text: "Ash Ketchum", correct: true },
      { text: "Brock", correct: false },
      { text: "Red", correct: false }
    ]
  },
  {
    question: "Qual é o tipo principal do Pokémon Charmander?",
    image: "img/per3.webp",
    answers: [
      { text: "Água", correct: false },
      { text: "Fogo", correct: true },
      { text: "Terra", correct: false },
      { text: "Lutador", correct: false }
    ]
  },
  {
    question: "Eevee pode evoluir para qual desses Pokémon?",
    image: "img/per4.webp",
    answers: [
      { text: "Gengar", correct: false },
      { text: "Vaporeon", correct: true },
      { text: "Machop", correct: false },
      { text: "Pidgey", correct: false }
    ]
  },
  {
    question: "Qual destes é um Pokémon lendário?",
    image: "img/per5.png",
    answers: [
      { text: "Articuno", correct: true },
      { text: "Butterfree", correct: false },
      { text: "Meowth", correct: false },
      { text: "Rattata", correct: false }
    ]
  },
  {
    question: "Qual é o tipo do Pokémon Bulbasaur?",
    image: "img/per6.webp",
    answers: [
      { text: "Planta/Veneno", correct: true },
      { text: "Inseto", correct: false },
      { text: "Água", correct: false },
      { text: "Pedra", correct: false }
    ]
  },
  {
    question: "Em qual cidade Ash começou sua jornada Pokémon?",
    image: "img/per7.webp",
    answers: [
      { text: "Pallet", correct: true },
      { text: "Pewter", correct: false },
      { text: "Cerulean", correct: false },
      { text: "Viridian", correct: false }
    ]
  },
  {
    question: "Qual desses Pokémon é do tipo Psíquico?",
    image: "img/per8.jpeg",
    answers: [
      { text: "Alakazam", correct: true },
      { text: "Onix", correct: false },
      { text: "Charmeleon", correct: false },
      { text: "Scyther", correct: false }
    ]
  },
  {
    question: "Qual é o mascote da Equipe Rocket?",
    image: "img/per9.webp",
    answers: [
      { text: "Eevee", correct: false },
      { text: "Meowth", correct: true },
      { text: "Ditto", correct: false },
      { text: "Snorlax", correct: false }
    ]
  },
  {
    question: "Qual é a evolução final de Charmander?",
    image: "img/per10.webp",
    answers: [
      { text: "Charmeleon", correct: false },
      { text: "Charizard", correct: true },
      { text: "Blastoise", correct: false },
      { text: "Pidgeot", correct: false }
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

  if (percent === 100) message = "Perfeito! Você é um Mestre Pokémon! 🏆";
  else if (percent >= 70) message = "Muito bem! Você conhece bastante o mundo Pokémon!";
  else if (percent >= 40) message = "vamo querer assistir pokemón";
  else message = "kkkkkkk trouxão, burro kkkkkkk";

  scoreText.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${questions.length}</strong> perguntas.<br>${message}`;
}

restartButton.addEventListener("click", startQuiz);

startQuiz();
