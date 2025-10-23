// Interactive code editor functionality
document.querySelector(".run-btn").addEventListener("click", function () {
  const editor = document.getElementById("editor");
  const output = document.getElementById("output");

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
document.querySelector(".challenge-btn").addEventListener("click", function () {
  alert(
    "Challenge started! Create a new HTML file and implement the temperature converter."
  );
});

// Add dynamic type examples
setTimeout(() => {
  const output = document.getElementById("output");
  if (output.innerHTML.includes("Output will appear")) {
    output.innerHTML =
      'Output will appear here after you run the code<br>Try modifying the sample code and click "Run Code"';
  }
}, 3000);
