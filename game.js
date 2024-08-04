let currentLevel = 1;
let score = 0;

function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const outputElement = document.getElementById(`output-${level}`);
    const nextLevelButton = document.getElementById("next-level-button");

    const userCode = codeEditor.value;

    try {
        const result = eval(userCode);
        outputElement.textContent = result !== undefined ? result : 'No output';
        
        if (result !== undefined && result !== null && result !== '') {
            score++;
            document.getElementById("score").textContent = score;
            nextLevelButton.style.display = 'block';
        } else {
            nextLevelButton.style.display = 'none';
        }
    } catch (error) {
        outputElement.textContent = error;
        nextLevelButton.style.display = 'none';
    }
}

function nextLevel() {
    if (currentLevel < 9) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        currentLevel++;
        document.getElementById(`level-${currentLevel}`).classList.add('active');
        document.getElementById("next-level-button").style.display = 'none';
    }
}

function previousLevel() {
    if (currentLevel > 1) {
        document.getElementById(`level-${currentLevel}`).classList.remove('active');
        currentLevel--;
        document.getElementById(`level-${currentLevel}`).classList.add('active');
        document.getElementById("next-level-button").style.display = 'none';
    }
}

function showHint(level) {
    const hint = document.getElementById(`hint-${level}`);
    hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('input', function (event) {
    if (event.target.tagName.toLowerCase() === 'textarea') {
        const charCount = event.target.value.length;
        const editorInfo = event.target.nextElementSibling.querySelector('span');
        editorInfo.textContent = `${charCount} characters`;
    }
});
