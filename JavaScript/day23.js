// Day 23: JS Conditionals & Loops - Interactive Examples & Quiz

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

  // Even/Odd checker
  const numInput = document.getElementById("numInput");
  const checkEvenBtn = document.getElementById("checkEven");
  const evenResult = document.getElementById("evenResult");
  if (checkEvenBtn && numInput && evenResult) {
    checkEvenBtn.addEventListener("click", () => {
      const val = Number(numInput.value);
      if (isNaN(val)) {
        evenResult.textContent = "Please enter a valid number.";
        return;
      }
      evenResult.textContent =
        val % 2 === 0 ? `${val} is Even` : `${val} is Odd`;
    });
  }

  // Loop runner
  const loopInput = document.getElementById("loopInput");
  const runLoopBtn = document.getElementById("runLoop");
  const loopResult = document.getElementById("loopResult");
  if (runLoopBtn && loopInput && loopResult) {
    runLoopBtn.addEventListener("click", () => {
      const times = Number(loopInput.value);
      if (isNaN(times) || times < 1 || times > 20) {
        loopResult.textContent = "Enter a number between 1 and 20.";
        return;
      }
      let out = "";
      for (let i = 1; i <= times; i++) {
        out += `Loop ${i} &#x1F501;<br>`;
      }
      loopResult.innerHTML = out;
    });
  }

  // Quiz logic
  const quizQuestions = [
    {
      q: "Which statement checks if a variable x is equal to 10?",
      options: ["if (x = 10)", "if (x == 10)", "if x == 10", "if (x === 10)"],
      answer: 1,
    },
    {
      q: "Which loop will always run at least once?",
      options: ["for", "while", "do...while", "foreach"],
      answer: 2,
    },
    {
      q: "What does break do in a loop?",
      options: [
        "Skips to next iteration",
        "Exits the loop",
        "Repeats the loop",
        "Throws error",
      ],
      answer: 1,
    },
    {
      q: "What is the output of: for(let i=0;i<2;i++){console.log(i)}",
      options: ["0 1", "1 2", "0 1 2", "1"],
      answer: 0,
    },
    {
      q: "Which is a valid switch statement?",
      options: ["switch x", "switch(x)", "switch{x}", "switch[x]"],
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
