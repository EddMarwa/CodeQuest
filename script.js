// Function to run code and display output
function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const output = document.getElementById(`output-${level}`);
    const code = codeEditor.value;

    // Clears output
    output.textContent = '';

    // Capture console output
    const originalConsoleLog = console.log;
    const consoleOutput = [];
    console.log = function(...args) {
        consoleOutput.push(args.join(' '));
    };

    try {
        // Create a new function to execute the user code safely
        const userFunction = new Function(code);
        userFunction(); 

        // Retrieve captured output
        if (consoleOutput.length > 0) {
            output.textContent = consoleOutput.join('\n');
        } else {
            output.textContent = 'No output produced.';
        }

        // Check if output is valid to proceed to the next level
        if (consoleOutput.length > 0) {
            document.getElementById(`next-level-button-${level}`).style.display = 'block';
            
            updateScore();
        } else {
            document.getElementById(`next-level-button-${level}`).style.display = 'none';
        }

    } catch (e) {
        output.textContent = `Error: ${e.message}`;
    } finally {
       
        console.log = originalConsoleLog;
    }
}

// Function to update the score
function updateScore() {
    const scoreElement = document.getElementById('score');
    let score = parseInt(scoreElement.textContent, 10);
    score++;
    scoreElement.textContent = score;
}

function updateProgressBar(level) {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    const percentage = (level / 10) * 100;
    progressBar.value = percentage;
    progressText.textContent = `Level ${level}/10`;
}

// Function to move to the next level
function nextLevel() {
    const currentLevel = getCurrentLevel();
    const nextLevel = currentLevel + 1;
    
    if (nextLevel <= 10) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        document.getElementById(`level-${nextLevel}`).classList.add('active');
        document.getElementById(`next-level-button-${currentLevel}`).style.display = 'none';
        // Hide hint for the current level
        document.getElementById(`hint-${currentLevel}`).style.display = 'none';
        // Clears editor
        document.getElementById(`code-editor-${currentLevel}`).value = '';
        updateProgressBar(nextLevel);
    }
}
// Function to go back to the previous level
function prevLevel() {
    const currentLevel = getCurrentLevel();
    const prevLevel = currentLevel - 1;

    if (prevLevel >= 1) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        document.getElementById(`level-${prevLevel}`).classList.add('active');
        document.getElementById(`next-level-button-${currentLevel}`).style.display = 'none';
       
        document.getElementById(`hint-${currentLevel}`).style.display = 'none';

        //  progress bar Update
        updateProgressBar(prevLevel);
    }
}

// Function to "show" hint 
function showHint(level) {
    const hint = document.getElementById(`hint-${level}`);
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

// Function to get the current level number
function getCurrentLevel() {
    for (let i = 1; i <= 10; i++) {
        if (document.getElementById(`level-${i}`).classList.contains('active')) {
            return i;
        }
    }
    return 1;
}

// Initializes the first level and hides the next level 
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 10; i++) {
        document.getElementById(`next-level-button-${i}`).style.display = 'none';
    }
    updateProgressBar(1);
});


///--------------------------dark mode and light mode------------------------//
function toggleMode() {
    const body = document.body;
    const currentMode = body.classList.contains('dark-mode');

    if (currentMode) {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light'); 
    } else {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark'); 
    }
}

// Function to initialize the mode based on localStorage
function initializeMode() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.querySelector('input[type="checkbox"]').checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('input[type="checkbox"]').checked = false;
    }
}

// Add event listener to the toggle switch
document.addEventListener('DOMContentLoaded', () => {
    initializeMode(); 

    const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');
    toggleSwitch.addEventListener('change', toggleMode);
});
