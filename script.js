
// Define game variables
const blockchain = [];
let educationalContent = "";
let puzzleText = ""; // Store the current cryptographic puzzle text
let gameState = {
    currentBlock: 0,
};

// Functions for blockchain and cryptography logic
function addBlockToBlockchain(data) {
    const block = {
        data: data,
        previousHash: blockchain.length > 0 ? blockchain[blockchain.length - 1].hash : null,
        hash: generateHash(data),
    };
    blockchain.push(block);
}

function generateHash(data) {
    // Implement a basic hash function (e.g., for simplicity, you can use a string's length)
    return data.length.toString();
}

function createCryptographyPuzzle() {
    // Generate a simple cryptography puzzle (e.g., reverse the text)
    const text = "Hi"; // Change this to create different puzzles
    puzzleText = text;
    console.log("Generated puzzle text:", puzzleText); // Add this line
    return text.split("").reverse().join("");
}


function checkCryptographySolution(solution) {
    const reversedPuzzleText = puzzleText.split("").reverse().join("");
    return solution === reversedPuzzleText;
}



// Functions for user interface interactions
function displayEducationalContent(content) {
    document.getElementById("educational-content").textContent = content;
}

function updateBlockchainUI() {
    const blockchainDiv = document.getElementById("blockchain");
    blockchainDiv.innerHTML = "";
    blockchain.forEach((block, index) => {
        const blockDiv = document.createElement("div");
        blockDiv.textContent = `Block ${index + 1}: ${block.data} (Hash: ${block.hash})`;
        blockchainDiv.appendChild(blockDiv);
    });
}

function updatePuzzleUI() {
    const puzzleDiv = document.getElementById("puzzle");
    puzzleDiv.innerHTML = "";
    const puzzleTextDiv = document.createElement("div");
    puzzleTextDiv.textContent = "Decrypt this text:";
    const puzzleInput = document.createElement("input");
    puzzleInput.type = "text";
    const solveButton = document.createElement("button");
    solveButton.textContent = "Solve";
    solveButton.addEventListener("click", () => {
        const solution = puzzleInput.value;
        console.log("Solution entered:", solution); // Add this line
        if (checkCryptographySolution(solution)) {
            gameState.currentBlock++;
            addBlockToBlockchain(`Block ${gameState.currentBlock}`);
            updateBlockchainUI();
            displayEducationalContent("Correct! Block added to the blockchain.");
            puzzleText = createCryptographyPuzzle();
            updatePuzzleUI();
        } else {
            displayEducationalContent("Incorrect. Try again.");
        }
    });
    puzzleDiv.appendChild(puzzleTextDiv);
    puzzleDiv.appendChild(document.createTextNode(puzzleText));
    puzzleDiv.appendChild(puzzleInput);
    puzzleDiv.appendChild(solveButton);
}

// Initialize the game
function initializeGame() {
    displayEducationalContent("Welcome to CryptoBlock! Decrypt the text to add blocks to the blockchain.");
    puzzleText = createCryptographyPuzzle();
    updatePuzzleUI();
}

initializeGame();
