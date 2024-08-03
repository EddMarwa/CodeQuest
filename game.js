// Helper function to run user code and check output
function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const output = document.getElementById(`output-${level}`);
    const userCode = codeEditor.value;

    try {
        const result = eval(userCode);
        output.textContent = result !== undefined ? result : 'No output';
        updateScore(level, true);
    } catch (error) {
        output.textContent = error.message;
        updateScore(level, false);
    }

    document.getElementById(`prev-button-${level}`).style.display = 'inline-block';
}

// Function to navigate to the previous level
function prevLevel(level) {
    const currentLevel = document.getElementById(`level-${level}`);
    const prevLevel = document.getElementById(`level-${level - 1}`);

    if (prevLevel) {
        currentLevel.classList.remove('active');
        prevLevel.classList.add('active');
    }
}

// Function to navigate to the next level
function nextLevel() {
    const activeLevel = document.querySelector('.level.active');
    const activeLevelId = parseInt(activeLevel.id.split('-')[1]);
    const nextLevel = document.getElementById(`level-${activeLevelId + 1}`);

    if (nextLevel) {
        activeLevel.classList.remove('active');
        nextLevel.classList.add('active');
        document.getElementById('next-level-button').style.display = 'none';
    }
}

// Function to show hints for each level
function showHint(level) {
    const hint = document.getElementById(`hint-${level}`);
    hint.style.display = 'block';
}

// Function to update the score based on correct or incorrect output
function updateScore(level, isCorrect) {
    const scoreElement = document.getElementById('score');
    let score = parseInt(scoreElement.textContent);

    if (isCorrect) {
        score += 10;
    } else {
        score -= 5;
    }

    scoreElement.textContent = score;

    if (isCorrect && level < 8) {
        document.getElementById('next-level-button').style.display = 'inline-block';
    }
}

// Event listeners to update character count in the code editor
document.querySelectorAll('textarea').forEach((textarea, index) => {
    const charCount = document.getElementById(`char-count-${index + 1}`);

    textarea.addEventListener('input', () => {
        charCount.textContent = `${textarea.value.length} characters`;
    });
});
