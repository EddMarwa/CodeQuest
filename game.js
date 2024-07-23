// game.js

function runCode() {
    const userCode = document.getElementById('code-editor').value;
    let result = '';


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
    } catch (e) {
        document.getElementById('output').textContent = 'Error: ' + e.message;
    }

    
    console.log = originalLog;
}


function setupChallenge() {
    document.getElementById('challenge').textContent = "Declare variables for wood, stone, and iron and initialize them with values.";
}

setupChallenge();
