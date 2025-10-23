// Day 36: Git - Interactive Demonstrations and Quiz

// Git commands demonstration data
const gitCommands = {
    init: {
        command: 'git init',
        description: 'Initialize a new Git repository',
        output: 'Initialized empty Git repository in /your/project/.git/'
    },
    status: {
        command: 'git status',
        description: 'Show working tree status',
        output: `On branch main
No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        index.html
        style.css

nothing added to commit but untracked files present (use "git add" to track)`
    },
    add: {
        command: 'git add .',
        description: 'Stage all changes',
        output: 'Files staged for commit'
    },
    commit: {
        command: 'git commit -m "Initial commit"',
        description: 'Commit staged changes',
        output: `[main (root-commit) a1b2c3d] Initial commit
 2 files changed, 50 insertions(+)
 create mode 100644 index.html
 create mode 100644 style.css`
    },
    log: {
        command: 'git log --oneline',
        description: 'Show commit history',
        output: `a1b2c3d (HEAD -> main) Initial commit
b2c3d4e Add navigation menu
c3d4e5f Fix responsive design
d4e5f6g Update footer styles`
    }
};

// Workflow simulation
let currentWorkflow = 'working';
const workflowStates = ['working', 'staging', 'committed'];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupWorkflowDemo();
    setupBranchingDemo();
    setupQuiz();
});

function setupWorkflowDemo() {
    // No setup needed - using direct onclick handlers in HTML
}

function simulateWorkflow() {
    const outputElement = document.getElementById('basic-workflow-output');
    let step = 0;
    
    const steps = [
        "📝 Working Directory: You've modified index.html",
        "➕ Staging Area: Running 'git add index.html'...",
        "📦 Repository: Running 'git commit -m \"Update homepage\"'...",
        "✅ Complete: Changes are now permanently saved in Git history!"
    ];
    
    outputElement.innerHTML = '';
    
    function showNextStep() {
        if (step < steps.length) {
            outputElement.innerHTML += steps[step] + '\n\n';
            step++;
            setTimeout(showNextStep, 1500);
        }
    }
    
    showNextStep();
}

function setupBranchingDemo() {
    // No setup needed - using direct onclick handlers in HTML
}

function simulateBranching() {
    const outputElement = document.getElementById('branching-output');
    let step = 0;
    
    const steps = [
        "🌟 Main Branch: Starting on main branch",
        "🔀 Create Branch: git checkout -b feature/new-navbar",
        "💻 Working: Making changes on feature branch...",
        "📝 Commit: git commit -m \"Add responsive navbar\"",
        "🔄 Switch: git checkout main",
        "🤝 Merge: git merge feature/new-navbar",
        "✅ Success: Feature branch merged into main!"
    ];
    
    outputElement.innerHTML = '';
    
    function showNextStep() {
        if (step < steps.length) {
            outputElement.innerHTML += steps[step] + '\n\n';
            step++;
            setTimeout(showNextStep, 2000);
        }
    }
    
    showNextStep();
}

function setupQuiz() {
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
}

function submitQuiz() {
    const answers = {
        q1: 'c', // git init
        q2: 'b', // git add .
        q3: 'a', // git commit -m "message"
        q4: 'b', // Create a new branch
        q5: 'c'  // git log
    };
    
    let score = 0;
    let totalQuestions = Object.keys(answers).length;
    
    // Check each answer
    Object.keys(answers).forEach(questionId => {
        const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
        if (selectedOption && selectedOption.value === answers[questionId]) {
            score++;
            // Highlight correct answer
            selectedOption.parentElement.style.background = 'rgba(46, 204, 113, 0.3)';
        } else {
            // Highlight incorrect answers
            if (selectedOption) {
                selectedOption.parentElement.style.background = 'rgba(231, 76, 60, 0.3)';
            }
            // Show correct answer
            const correctOption = document.querySelector(`input[name="${questionId}"][value="${answers[questionId]}"]`);
            correctOption.parentElement.style.background = 'rgba(46, 204, 113, 0.5)';
        }
    });
    
    // Display result
    const resultElement = document.getElementById('quiz-result');
    const percentage = (score / totalQuestions * 100).toFixed(0);
    
    let message = '';
    if (percentage >= 80) {
        message = '🎉 Excellent! You have a great understanding of Git!';
    } else if (percentage >= 60) {
        message = '👍 Good job! Keep practicing Git commands.';
    } else {
        message = '📚 Keep learning! Git takes practice to master.';
    }
    
    resultElement.innerHTML = `
        <strong>Your Score: ${score}/${totalQuestions} (${percentage}%)</strong><br>
        ${message}
    `;
    resultElement.style.display = 'block';
}

// Interactive Git command simulator
function simulateGitCommand(command) {
    const simulator = document.getElementById('git-simulator');
    if (!simulator) return;
    
    const commonCommands = {
        'git --version': 'git version 2.34.1',
        'git help': 'usage: git [--version] [--help] [-C <path>] ...',
        'pwd': '/home/user/my-project',
        'ls -la': `total 8
drwxr-xr-x  3 user user  96 Nov 15 10:30 .
drwxr-xr-x  5 user user 160 Nov 15 10:25 ..
drwxr-xr-x  8 user user 256 Nov 15 10:30 .git
-rw-r--r--  1 user user 1024 Nov 15 10:30 README.md
-rw-r--r--  1 user user 2048 Nov 15 10:30 index.html`
    };
    
    const output = commonCommands[command.toLowerCase()] || `Command executed: ${command}`;
    simulator.innerHTML += `<div class="command-line">$ ${command}</div><div class="command-output">${output}</div>`;
    simulator.scrollTop = simulator.scrollHeight;
}

// Best practices tips
const gitTips = [
    "💡 Always write clear, descriptive commit messages",
    "🔍 Use 'git status' frequently to check your repository state",
    "🌟 Create branches for new features or bug fixes",
    "📝 Commit small, logical changes rather than large chunks",
    "🤝 Pull before you push when collaborating",
    "🏷️ Use tags to mark important milestones",
    "🔄 Regularly sync with remote repositories",
    "⚡ Learn keyboard shortcuts for faster Git workflow"
];

function showRandomTip() {
    const tipElement = document.getElementById('git-tip');
    if (tipElement) {
        const randomTip = gitTips[Math.floor(Math.random() * gitTips.length)];
        tipElement.innerHTML = randomTip;
    }
}

// Initialize random tip
document.addEventListener('DOMContentLoaded', function() {
    showRandomTip();
    setInterval(showRandomTip, 10000); // Change tip every 10 seconds
});

// Advanced Git workflow demonstration
function demonstrateAdvancedWorkflow() {
    const outputElement = document.getElementById('advanced-output');
    if (!outputElement) return;
    
    const workflow = [
        "🚀 Starting advanced Git workflow demonstration...",
        "",
        "1️⃣ Create and switch to feature branch:",
        "$ git checkout -b feature/user-authentication",
        "",
        "2️⃣ Make changes and stage them:",
        "$ git add src/auth.js src/login.html",
        "",
        "3️⃣ Commit with descriptive message:",
        "$ git commit -m \"Add user authentication system\"",
        "",
        "4️⃣ Push feature branch to remote:",
        "$ git push origin feature/user-authentication",
        "",
        "5️⃣ Create pull request for code review...",
        "",
        "6️⃣ After approval, merge to main:",
        "$ git checkout main",
        "$ git pull origin main",
        "$ git merge feature/user-authentication",
        "",
        "7️⃣ Clean up by deleting feature branch:",
        "$ git branch -d feature/user-authentication",
        "$ git push origin --delete feature/user-authentication",
        "",
        "✅ Advanced workflow complete! Feature successfully integrated."
    ];
    
    outputElement.innerHTML = '';
    let lineIndex = 0;
    
    function displayNextLine() {
        if (lineIndex < workflow.length) {
            outputElement.innerHTML += workflow[lineIndex] + '\n';
            lineIndex++;
            setTimeout(displayNextLine, 800);
        }
    }
    
    displayNextLine();
}

// Functions called directly from HTML onclick handlers
function demoBasicWorkflow() {
    simulateWorkflow();
}

function demoBranching() {
    simulateBranching();
}

function demoCollaboration() {
    const outputElement = document.getElementById('collaboration-output');
    if (!outputElement) {
        // Create output element if it doesn't exist
        const button = event.target;
        const output = document.createElement('div');
        output.id = 'collaboration-output';
        output.className = 'output';
        button.parentNode.appendChild(output);
    }
    
    const collaborationSteps = [
        "👥 Starting collaboration workflow demonstration...",
        "",
        "1️⃣ Clone the repository:",
        "$ git clone https://github.com/team/project.git",
        "",
        "2️⃣ Create your feature branch:",
        "$ git checkout -b feature/new-feature",
        "",
        "3️⃣ Make your changes and commit:",
        "$ git add .",
        "$ git commit -m \"Add awesome new feature\"",
        "",
        "4️⃣ Stay updated with main branch:",
        "$ git checkout main",
        "$ git pull origin main",
        "$ git checkout feature/new-feature",
        "$ git rebase main",
        "",
        "5️⃣ Push your branch:",
        "$ git push origin feature/new-feature",
        "",
        "6️⃣ Create Pull Request for team review...",
        "",
        "7️⃣ After approval, merge and cleanup:",
        "$ git checkout main",
        "$ git pull origin main",
        "$ git branch -d feature/new-feature",
        "",
        "✅ Collaboration complete! Team workflow successful!"
    ];
    
    const targetOutput = document.getElementById('collaboration-output');
    targetOutput.innerHTML = '';
    let stepIndex = 0;
    
    function showNextStep() {
        if (stepIndex < collaborationSteps.length) {
            targetOutput.innerHTML += collaborationSteps[stepIndex] + '\n';
            stepIndex++;
            setTimeout(showNextStep, 1000);
        }
    }
    
    showNextStep();
}

function demoAdvanced() {
    demonstrateAdvancedWorkflow();
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const advancedDemoBtn = document.getElementById('demo-advanced');
    if (advancedDemoBtn) {
        advancedDemoBtn.addEventListener('click', demonstrateAdvancedWorkflow);
    }
});

// Utility function to reset quiz
function resetQuiz() {
    // Clear all radio button selections
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
        radio.parentElement.style.background = '';
    });
    
    // Hide quiz result
    const resultElement = document.getElementById('quiz-result');
    if (resultElement) {
        resultElement.style.display = 'none';
        resultElement.innerHTML = '';
    }
}

// Add reset button functionality
document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('reset-quiz');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetQuiz);
    }
});
