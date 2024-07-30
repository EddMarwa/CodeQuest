let score = 0;
let currentLevel = 1;

function runCode(level) {
    const userCode = document.getElementById(`code-editor-${level}`).value;
    let result = '';

    // Capture console.log output
    const originalLog = console.log;
    console.log = function(...args) {
        args.forEach(arg => {
            result += arg + ' ';
        });
        result += '\n';
        originalLog.apply(console, args);
    };

    try {
        eval(userCode);
        document.getElementById(`output-${level}`).textContent = 'Output:\n' + result.trim();
        
        // Check if there is any output to allow moving to the next level
        if (result.trim()) {
            score += 10; // Increase score on successful code execution
            document.getElementById('score').textContent = score;
            document.getElementById('next-level-button').style.display = 'block';
        } else {
            document.getElementById('next-level-button').style.display = 'none';
        }
    } catch (e) {
        document.getElementById(`output-${level}`).textContent = 'Error: ' + e.message;
        document.getElementById('next-level-button').style.display = 'none';
    }

    // Restore the original console.log
    console.log = originalLog;

    document.getElementById(`code-editor-${level}`).value = '';
    updateCharCount(level); // Update character count
}

function setupChallenge() {
    document.getElementById('challenge-1').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
    document.getElementById('challenge-2').textContent = "Create an array with three elements and log it to the console.";
    document.getElementById('challenge-3').textContent = "Write a function that takes two numbers and returns their sum.";
    document.getElementById('challenge-4').textContent = "Create an object representing a car with properties for make, model, and year. Log the object to the console.";
    document.getElementById('challenge-5').textContent = "Write a function that takes an array of numbers and returns the largest number.";
}

function showHint(level) {
    document.getElementById(`hint-${level}`).style.display = 'block';
}

function updateCharCount(level) {
    const charCount = document.getElementById(`code-editor-${level}`).value.length;
    document.getElementById(`char-count-${level}`).textContent = `${charCount} characters`;
}

function nextLevel() {
    document.getElementById(`level-${currentLevel}`).style.display = 'none';
    currentLevel++;
    if (document.getElementById(`level-${currentLevel}`)) {
        document.getElementById(`level-${currentLevel}`).style.display = 'block';
        document.getElementById('next-level-button').style.display = 'none';
    } else {
        alert('Congratulations! You have completed all levels.');
    }
}

function prevLevel() {
    if (currentLevel > 1) {
        document.getElementById(`level-${currentLevel}`).style.display = 'none';
        currentLevel--;
        document.getElementById(`level-${currentLevel}`).style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupChallenge();
    document.getElementById(`level-${currentLevel}`).style.display = 'block';
});
