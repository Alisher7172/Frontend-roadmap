// Day 38: Deploy Website with GitHub Pages JavaScript
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeMethodSelector();
  initializeInteractiveDemo();
  initializeDeploymentChecklist();
  initializeDomainChecker();
  initializeDiagnosticTools();
  initializeProgress();
});

// Navigation between sections
function initializeNavigation() {
  const navButtons = document.querySelectorAll(".topic-nav .nav-btn");
  const sections = document.querySelectorAll(".section");

  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetSection = button.dataset.section;

      // Update active button
      navButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Update active section
      sections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetSection) {
          section.classList.add("active");
        }
      });

      // Update progress
      updateProgress();
    });
  });
}

// Method Selector (Simple vs Advanced)
function initializeMethodSelector() {
  const methodBtns = document.querySelectorAll(".method-btn");
  const methodContents = document.querySelectorAll(".method-content");

  methodBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const method = btn.dataset.method;

      // Update active button
      methodBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Update active content
      methodContents.forEach((content) => {
        content.classList.add("hidden");
        if (content.id === `${method}-method`) {
          content.classList.remove("hidden");
        }
      });
    });
  });
}

// Interactive GitHub Pages Setup Demo
function initializeInteractiveDemo() {
  const sourceSelect = document.getElementById("sourceSelect");
  const branchSelection = document.getElementById("branchSelection");
  const deployBtn = document.getElementById("deployBtn");
  const deploymentStatus = document.getElementById("deploymentStatus");
  const successMessage = document.getElementById("successMessage");

  if (sourceSelect) {
    sourceSelect.addEventListener("change", (e) => {
      const value = e.target.value;

      if (value === "branch") {
        branchSelection.classList.remove("hidden");
        deployBtn.disabled = false;
      } else if (value === "actions") {
        branchSelection.classList.add("hidden");
        deployBtn.disabled = false;
      } else {
        branchSelection.classList.add("hidden");
        deployBtn.disabled = true;
      }
    });
  }

  if (deployBtn) {
    deployBtn.addEventListener("click", () => {
      // Start deployment simulation
      deployBtn.disabled = true;
      deploymentStatus.classList.remove("hidden");

      // Simulate deployment process
      setTimeout(() => {
        deploymentStatus.classList.add("hidden");
        successMessage.classList.remove("hidden");

        // Reset after 5 seconds
        setTimeout(() => {
          resetDemo();
        }, 5000);
      }, 3000);
    });
  }

  function resetDemo() {
    deployBtn.disabled = true;
    deploymentStatus.classList.add("hidden");
    successMessage.classList.add("hidden");
    sourceSelect.value = "";
    branchSelection.classList.add("hidden");
  }
}

// Deployment Checklist
function initializeDeploymentChecklist() {
  const checkboxes = document.querySelectorAll(
    '.checklist-item input[type="checkbox"]'
  );
  const resultElement = document.getElementById("checklistResult");
  const resultIcon = resultElement.querySelector(".result-icon");
  const resultText = resultElement.querySelector(".result-text");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateChecklistResult);
  });

  function updateChecklistResult() {
    const totalItems = checkboxes.length;
    const checkedItems = Array.from(checkboxes).filter(
      (cb) => cb.checked
    ).length;
    const progress = (checkedItems / totalItems) * 100;

    if (progress === 100) {
      resultIcon.textContent = "✅";
      resultText.textContent = "Great! You're ready to deploy your website!";
      resultElement.style.background = "#d4edda";
      resultElement.style.color = "#155724";
    } else if (progress >= 50) {
      resultIcon.textContent = "⚠️";
      resultText.textContent = `Almost there! Complete ${
        totalItems - checkedItems
      } more items.`;
      resultElement.style.background = "#fff3cd";
      resultElement.style.color = "#856404";
    } else {
      resultIcon.textContent = "⏳";
      resultText.textContent = `${checkedItems}/${totalItems} items completed. Keep going!`;
      resultElement.style.background = "#e6f3ff";
      resultElement.style.color = "#1976d2";
    }
  }
}

// Domain Propagation Checker
function initializeDomainChecker() {
  // This is a simulation - in real world, you'd use actual DNS checking APIs
  window.checkDomain = function () {
    const domainInput = document.getElementById("domainCheck");
    const resultsDiv = document.getElementById("checkerResults");
    const domain = domainInput.value.trim();

    if (!domain) {
      resultsDiv.innerHTML =
        '<p style="color: #dc3545;">Please enter a domain name.</p>';
      return;
    }

    resultsDiv.innerHTML = "<p>Checking DNS propagation...</p>";

    // Simulate DNS check
    setTimeout(() => {
      const isValid =
        /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain);

      if (isValid) {
        resultsDiv.innerHTML = `
                    <div style="color: #28a745;">
                        <strong>✅ DNS Check Results for ${domain}:</strong><br>
                        • A Record: Found (pointing to GitHub Pages)<br>
                        • CNAME Record: Found (www subdomain)<br>
                        • SSL Certificate: Active<br>
                        • Propagation: Complete
                    </div>
                `;
      } else {
        resultsDiv.innerHTML = `
                    <div style="color: #dc3545;">
                        <strong>❌ Invalid domain format.</strong><br>
                        Please enter a valid domain (e.g., example.com)
                    </div>
                `;
      }
    }, 2000);
  };
}

// Diagnostic Tools
function initializeDiagnosticTools() {
  // Site Status Checker
  window.checkSiteStatus = function () {
    const statusInput = document.getElementById("statusCheck");
    const statusResult = document.getElementById("statusResult");
    const url = statusInput.value.trim();

    if (!url) {
      statusResult.innerHTML =
        '<p style="color: #dc3545;">Please enter a URL.</p>';
      return;
    }

    statusResult.innerHTML = "<p>Checking site status...</p>";

    // Simulate status check
    setTimeout(() => {
      const isGitHubPagesUrl =
        url.includes("github.io") || url.includes("github.com");

      if (isGitHubPagesUrl) {
        statusResult.innerHTML = `
                    <div style="color: #28a745;">
                        <strong>✅ Site Status: Active</strong><br>
                        • Response: 200 OK<br>
                        • SSL: Secure<br>
                        • CDN: GitHub Pages<br>
                        • Last Deploy: 2 minutes ago
                    </div>
                `;
      } else {
        statusResult.innerHTML = `
                    <div style="color: #ffc107;">
                        <strong>⚠️ Non-GitHub Pages URL detected</strong><br>
                        This tool works best with GitHub Pages URLs<br>
                        (*.github.io or custom domains)
                    </div>
                `;
      }
    }, 1500);
  };

  // Build Log Viewer
  window.openBuildLogs = function () {
    const logSample = document.getElementById("buildLogSample");
    logSample.classList.toggle("hidden");
  };

  // Quick Fix Generator
  window.generateFix = function () {
    const issueSelect = document.getElementById("issueSelect");
    const fixInstructions = document.getElementById("fixInstructions");
    const issue = issueSelect.value;

    const fixes = {
      404: `
                <h5>🔧 Fix for 404 Error:</h5>
                <ol>
                    <li>Ensure <code>index.html</code> exists in your repository root</li>
                    <li>Check that your repository is public</li>
                    <li>Verify GitHub Pages source is set correctly</li>
                    <li>Wait 5-10 minutes for deployment</li>
                    <li>Clear browser cache (Ctrl+F5)</li>
                </ol>
                <p><strong>Still not working?</strong> Check the Actions tab for build errors.</p>
            `,
      css: `
                <h5>🎨 Fix for CSS Not Loading:</h5>
                <ol>
                    <li>Use relative paths: <code>./style.css</code> instead of <code>/style.css</code></li>
                    <li>Check file names match exactly (case-sensitive)</li>
                    <li>Ensure CSS file is committed to repository</li>
                    <li>Verify HTML link tag is correct</li>
                    <li>Test locally first</li>
                </ol>
                <p><strong>Example:</strong> <code>&lt;link rel="stylesheet" href="./style.css"&gt;</code></p>
            `,
      domain: `
                <h5>🌐 Fix for Custom Domain Issues:</h5>
                <ol>
                    <li>Add DNS A records pointing to GitHub Pages IPs</li>
                    <li>Add CNAME record for www subdomain</li>
                    <li>Add domain in repository Settings → Pages</li>
                    <li>Wait 24-48 hours for DNS propagation</li>
                    <li>Enable "Enforce HTTPS" after domain works</li>
                </ol>
                <p><strong>DNS Records needed:</strong> A records to 185.199.108-111.153</p>
            `,
      ssl: `
                <h5>🔒 Fix for SSL Certificate Issues:</h5>
                <ol>
                    <li>Ensure custom domain is working first</li>
                    <li>Enable "Enforce HTTPS" in Pages settings</li>
                    <li>Wait 15-30 minutes for certificate generation</li>
                    <li>Check domain verification status</li>
                    <li>Try disabling and re-enabling HTTPS</li>
                </ol>
                <p><strong>Note:</strong> SSL certificates are automatically provided by GitHub.</p>
            `,
    };

    if (issue && fixes[issue]) {
      fixInstructions.innerHTML = fixes[issue];
    } else {
      fixInstructions.innerHTML =
        "<p>Select an issue to get specific fix instructions.</p>";
    }
  };
}

// Copy to Clipboard Function
window.copyToClipboard = function (text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Show success feedback
      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "Copied!";
      button.style.background = "#28a745";

      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = "#4078c0";
      }, 2000);
    })
    .catch(() => {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      const button = event.target;
      const originalText = button.textContent;
      button.textContent = "Copied!";
      setTimeout(() => {
        button.textContent = originalText;
      }, 2000);
    });
};

// Progress tracking
function initializeProgress() {
  const progressFill = document.getElementById("progressFill");
  const sections = document.querySelectorAll(".section");
  let completedSections = new Set();

  // Track section visits
  const navButtons = document.querySelectorAll(".topic-nav .nav-btn");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const section = button.dataset.section;
      completedSections.add(section);
      updateProgressBar();
    });
  });

  function updateProgressBar() {
    const progress = (completedSections.size / sections.length) * 100;
    progressFill.style.width = `${progress}%`;

    if (progress === 100) {
      setTimeout(() => {
        showCompletionMessage();
      }, 500);
    }
  }

  function showCompletionMessage() {
    const progressText = document.querySelector(".progress-text");
    progressText.textContent =
      "🎉 Congratulations! You've mastered GitHub Pages deployment!";
    progressText.style.color = "#28a745";
    progressText.style.fontWeight = "bold";
  }
}

function updateProgress() {
  // This function is called when navigating between sections
  // Additional progress tracking logic can be added here
}

// Add interactive hover effects
document.addEventListener("DOMContentLoaded", function () {
  // Add hover effects to cards
  const cards = document.querySelectorAll(
    ".intro-card, .deployment-card, .practice-item, .tool-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Add click animations to buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1)";
      }, 100);
    });
  });
});

// Keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + number keys to switch sections
  if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "5") {
    e.preventDefault();
    const sectionIndex = parseInt(e.key) - 1;
    const navButtons = document.querySelectorAll(".topic-nav .nav-btn");
    if (navButtons[sectionIndex]) {
      navButtons[sectionIndex].click();
    }
  }
});

// Scroll to top when switching sections
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top functionality to navigation
document.querySelectorAll(".topic-nav .nav-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(scrollToTop, 100);
  });
});

// Initialize tooltips for better UX
function initializeTooltips() {
  const tooltipElements = document.querySelectorAll("[title]");
  tooltipElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      const tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.textContent = this.getAttribute("title");
      tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
      document.body.appendChild(tooltip);

      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + "px";
      tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

      setTimeout(() => {
        tooltip.style.opacity = "1";
      }, 100);

      this.addEventListener(
        "mouseleave",
        function () {
          document.body.removeChild(tooltip);
        },
        { once: true }
      );
    });
  });
}

// Initialize tooltips
document.addEventListener("DOMContentLoaded", initializeTooltips);
