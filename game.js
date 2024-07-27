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
        if (result.trim()) {
            document.getElementById(`output-${level}`).textContent = 'Output:\n' + result.trim();
            score += 10; // Increase score on successful code execution
            document.getElementById('score').textContent = score;
            document.getElementById('next-level-button').style.display = 'block';
        } else {
            document.getElementById(`output-${level}`).textContent = 'No output. Please ensure your code produces an output.';
            document.getElementById('next-level-button').style.display = 'none';
        }
    } catch (e) {
        document.getElementById(`output-${level}`).textContent = 'Error: ' + e.message;
        document.getElementById('next-level-button').style.display = 'none';
    }

    console.log = originalLog;

    document.getElementById(`code-editor-${level}`).value = '';
    updateCharCount(level); 
}

function setupChallenge() {
    document.getElementById('challenge-1').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
    document.getElementById('challenge-2').textContent = "Create an array with three elements and log it to the console.";
    document.getElementById('challenge-3').textContent = "Write a function that adds two numbers and log the result to the console.";
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

setupChallenge();
document.getElementById('level-1').style.display = 'block'; 
