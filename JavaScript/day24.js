// Day 24: JS Functions & Scope - Interactive Examples & Quiz

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

  // Greet function
  const nameInput = document.getElementById("nameInput");
  const greetBtn = document.getElementById("greetBtn");
  const greetResult = document.getElementById("greetResult");
  if (greetBtn && nameInput && greetResult) {
    greetBtn.addEventListener("click", () => {
      function greet(name) {
        if (!name) return "Please enter your name.";
        return `Hello, ${name}!`;
      }
      greetResult.textContent = greet(nameInput.value.trim());
    });
  }

  // Multiply function
  const numA = document.getElementById("numA");
  const numB = document.getElementById("numB");
  const multiplyBtn = document.getElementById("multiplyBtn");
  const multiplyResult = document.getElementById("multiplyResult");
  if (multiplyBtn && numA && numB && multiplyResult) {
    multiplyBtn.addEventListener("click", () => {
      const multiply = (a, b) => a * b;
      const a = Number(numA.value);
      const b = Number(numB.value);
      if (isNaN(a) || isNaN(b)) {
        multiplyResult.textContent = "Please enter valid numbers.";
        return;
      }
      multiplyResult.textContent = `Result: ${multiply(a, b)}`;
    });
  }

  // Quiz logic
  const quizQuestions = [
    {
      q: "Which is a correct function declaration?",
      options: [
        "function myFunc[]",
        "function myFunc() {}",
        "let myFunc = function {}",
        "myFunc = () =>",
      ],
      answer: 1,
    },
    {
      q: "What is the output of: const add = (a,b) => a+b; add(2,3);",
      options: ["23", "undefined", "5", "Error"],
      answer: 2,
    },
    {
      q: "Where is a variable declared with let inside a function accessible?",
      options: [
        "Everywhere",
        "Only inside that function",
        "Only inside that block",
        "Globally",
      ],
      answer: 1,
    },
    {
      q: "What is the scope of a variable declared with var inside a function?",
      options: ["Block", "Global", "Function", "Module"],
      answer: 2,
    },
    {
      q: "What does a function return if there is no return statement?",
      options: ["null", "undefined", "0", "false"],
      answer: 1,
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
