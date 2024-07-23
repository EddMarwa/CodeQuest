

function runCode() {
    const userCode = document.getElementById('code-editor').value;
    try {
       
        const result = eval(userCode);
        document.getElementById('output').textContent = 'Output: ' + result;
    } catch (e) {
        document.getElementById('output').textContent = 'Error: ' + e.message;
    }
}


function setupChallenge() {
    document.getElementById('challenge').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
}

setupChallenge();
