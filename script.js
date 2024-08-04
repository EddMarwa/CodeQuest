let currentLevel = 1;
let score = 0;

function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const outputElement = document.getElementById(`output-${level}`);
    const code = codeEditor.value;

    try {
        const result = eval(code);
        outputElement.textContent = result !== undefined ? result : 'No output';
        
        if (result !== undefined) {
            score += 1;
            document.getElementById('score').textContent = score;
            document.getElementById('next-level-button').style.display = 'block';
        } else {
            outputElement.textContent = 'No output or error in code';
        }
    } catch (e) {
        outputElement.textContent = `Error: ${e.message}`;
    }
}

function previousLevel() {
    if (currentLevel > 1) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        currentLevel -= 1;
        document.getElementById(`level-${currentLevel}`).classList.add('active');
    }
}

function nextLevel() {
    if (currentLevel < 10) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        currentLevel += 1;
        document.getElementById(`level-${currentLevel}`).classList.add('active');
        document.getElementById('next-level-button').style.display = 'none';
    }
}

function showHint(level) {
    document.getElementById(`hint-${level}`).style.display = 'block';
}

document.querySelectorAll('textarea').forEach((textarea, index) => {
    textarea.addEventListener('input', function() {
        document.getElementById(`char-count-${index + 1}`).textContent = `${this.value.length} characters`;
    });
});
