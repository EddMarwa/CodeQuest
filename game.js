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
        // Clear previous output
        result = '';
        
        // Evaluate user code
        eval(userCode);
        
        // Display output
        document.getElementById(`output-${level}`).textContent = result.trim() || 'No output or empty result';

        // Check if there is any output
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

    // Prevent code editor from clearing the code
    // document.getElementById(`code-editor-${level}`).value = '';

    // Update character count
    updateCharCount(level);
}

function setupChallenge() {
    document.getElementById('challenge-1').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
    document.getElementById('challenge-2').textContent = "Create an array with three elements and log it to the console.";
    document.getElementById('challenge-3').textContent = "Write a function that takes a number and returns its square.";
    document.getElementById('challenge-4').textContent = "Create an object with properties 'name' and 'age' and log it.";
    document.getElementById('challenge-5').textContent = "Write a loop that logs numbers 1 to 5.";
    document.getElementById('challenge-6').textContent = "Define a constant array and modify its first element.";
    document.getElementById('challenge-7').textContent = "Write a function to calculate the factorial of a number.";
    document.getElementById('challenge-8').textContent = "Create a simple class with a method that returns a greeting.";
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
        alert('Congratulations! You have completed all levels!');
    }
}

function previousLevel() {
    if (currentLevel > 1) {
        document.getElementById(`level-${currentLevel}`).style.display = 'none';
        currentLevel--;
        document.getElementById(`level-${currentLevel}`).style.display = 'block';
        document.getElementById('next-level-button').style.display = 'none';
    }
}

document.getElementById('code-editor-1').addEventListener('input', () => updateCharCount(1));
document.getElementById('code-editor-2').addEventListener('input', () => updateCharCount(2));
document.getElementById('code-editor-3').addEventListener('input', () => updateCharCount(3));
document.getElementById('code-editor-4').addEventListener('input', () => updateCharCount(4));
document.getElementById('code-editor-5').addEventListener('input', () => updateCharCount(5));
document.getElementById('code-editor-6').addEventListener('input', () => updateCharCount(6));
document.getElementById('code-editor-7').addEventListener('input', () => updateCharCount(7));
document.getElementById('code-editor-8').addEventListener('input', () => updateCharCount(8));

setupChallenge();
document.getElementById('level-1').style.display = 'block'; // Show Level 1 by default
