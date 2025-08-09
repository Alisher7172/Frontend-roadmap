// Day 22: JS Variables, Data Types & Operators - Interactive Quiz & Navigation

document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for nav links
  document.querySelectorAll(".header nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Quiz logic
  const quizQuestions = [
    {
      q: "Which keyword is used to declare a block-scoped variable?",
      options: ["var", "let", "const", "both let and const"],
      answer: 3,
    },
    {
      q: "What is the data type of: let x = [1,2,3]?",
      options: ["Object", "Array", "Number", "String"],
      answer: 1,
    },
    {
      q: "Which operator checks both value and type?",
      options: ["==", "===", "!=", "="],
      answer: 1,
    },
    {
      q: "What is the result of: typeof null?",
      options: ["null", "object", "undefined", "boolean"],
      answer: 1,
    },
    {
      q: "Which of these is NOT a primitive data type?",
      options: ["String", "Boolean", "Object", "Number"],
      answer: 2,
    },
  ];

  let currentQ = 0;
  let score = 0;

  const quizArea = document.getElementById("quiz-area");
  const quizResult = document.getElementById("quiz-result");
  const startQuizBtn = document.getElementById("startQuiz");

  function showQuestion(idx) {
    const q = quizQuestions[idx];
    quizArea.innerHTML =
      `<div class="quiz-q">${q.q}</div>` +
      q.options
        .map(
          (opt, i) =>
            `<button class="btn quiz-opt" data-idx="${i}">${opt}</button>`
        )
        .join("<br>");
  }

  function showResult() {
    quizArea.innerHTML = "";
    quizResult.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
    startQuizBtn.style.display = "inline-block";
    startQuizBtn.textContent = "Try Again";
  }

  function handleOption(e) {
    if (!e.target.classList.contains("quiz-opt")) return;
    const idx = +e.target.getAttribute("data-idx");
    if (idx === quizQuestions[currentQ].answer) {
      score++;
      e.target.style.background = "#4caf50";
    } else {
      e.target.style.background = "#e53935";
    }
    setTimeout(() => {
      currentQ++;
      if (currentQ < quizQuestions.length) {
        showQuestion(currentQ);
      } else {
        showResult();
      }
    }, 700);
  }

  startQuizBtn.addEventListener("click", () => {
    currentQ = 0;
    score = 0;
    quizResult.textContent = "";
    startQuizBtn.style.display = "none";
    showQuestion(currentQ);
  });

  quizArea.addEventListener("click", handleOption);
});
