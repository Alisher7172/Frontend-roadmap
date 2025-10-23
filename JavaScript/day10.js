// Function Editor Functionality
document
  .querySelector("#functionEditor + .run-btn")
  .addEventListener("click", function () {
    const editor = document.getElementById("functionEditor");
    const output = document.getElementById("functionOutput");

    // Clear previous output
    output.innerHTML = "Output:<br>";

    try {
      // Capture console.log output
      const originalLog = console.log;
      let logs = [];

      console.log = function () {
        logs.push(Array.from(arguments).join(" "));
        originalLog.apply(console, arguments);
      };

      // Execute the code
      eval(editor.textContent);

      // Restore console.log
      console.log = originalLog;

      // Display the output
      if (logs.length > 0) {
        output.innerHTML += logs.join("<br>");
      } else {
        output.innerHTML += "No output. Use console.log() to display values.";
      }
    } catch (error) {
      output.innerHTML += `Error: ${error.message}`;
    }
  });

// Challenge button functionality
document.getElementById("challengeBtn").addEventListener("click", function () {
  const solution = document.getElementById("solution");
  solution.classList.add("show");

  // Execute counter example
  function createCounter() {
    let count = 0;
    return {
      increment: function () {
        count++;
      },
      decrement: function () {
        count--;
      },
      getValue: function () {
        return count;
      },
    };
  }

  const counter = createCounter();
  counter.increment();
  counter.increment();
  counter.decrement();

  console.log("Counter value:", counter.getValue());
});

// Toggle solution
document
  .getElementById("toggleSolution")
  .addEventListener("click", function () {
    const solution = document.getElementById("solution");
    solution.classList.toggle("show");
    this.textContent = solution.classList.contains("show")
      ? "Hide Solution"
      : "Show Solution";
  });

// Add some dynamic behavior to scope visualization
const scopeLevels = document.querySelectorAll(".scope-level");
scopeLevels.forEach((scope) => {
  scope.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.02)";
    this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
  });

  scope.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.boxShadow = "var(--shadow)";
  });
});

// Add closure animation
const closureLinks = document.querySelectorAll(".fa-link");
closureLinks.forEach((link) => {
  setInterval(() => {
    link.style.opacity = link.style.opacity === "0.5" ? "1" : "0.5";
  }, 1000);
});
