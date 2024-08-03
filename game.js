let score = 0;
let currentLevel = 1;

const challenges = {
    1: {code: "let wood, stone, iron;", hint: "Declare variables using `let` or `const` and assign values."},
    2: {code: "let array = [1, 2, 3]; console.log(array);", hint: "Use array methods like `push` and `pop` to manipulate arrays."},
    3: {code: "function square(num) { return num * num; }", hint: "Use the `return` statement to return the square of the number."},
    4: {code: "let person = { name: 'John', age: 30, occupation: 'Developer' }; console.log(person);", hint: "Use curly braces `{}` to create an object with properties."},
    5: {code: "function sum(a, b) { return a + b; }", hint: "Use the `return` statement to return the sum of the numbers."},
    6: {code: "let people = [{name: 'John', age: 30}, {name: 'Jane', age: 25}]; console.log(people);", hint: "Use square brackets `[]` to create an array of objects."},
    7: {code: "function toUpperCase(str) { return str.toUpperCase(); }", hint: "Use the `toUpperCase` method of the string to convert it to uppercase."},
    8: {code: "function firstElement(arr) { return arr[0]; }", hint: "Use array indexing to access the first element of the array."},
};

function runCode(level) {
    const codeEditor = document.getElementById(`code-editor-${level}`);
    const output = document.getElementById(`output-${level}`);
    const userCode = codeEditor.value;

    try {
        const result = eval(userCode);
        if (result !== undefined) {
            output.textContent = result;
            document.getElementById("next-level-button").style.display = "block";
            if (!output.getAttribute("data-logged")) {
                score++;
                document.getElementById("score").textContent = score;
                output.setAttribute("data-logged", "true");
            }
        } else {
            output.textContent = "No output";
            document.getElementById("next-level-button").style.display = "none";
        }
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        document.getElementById("next-level-button").style.display = "none";
    }
}

function nextLevel() {
    if (currentLevel < Object.keys(challenges).length) {
        document.getElementById(`level-${currentLevel}`).classList.remove("active");
        currentLevel++;
        document.getElementById(`level-${currentLevel}`).classList.add("active");
        document.getElementById("next-level-button").style.display = "none";
    }
}

function prevLevel(level) {
    if (level > 1) {
        document.getElementById(`level-${level}`).classList.remove("active");
        currentLevel--;
        document.getElementById(`level-${currentLevel}`).classList.add("active");
        document.getElementById("next-level-button").style.display = "none";
    }
}

function showHint(level) {
    document.getElementById(`hint-${level}`).style.display = "block";
}
