// Script for handling code editor and outputs

// Store level data
const levels = {
    1: { code: "", hint: "Hint: Declare variables using `let` or `const` and assign values." },
    2: { code: "", hint: "Hint: Use array methods like `push` and `pop` to manipulate arrays." },
    3: { code: "", hint: "Hint: Use the `+` operator to add two numbers." },
    4: { code: "", hint: "Hint: Use a `for` loop to iterate from 1 to 5." },
    5: { code: "", hint: "Hint: Use `Math.max()` to find the largest number." },
    6: { code: "", hint: "Hint: Use curly braces `{}` to create an object." },
    7: { code: "", hint: "Hint: Use a loop or recursion to calculate factorial." },
    8: { code: "", hint: "Hint: Use the `split()`, `reverse()`, and `join()` methods." },
    9: { code: "", hint: "Hint: Use `localStorage` to save the to-do list items." }
};

// Update character count in editor
function updateCharCount(level) {
    const editor = document.getElementById(`code-editor-${level}`);
    const charCount = document.getElementById(`char-count-${level}`);
    charCount.textContent = `${editor.value.length} characters`;
}

// Handle showing hints
function showHint(level) {
    const hint = document.getElementById(`hint-${level}`);
    hint.style.display = hint.style.display === "none" ? "block" : "none";
}

// Execute code and handle output
function runCode(level) {
    const code = document.getElementById(`code-editor-${level}`).value;
    const output = document.getElementById(`output-${level}`);
    let result = "";

    try {
        // Evaluate the code
        result = eval(code);
    } catch (e) {
        result = `Error: ${e.message}`;
    }

    output.textContent = result;

    // Check for output and update counter
    if (result) {
        const levelCounter = document.getElementById(`score-${level}`);
        levelCounter.textContent = parseInt(levelCounter.textContent) + 1;
    } else {
        alert("No output generated. Please fix your code.");
    }
}

// Handle previous level button
function prevLevel() {
    const currentLevel = document.querySelector(".level.active");
    const prevLevelId = parseInt(currentLevel.id.split('-')[1]) - 1;
    
    if (prevLevelId >= 1) {
        currentLevel.classList.remove("active");
        document.getElementById(`level-${prevLevelId}`).classList.add("active");
    }
}

// Handle next level button
function nextLevel() {
    const currentLevel = document.querySelector(".level.active");
    const nextLevelId = parseInt(currentLevel.id.split('-')[1]) + 1;
    
    if (nextLevelId <= 9) {
        currentLevel.classList.remove("active");
        document.getElementById(`level-${nextLevelId}`).classList.add("active");
    }
}

// Add event listeners for editors
for (let i = 1; i <= 9; i++) {
    document.getElementById(`code-editor-${i}`).addEventListener("input", () => updateCharCount(i));
}
