

function runCode() {
    const userCode = document.getElementById('code-editor').value;
    try {
        // Run the user's code
        const result = eval(userCode);
        document.getElementById('output').textContent = 'Output: ' + result;
    } catch (e) {
        document.getElementById('output').textContent = 'Error: ' + e.message;
    }
}

// Set up initial challenge
function setupChallenge() {
    document.getElementById('challenge').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
}

setupChallenge();
