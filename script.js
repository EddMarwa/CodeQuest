// Function to run code and display output
function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const output = document.getElementById(`output-${level}`);
    const code = codeEditor.value;

    // Clear previous output
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
        userFunction(); // Execute user code

        // Retrieve captured output
        if (consoleOutput.length > 0) {
            output.textContent = consoleOutput.join('\n');
        } else {
            output.textContent = 'No output produced.';
        }

        // Check if output is valid to proceed to the next level
        if (consoleOutput.length > 0) {
            document.getElementById('next-level-button').style.display = 'block';
            // Update score if valid output
            updateScore();
        } else {
            document.getElementById('next-level-button').style.display = 'none';
        }

    } catch (e) {
        output.textContent = `Error: ${e.message}`;
    } finally {
        // Restore original console.log
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

// Function to move to the next level
function nextLevel() {
    const currentLevel = getCurrentLevel();
    const nextLevel = currentLevel + 1;
    
    if (nextLevel <= 10) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        document.getElementById(`level-${nextLevel}`).classList.add('active');
        document.getElementById('next-level-button').style.display = 'none';
        // Hide hint for the current level
        document.getElementById(`hint-${currentLevel}`).style.display = 'none';
        // Clear editor
        document.getElementById(`code-editor-${currentLevel}`).value = '';

        // Update progress bar
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
        document.getElementById('next-level-button').style.display = 'none';
        // Hide hint for the current level
        document.getElementById(`hint-${currentLevel}`).style.display = 'none';

        // Update progress bar
        updateProgressBar(prevLevel);
    }
}

// Function to show hint for the current level
function showHint(level) {
    const hint = document.getElementById(`hint-${level}`);
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

// Function to get the current active level number
function getCurrentLevel() {
    for (let i = 1; i <= 10; i++) {
        if (document.getElementById(`level-${i}`).classList.contains('active')) {
            return i;
        }
    }
    return 1;
}

// Initialize the first level and hide the next level button
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('next-level-button').style.display = 'none';
});
