// Small quiz app for Day 40
document.addEventListener("DOMContentLoaded", function () {
  // Questions: 'answer' is an array of correct choice indices (supports multiple correct answers)
  const questions = [
    {
      q: "Which HTML tag is used for creating a button?",
      choices: ["<div>", "<button>", "<a>", "<span>"],
      answer: [1],
    },
    {
      q: "Which CSS property changes text color?",
      choices: ["background-color", "color", "font-weight", "text-transform"],
      answer: [1],
    },
    {
      q: "Which method adds an event listener in JavaScript?",
      choices: ["addEventListener", "attachEvent", "on()", "listen()"],
      answer: [0],
    },
    {
      q: "Which CSS property creates a flex container?",
      choices: [
        "display: grid",
        "display: block",
        "display: flex",
        "position: relative",
      ],
      answer: [2],
    },
    {
      q: "Which of these are valid DOM selection methods in JavaScript? (choose all that apply)",
      choices: [
        "document.getElementById",
        "document.querySelector",
        "document.find",
        "document.getElementsByClassName",
      ],
      answer: [0, 1, 3],
    },
  ];

  const quizEl = document.getElementById("quiz");
  let current = 0;
  // store each answer as an array of selected indices (may be empty)
  const answers = questions.map(() => []);

  function renderQuestion() {
    const q = questions[current];
    quizEl.innerHTML = "";

    const questionEl = document.createElement("div");
    questionEl.className = "question";
    questionEl.textContent = `${current + 1}. ${q.q}`;
    quizEl.appendChild(questionEl);

    const options = document.createElement("div");
    options.className = "options";

    q.choices.forEach((choice, i) => {
      const id = `q-${current}-c-${i}`;
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = `q-${current}`;
      input.id = id;
      input.value = i;

      // mark checked if previously selected
      if (Array.isArray(answers[current]) && answers[current].includes(i))
        input.checked = true;

      // bullet for colorful UI and a text span for easier styling
      const bullet = document.createElement("span");
      bullet.className = "bullet";
      // Letter labels (A, B, C...)
      bullet.textContent = String.fromCharCode(65 + i);

      const text = document.createElement("span");
      text.className = "text";
      text.textContent = choice;

      label.appendChild(input);
      label.appendChild(bullet);
      label.appendChild(text);
      options.appendChild(label);
    });

    quizEl.appendChild(options);

    const controls = document.createElement("div");
    controls.className = "controls";

    const prev = document.createElement("button");
    prev.className = "btn-secondary";
    prev.textContent = "Previous";
    prev.disabled = current === 0;
    prev.addEventListener("click", () => {
      saveAnswer();
      if (current > 0) {
        current -= 1;
        renderQuestion();
      }
    });

    const next = document.createElement("button");
    next.className = "btn-primary";
    next.textContent = current === questions.length - 1 ? "Submit" : "Next";
    next.addEventListener("click", () => {
      saveAnswer();
      if (current < questions.length - 1) {
        current += 1;
        renderQuestion();
      } else {
        showResults();
      }
    });

    controls.appendChild(prev);
    controls.appendChild(next);
    quizEl.appendChild(controls);
  }

  function saveAnswer() {
    // collect all checked checkboxes for current question
    const checked = Array.from(
      quizEl.querySelectorAll('input[type="checkbox"]:checked')
    ).map((el) => Number(el.value));
    answers[current] = checked;
  }

  function showResults() {
    const total = questions.length;
    let score = 0;
    // helper to compare two arrays as sets (order doesn't matter)
    function arraysEqualAsSets(a, b) {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      const setB = new Set(b);
      return a.every((v) => setB.has(v));
    }

    answers.forEach((given, i) => {
      const correct = questions[i].answer;
      if (arraysEqualAsSets(given, correct)) score += 1;
    });

    quizEl.innerHTML = "";
    const result = document.createElement("div");
    result.className = "result";
    result.innerHTML = `<h3>Your score: ${score} / ${total}</h3>`;

    const replay = document.createElement("button");
    replay.className = "btn-primary";
    replay.textContent = "Try Again";
    replay.addEventListener("click", () => {
      current = 0;
      for (let i = 0; i < answers.length; i++) answers[i] = null;
      renderQuestion();
    });

    quizEl.appendChild(result);
    quizEl.appendChild(replay);
  }

  // keyboard support: Enter to advance when focused on an option
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const focus = document.activeElement;
      if (focus && focus.tagName === "INPUT" && focus.type === "radio") {
        // simulate next
        const nextBtn = quizEl.querySelector(".btn-primary");
        if (nextBtn) nextBtn.click();
      }
    }
  });

  // Initial render
  renderQuestion();
});
