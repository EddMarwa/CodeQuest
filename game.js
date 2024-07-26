// game.js

let score = 0;

function runCode() {
    const userCode = document.getElementById('code-editor').value;
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
        document.getElementById('output').textContent = 'Output:\n' + result;
        score += 10; // Increase score on successful code execution
        document.getElementById('score').textContent = score;
        document.getElementById('next-level-button').style.display = 'block';
    } catch (e) {
        document.getElementById('output').textContent = 'Error: ' + e.message;
    }

    // Restore the original console.log
    console.log = originalLog;

    document.getElementById('code-editor').value = '';
    updateCharCount(); // Update character count
}

// Set up initial challenge
function setupChallenge() {
    document.getElementById('challenge').textContent = "Create an array with three elements and log it to the console.";
}

function showHint() {
    document.getElementById('hint').style.display = 'block';
}

function updateCharCount() {
    const charCount = document.getElementById('code-editor').value.length;
    document.getElementById('char-count').textContent = `${charCount} characters`;
}

function nextLevel() {
    alert('Proceeding to the next level!');
    // Logic to load the next level can be added here
}

document.getElementById('code-editor').addEventListener('input', updateCharCount);

setupChallenge();
