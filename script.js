function runCode(level) {
    let code = document.getElementById(`code-editor-${level}`).value;
    try {
        let output = eval(code);
        document.getElementById(`output-${level}`).textContent = output;
        // Update hint visibility
        document.getElementById(`hint-${level}`).style.display = 'none';
    } catch (error) {
        document.getElementById(`output-${level}`).textContent = 'Error: ' + error.message;
    }
}

function showHint(level) {
    let hintElement = document.getElementById(`hint-${level}`);
    if (hintElement.style.display === 'none' || hintElement.style.display === '') {
        hintElement.style.display = 'block';
    } else {
        hintElement.style.display = 'none';
    }
}

function prevLevel() {
    let currentLevel = document.querySelector('.level.active');
    if (currentLevel) {
        currentLevel.classList.remove('active');
        let prevLevel = currentLevel.previousElementSibling;
        if (prevLevel && prevLevel.classList.contains('level')) {
            prevLevel.classList.add('active');
        }
    }
}

function nextLevel() {
    let currentLevel = document.querySelector('.level.active');
    if (currentLevel) {
        currentLevel.classList.remove('active');
        let nextLevel = currentLevel.nextElementSibling;
        if (nextLevel && nextLevel.classList.contains('level')) {
            nextLevel.classList.add('active');
        }
    }
}

// Automatically add event listeners to the next level button
document.querySelectorAll('.button-container button').forEach(button => {
    if (button.textContent.includes('Run Code')) {
        button.addEventListener('click', () => {
            let level = button.id.split('-')[2];
            runCode(level);
        });
    } else if (button.textContent.includes('Show Hint')) {
        button.addEventListener('click', () => {
            let level = button.id.split('-')[2];
            showHint(level);
        });
    }
});
