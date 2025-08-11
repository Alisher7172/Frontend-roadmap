// Day 25: JS Arrays & Objects - Interactive Examples & Quiz
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

  // Double array numbers
  const arrayInput = document.getElementById("arrayInput");
  const doubleBtn = document.getElementById("doubleBtn");
  const arrayResult = document.getElementById("arrayResult");
  if (doubleBtn && arrayInput && arrayResult) {
    doubleBtn.addEventListener("click", () => {
      let arr = arrayInput.value.split(",").map((s) => Number(s.trim()));
      if (arr.some(isNaN)) {
        arrayResult.textContent = "Please enter valid numbers.";
        return;
      }
      let doubled = arr.map((n) => n * 2);
      arrayResult.textContent = `Doubled: [${doubled.join(", ")}]`;
    });
  }

  // Show object
  const nameInput = document.getElementById("nameInput");
  const ageInput = document.getElementById("ageInput");
  const objectBtn = document.getElementById("objectBtn");
  const objectResult = document.getElementById("objectResult");
  if (objectBtn && nameInput && ageInput && objectResult) {
    objectBtn.addEventListener("click", () => {
      let person = {
        name: nameInput.value.trim(),
        age: Number(ageInput.value),
        greet: function () {
          return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
        },
      };
      if (!person.name || isNaN(person.age)) {
        objectResult.textContent = "Please enter a valid name and age.";
        return;
      }
      objectResult.textContent = person.greet();
    });
  }

  // Quiz logic
  const quizQuestions = [
    {
      q: "How do you access the second element of an array called arr?",
      options: ["arr[2]", "arr(1)", "arr[1]", "arr{2}"],
      answer: 2,
    },
    {
      q: "Which method adds an element to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: 0,
    },
    {
      q: "How do you access the value of the name property in an object person?",
      options: ["person[name]", "person.name", "person->name", "person::name"],
      answer: 1,
    },
    {
      q: "What is the output of [1,2,3].map(n => n*2)?",
      options: ["[2,4,6]", "[1,2,3,1,2,3]", "[1,4,9]", "[2,3,4]"],
      answer: 0,
    },
    {
      q: "Which is a valid object declaration?",
      options: [
        "let obj = {a:1, b:2};",
        "let obj = (a:1, b:2);",
        "let obj = [a:1, b:2];",
        "let obj = a=1, b=2;",
      ],
      answer: 0,
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
