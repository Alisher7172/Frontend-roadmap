// Day 33 - Error Handling & Debugging interactive scripts
document.addEventListener("DOMContentLoaded", () => {
  // Broken JSON demo
  const runErrorBtn = document.getElementById("btn-run-error");
  const errorOutput = document.getElementById("error-output");
  if (runErrorBtn && errorOutput) {
    runErrorBtn.addEventListener("click", () => {
      errorOutput.textContent = "";
      try {
        JSON.parse("{ broken json"); // Intentionally broken
        errorOutput.textContent += "Parsing worked (this should not show)\n";
      } catch (err) {
        errorOutput.textContent = "Caught an error!\n";
        errorOutput.textContent += `Name: ${err.name}\n`;
        errorOutput.textContent += `Message: ${err.message}\n`;
        errorOutput.textContent +=
          "Stack (developer detail):\n" +
          (err.stack?.split("\n").slice(0, 3).join("\n") || "N/A");
      } finally {
        errorOutput.textContent += "\n(Done running demo)";
      }
    });
  }

  // Age checker demo (custom error)
  const ageInput = document.getElementById("age-input");
  const ageBtn = document.getElementById("btn-check-age");
  const ageOutput = document.getElementById("age-output");
  if (ageBtn && ageInput && ageOutput) {
    ageBtn.addEventListener("click", () => {
      ageOutput.textContent = "";
      const val = ageInput.value.trim();
      const age = Number(val);
      try {
        if (val === "") {
          throw new Error("Please type an age first.");
        }
        if (Number.isNaN(age)) {
          throw new Error("That is not a number.");
        }
        if (age < 0) {
          throw new Error("Age cannot be negative.");
        }
        if (age > 120) {
          throw new Error("That age seems unrealistic.");
        }
        ageOutput.textContent = `✅ Age looks good: ${age}`;
      } catch (e) {
        ageOutput.textContent = "⚠️ " + e.message;
      }
    });
  }

  // Bug quiz (fix the bug)
  const bugBtn = document.getElementById("btn-bug-submit");
  const bugResult = document.getElementById("bug-result");
  const bugForm = document.getElementById("bug-quiz");
  if (bugBtn && bugResult && bugForm) {
    bugBtn.addEventListener("click", () => {
      const choice = [...bugForm.querySelectorAll('input[name="bug"]')].find(
        (r) => r.checked
      )?.value;
      if (!choice) {
        bugResult.textContent = "Pick an answer first.";
        return;
      }
      if (choice === "b") {
        bugResult.textContent = "Correct! Use === to compare, not =.";
      } else {
        bugResult.textContent = "Not quite. Look at the if condition again.";
      }
    });
  }

  // Quick quiz (3 questions)
  const quizBtn = document.getElementById("quiz-submit");
  const quizResult = document.getElementById("quiz-result");
  const quizForm = document.getElementById("error-quiz");
  if (quizBtn && quizResult && quizForm) {
    quizBtn.addEventListener("click", () => {
      const answers = { q1: "b", q2: "b", q3: "b" };
      let score = 0;
      Object.keys(answers).forEach((q) => {
        const selected = quizForm.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) score++;
      });
      quizResult.textContent = `You scored ${score}/3.`;
      if (score === 3) quizResult.textContent += " 🎉 Awesome!";
      else if (score === 2) quizResult.textContent += " 👍 Good job!";
      else quizResult.textContent += " Keep practicing!";
    });
  }
});
