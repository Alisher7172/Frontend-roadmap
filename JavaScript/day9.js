// Conditional Editor Functionality
document
  .querySelector("#conditionalEditor + .run-btn")
  .addEventListener("click", function () {
    const editor = document.getElementById("conditionalEditor");
    const output = document.getElementById("conditionalOutput");

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

// Loop Visualizer
const fruits = ["Apple", "Banana", "Cherry", "Date"];
const visualization = document.getElementById("loopVisualization");
let currentStep = 0;

function renderVisualization() {
  visualization.innerHTML = "";

  // Add header
  const header = document.createElement("div");
  header.className = "loop-step";
  header.innerHTML = `
                <div class="step-index">i</div>
                <div class="step-content">Index</div>
                <div class="step-content">Fruit</div>
                <div class="step-content">Message</div>
            `;
  visualization.appendChild(header);

  // Add steps
  for (let i = 0; i < fruits.length; i++) {
    const step = document.createElement("div");
    step.className = `loop-step ${i === currentStep ? "active" : ""}`;
    step.innerHTML = `
                    <div class="step-index">${i}</div>
                    <div class="step-content">${i}</div>
                    <div class="step-content">${fruits[i]}</div>
                    <div class="step-content">Fruit ${i + 1}: ${fruits[i]}</div>
                `;
    visualization.appendChild(step);
  }
}

// Initialize visualization
renderVisualization();

// Control buttons
document.getElementById("startBtn").addEventListener("click", function () {
  currentStep = 0;
  renderVisualization();
  document.getElementById("nextBtn").disabled = false;
});

document.getElementById("nextBtn").addEventListener("click", function () {
  if (currentStep < fruits.length - 1) {
    currentStep++;
    renderVisualization();
  } else {
    this.disabled = true;
  }
});

document.getElementById("resetBtn").addEventListener("click", function () {
  currentStep = 0;
  renderVisualization();
  document.getElementById("nextBtn").disabled = false;
});

// Challenge button functionality
document.getElementById("challengeBtn").addEventListener("click", function () {
  const solution = document.getElementById("solution");
  solution.classList.add("show");

  // Execute FizzBuzz
  console.log("FizzBuzz Solution Output:");
  for (let i = 1; i <= 20; i++) {
    // Only show first 20 for demo
    if (i % 15 === 0) {
      console.log("FizzBuzz");
    } else if (i % 3 === 0) {
      console.log("Fizz");
    } else if (i % 5 === 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
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

// Add some dynamic behavior to code blocks
document.querySelectorAll(".code-block").forEach((block) => {
  block.addEventListener("click", function () {
    this.classList.toggle("code-block-expanded");
  });
});
