const startBtn = document.getElementById("start-btn");
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const errorMessage = document.getElementById("error-message");

let currentQuestion = 0;
let score = 0;

const quizData = [
  {
    question: "1. Which of the following is a front-end language?",
    type: "single",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "2. Which of the following are programming languages?",
    type: "multiple",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: ["JavaScript", "Python"]
  },
  {
    question: "3. Fill in the blank: HTML stands for ______.",
    type: "text",
    answer: "HyperText Markup Language"
  },
  {
    question: "4. Which of these are databases?",
    type: "multiple",
    options: ["MySQL", "MongoDB", "CSS", "Oracle"],
    answer: ["MySQL", "MongoDB", "Oracle"]
  },
  {
    question: "5. Which one is a web browser?",
    type: "single",
    options: ["Linux", "Firefox", "MySQL", "Oracle"],
    answer: "Firefox"
  },
  {
    question: "6. Fill in the blank: CSS is used for ______.",
    type: "text",
    answer: "Styling"
  },
  {
    question: "7. Which of the following are JavaScript frameworks?",
    type: "multiple",
    options: ["React", "Angular", "Django", "Vue"],
    answer: ["React", "Angular", "Vue"]
  },
  {
    question: "8. Which one is a backend technology?",
    type: "single",
    options: ["Node.js", "HTML", "CSS", "Bootstrap"],
    answer: "Node.js"
  }
];

startBtn.addEventListener("click", () => {
  welcomeScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion() {
  errorMessage.textContent = ""; // Clear previous error
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(option => {
      optionsEl.innerHTML += `
        <label class="option">
          <input type="radio" name="answer" value="${option}"> ${option}
        </label>`;
    });
  } else if (q.type === "multiple") {
    q.options.forEach(option => {
      optionsEl.innerHTML += `
        <label class="option">
          <input type="checkbox" name="answer" value="${option}"> ${option}
        </label>`;
    });
  } else if (q.type === "text") {
    optionsEl.innerHTML = `
      <input type="text" id="text-answer" placeholder="Type your answer here" class="option-input">
    `;
  }

  progressEl.style.width = `${((currentQuestion) / quizData.length) * 100}%`;
}

nextBtn.addEventListener("click", () => {
  const q = quizData[currentQuestion];
  let answer;

  if (q.type === "single") {
    const selected = document.querySelector("input[name='answer']:checked");
    if (!selected) {
      errorMessage.textContent = "⚠ Please select an answer before continuing.";
      return;
    }
    answer = selected.value;
    if (answer === q.answer) score++;
  }

  else if (q.type === "multiple") {
    const selected = [...document.querySelectorAll("input[name='answer']:checked")].map(el => el.value);
    if (selected.length === 0) {
      errorMessage.textContent = "⚠ Please select at least one option.";
      return;
    }
    if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) score++;
  }

  else if (q.type === "text") {
    const textAnswer = document.getElementById("text-answer").value.trim();
    if (!textAnswer) {
      errorMessage.textContent = "⚠ Please type your answer before continuing.";
      return;
    }
    if (textAnswer.toLowerCase() === q.answer.toLowerCase()) score++;
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressEl.style.width = "100%";
  scoreEl.textContent = `You scored ${score} out of ${quizData.length}`;
  resultScreen.scrollIntoView({ behavior: "smooth" });
}
