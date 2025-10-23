// Day 37: GitHub, Repositories & Branching JavaScript
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeRepositoryDemo();
  initializeBranchVisualizer();
  initializeWorkflowAnimation();
  initializeGitSimulator();
  initializeProgress();
});

// Navigation between sections
function initializeNavigation() {
  const navButtons = document.querySelectorAll(".nav-btn");
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

// Repository Demo - Git Actions Simulator
function initializeRepositoryDemo() {
  const addBtn = document.getElementById("addBtn");
  const commitBtn = document.getElementById("commitBtn");
  const pushBtn = document.getElementById("pushBtn");
  const actionStatus = document.getElementById("actionStatus");
  const fileItems = document.querySelectorAll(".file-item");

  let currentStage = "unstaged"; // unstaged, staged, committed, pushed

  addBtn.addEventListener("click", () => {
    if (currentStage === "unstaged") {
      // Stage all files
      fileItems.forEach((item) => {
        item.classList.add("staged");
        item.querySelector(".file-status").textContent = "Staged";
      });

      addBtn.disabled = true;
      commitBtn.disabled = false;
      actionStatus.textContent = "Files staged! Ready to commit.";
      actionStatus.style.background = "#fff3cd";
      actionStatus.style.color = "#856404";
      currentStage = "staged";
    }
  });

  commitBtn.addEventListener("click", () => {
    if (currentStage === "staged") {
      commitBtn.disabled = true;
      pushBtn.disabled = false;
      actionStatus.textContent = "Changes committed! Ready to push.";
      actionStatus.style.background = "#d4edda";
      actionStatus.style.color = "#155724";
      currentStage = "committed";

      // Animate commit
      fileItems.forEach((item) => {
        item.style.transform = "scale(0.95)";
        setTimeout(() => {
          item.style.transform = "scale(1)";
        }, 200);
      });
    }
  });

  pushBtn.addEventListener("click", () => {
    if (currentStage === "committed") {
      pushBtn.disabled = true;
      actionStatus.textContent = "Changes pushed to remote repository! ✅";
      actionStatus.style.background = "#d1ecf1";
      actionStatus.style.color = "#0c5460";
      currentStage = "pushed";

      // Reset after 3 seconds
      setTimeout(() => {
        resetRepoDemo();
      }, 3000);
    }
  });

  function resetRepoDemo() {
    fileItems.forEach((item) => {
      item.classList.remove("staged");
      const originalStatus = item.dataset.status;
      const statusText =
        originalStatus.charAt(0).toUpperCase() + originalStatus.slice(1);
      item.querySelector(".file-status").textContent = statusText;
    });

    addBtn.disabled = false;
    commitBtn.disabled = true;
    pushBtn.disabled = true;
    actionStatus.textContent = "Ready to stage files";
    actionStatus.style.background = "#e3f2fd";
    actionStatus.style.color = "#1976d2";
    currentStage = "unstaged";
  }
}

// Branch Visualizer
function initializeBranchVisualizer() {
  const createBranchBtn = document.getElementById("createBranchBtn");
  const switchBranchBtn = document.getElementById("switchBranchBtn");
  const mergeBranchBtn = document.getElementById("mergeBranchBtn");
  const resetBranchBtn = document.getElementById("resetBranchBtn");
  const mergeLine = document.getElementById("mergeLine");
  const featureBranch = document.querySelector(".feature-branch");
  const featureCommits = document.querySelectorAll(".feature-branch .commit");

  let branchState = "initial"; // initial, created, switched, merged

  createBranchBtn.addEventListener("click", () => {
    if (branchState === "initial") {
      featureBranch.style.opacity = "1";
      featureCommits.forEach((commit, index) => {
        setTimeout(() => {
          commit.classList.add("active");
          commit.style.transform = "scale(1.1)";
          setTimeout(() => {
            commit.style.transform = "scale(1)";
          }, 300);
        }, index * 500);
      });

      createBranchBtn.disabled = true;
      switchBranchBtn.disabled = false;
      branchState = "created";
    }
  });

  switchBranchBtn.addEventListener("click", () => {
    if (branchState === "created") {
      // Highlight feature branch
      featureBranch.style.background = "rgba(76, 175, 80, 0.1)";
      featureBranch.style.border = "2px solid #4caf50";

      switchBranchBtn.disabled = true;
      mergeBranchBtn.disabled = false;
      branchState = "switched";
    }
  });

  mergeBranchBtn.addEventListener("click", () => {
    if (branchState === "switched") {
      mergeLine.classList.add("visible");

      // Create merge commit
      const mainCommits = document.querySelector(".main-branch .commit-line");
      const mergeCommit = document.createElement("div");
      mergeCommit.className = "commit active";
      mergeCommit.textContent = "M1";
      mergeCommit.style.background = "#ffc107";
      mainCommits.appendChild(mergeCommit);

      // Animate merge
      setTimeout(() => {
        mergeCommit.style.transform = "scale(1.2)";
        setTimeout(() => {
          mergeCommit.style.transform = "scale(1)";
        }, 300);
      }, 500);

      mergeBranchBtn.disabled = true;
      resetBranchBtn.disabled = false;
      branchState = "merged";
    }
  });

  resetBranchBtn.addEventListener("click", () => {
    resetBranchVisualizer();
  });

  function resetBranchVisualizer() {
    featureBranch.style.opacity = "0.3";
    featureBranch.style.background = "";
    featureBranch.style.border = "";
    mergeLine.classList.remove("visible");

    featureCommits.forEach((commit) => {
      commit.classList.remove("active");
    });

    // Remove merge commit
    const mergeCommit = document.querySelector(
      '.main-branch .commit[style*="ffc107"]'
    );
    if (mergeCommit) {
      mergeCommit.remove();
    }

    createBranchBtn.disabled = false;
    switchBranchBtn.disabled = true;
    mergeBranchBtn.disabled = true;
    resetBranchBtn.disabled = true;
    branchState = "initial";
  }

  // Initialize with feature branch hidden
  featureBranch.style.opacity = "0.3";
  switchBranchBtn.disabled = true;
  mergeBranchBtn.disabled = true;
  resetBranchBtn.disabled = true;
}

// Workflow Animation
function initializeWorkflowAnimation() {
  const animateBtn = document.getElementById("animateWorkflowBtn");
  const workflowSteps = document.querySelectorAll(".workflow-step");

  animateBtn.addEventListener("click", () => {
    animateWorkflow();
  });

  function animateWorkflow() {
    // Reset all steps
    workflowSteps.forEach((step) => {
      step.classList.remove("active");
    });

    // Animate each step
    workflowSteps.forEach((step, index) => {
      setTimeout(() => {
        step.classList.add("active");

        // Add pulse effect to step number
        const stepNumber = step.querySelector(".step-number");
        stepNumber.style.animation = "pulse 0.5s ease-in-out";
        setTimeout(() => {
          stepNumber.style.animation = "";
        }, 500);
      }, index * 1000);
    });

    // Re-enable button after animation
    animateBtn.disabled = true;
    setTimeout(() => {
      animateBtn.disabled = false;
    }, workflowSteps.length * 1000);
  }
}

// Git Command Simulator
function initializeGitSimulator() {
  const commandInput = document.getElementById("commandInput");
  const terminalOutput = document.getElementById("terminalOutput");
  const suggestionBtns = document.querySelectorAll(".suggestion-btn");
  const currentBranchSpan = document.getElementById("currentBranch");
  const branchList = document.getElementById("branchList");
  const commitCount = document.getElementById("commitCount");

  // Simulator state
  let simulatorState = {
    currentBranch: "main",
    branches: ["main"],
    commits: 0,
    initialized: false,
    stagedFiles: [],
    workingDirectory: ["README.md", "index.html", "style.css"],
  };

  // Command handlers
  const commands = {
    "git init": () => {
      if (!simulatorState.initialized) {
        simulatorState.initialized = true;
        return "Initialized empty Git repository in ~/project/.git/";
      }
      return "Reinitialized existing Git repository in ~/project/.git/";
    },

    "git status": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      let output = `On branch ${simulatorState.currentBranch}\n`;

      if (simulatorState.commits === 0) {
        output += "No commits yet\n";
      }

      if (simulatorState.stagedFiles.length > 0) {
        output += "\nChanges to be committed:\n";
        simulatorState.stagedFiles.forEach((file) => {
          output += `  new file:   ${file}\n`;
        });
      }

      const unstagedFiles = simulatorState.workingDirectory.filter(
        (file) => !simulatorState.stagedFiles.includes(file)
      );

      if (unstagedFiles.length > 0) {
        output += "\nUntracked files:\n";
        unstagedFiles.forEach((file) => {
          output += `  ${file}\n`;
        });
        output +=
          '\nnothing added to commit but untracked files present (use "git add" to track)';
      } else if (simulatorState.stagedFiles.length === 0) {
        output += "nothing to commit, working tree clean";
      }

      return output;
    },

    "git add README.md": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (!simulatorState.stagedFiles.includes("README.md")) {
        simulatorState.stagedFiles.push("README.md");
      }
      return "";
    },

    "git add .": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      simulatorState.stagedFiles = [...simulatorState.workingDirectory];
      return "";
    },

    'git commit -m "Initial commit"': () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (simulatorState.stagedFiles.length === 0) {
        return "nothing to commit, working tree clean";
      }

      simulatorState.commits++;
      simulatorState.stagedFiles = [];
      updateSimulatorUI();
      return `[${
        simulatorState.currentBranch
      } ${generateCommitHash()}] Initial commit\n ${
        simulatorState.workingDirectory.length
      } files changed`;
    },

    "git branch feature/navbar": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (!simulatorState.branches.includes("feature/navbar")) {
        simulatorState.branches.push("feature/navbar");
        updateSimulatorUI();
      }
      return "";
    },

    "git checkout feature/navbar": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (!simulatorState.branches.includes("feature/navbar")) {
        return "error: pathspec 'feature/navbar' did not match any file(s) known to git";
      }

      simulatorState.currentBranch = "feature/navbar";
      updateSimulatorUI();
      return "Switched to branch 'feature/navbar'";
    },

    "git checkout main": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      simulatorState.currentBranch = "main";
      updateSimulatorUI();
      return "Switched to branch 'main'";
    },

    "git merge feature/navbar": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (simulatorState.currentBranch !== "main") {
        return "Please switch to main branch first";
      }

      if (!simulatorState.branches.includes("feature/navbar")) {
        return "merge: feature/navbar - not something we can merge";
      }

      simulatorState.commits++;
      updateSimulatorUI();
      return "Merge made by the 'recursive' strategy.";
    },

    "git log --oneline": () => {
      if (!simulatorState.initialized) {
        return "fatal: not a git repository (or any of the parent directories): .git";
      }

      if (simulatorState.commits === 0) {
        return "fatal: your current branch 'main' does not have any commits yet";
      }

      let output = "";
      for (let i = simulatorState.commits; i > 0; i--) {
        output += `${generateCommitHash()} Commit ${i}\n`;
      }
      return output.trim();
    },
  };

  // Handle command input
  commandInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const command = commandInput.value.trim();
      executeCommand(command);
      commandInput.value = "";
    }
  });

  // Handle suggestion button clicks
  suggestionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const command = btn.dataset.command;
      commandInput.value = command;
      executeCommand(command);
      commandInput.value = "";
    });
  });

  function executeCommand(command) {
    // Add command to terminal output
    addToTerminal(`user@computer:~/project$ ${command}`, "command");

    // Execute command
    const handler = commands[command];
    if (handler) {
      const output = handler();
      if (output) {
        addToTerminal(output, "output");
      }
    } else if (command.startsWith("git")) {
      addToTerminal(
        `git: '${
          command.split(" ")[1]
        }' is not a git command. See 'git --help'.`,
        "error"
      );
    } else {
      addToTerminal(`${command}: command not found`, "error");
    }

    // Scroll to bottom
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function addToTerminal(text, type) {
    const lines = text.split("\n");
    lines.forEach((line) => {
      const div = document.createElement("div");
      div.className = type === "command" ? "terminal-line" : "output-line";

      if (type === "command") {
        div.innerHTML = `<span class="prompt">user@computer:~/project$</span> <span class="command">${line.replace(
          "user@computer:~/project$ ",
          ""
        )}</span>`;
      } else if (type === "error") {
        div.style.color = "#ff6b6b";
        div.textContent = line;
      } else {
        div.textContent = line;
      }

      terminalOutput.appendChild(div);
    });
  }

  function updateSimulatorUI() {
    currentBranchSpan.textContent = simulatorState.currentBranch;
    commitCount.textContent = simulatorState.commits;

    // Update branch list
    branchList.innerHTML = "";
    simulatorState.branches.forEach((branch) => {
      const li = document.createElement("li");
      li.textContent = branch;
      if (branch === simulatorState.currentBranch) {
        li.className = "active-branch";
      }
      branchList.appendChild(li);
    });
  }

  function generateCommitHash() {
    return Math.random().toString(36).substr(2, 7);
  }

  // Initialize UI
  updateSimulatorUI();
}

// Progress tracking
function initializeProgress() {
  const progressFill = document.getElementById("progressFill");
  const sections = document.querySelectorAll(".section");
  let completedSections = new Set();

  // Track section visits
  const navButtons = document.querySelectorAll(".nav-btn");
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
      "🎉 Congratulations! You've mastered Git & GitHub basics!";
    progressText.style.color = "#28a745";
    progressText.style.fontWeight = "bold";
  }
}

function updateProgress() {
  // This function is called when navigating between sections
  // Additional progress tracking logic can be added here
}

// Utility functions
function animateElement(element, animation) {
  element.style.animation = animation;
  element.addEventListener(
    "animationend",
    () => {
      element.style.animation = "";
    },
    { once: true }
  );
}

// Add some interactive commit hover effects
document.addEventListener("DOMContentLoaded", function () {
  const commits = document.querySelectorAll(".commit");
  commits.forEach((commit) => {
    commit.addEventListener("mouseenter", () => {
      const commitId = commit.dataset.commit;
      if (commitId) {
        commit.setAttribute(
          "title",
          `Commit ${commitId}: Click to view details`
        );
      }
    });

    commit.addEventListener("click", () => {
      const commitId = commit.dataset.commit;
      if (commitId) {
        animateElement(commit, "pulse 0.5s ease-in-out");
      }
    });
  });
});

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Ctrl/Cmd + number keys to switch sections
  if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "4") {
    e.preventDefault();
    const sectionIndex = parseInt(e.key) - 1;
    const navButtons = document.querySelectorAll(".nav-btn");
    if (navButtons[sectionIndex]) {
      navButtons[sectionIndex].click();
    }
  }
});
