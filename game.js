document.addEventListener('DOMContentLoaded', () => {
    const blockchainContainer = document.getElementById('blockchain');
    const addBlockBtn = document.getElementById('addBlockBtn');
    let blockchain = [];
    let starCount = 0;

    const puzzles = [
        {
            question: "Decrypt this text ZLOO using the Caesar cipher with a shift of 3",
            answer: "WILL",
            clue: "It's a simple right shift of 3 positions in the alphabet.",
            clueImage: "clueImage/13.jpg",
            solved: false,
            level: 'low'
        },
        {
            question: "What is the key used to encrypt this text HELLO to MFQQJ using the Caesar cipher?",
            answer: "5",
            clue: "It's the number of positions that each letter is shifted to the right in the alphabet.",
            clueImage: "clueImage/13.jpg",
            solved: false,
            level: 'medium'
        },
        {
            question: "How many possible keys are there for the Caesar cipher?",
            answer: "25",
            clue: "It's one less than the number of letters in the alphabet.",
            clueImage: "",
            solved: false,
            level: 'high'
        },
        {
            question: "Encrypt this text MINDMAJIX using the Caesar cipher with a shift of 7",
            answer: "TSLSTQRP",
            clue: "It's a simple right shift of 7 positions in the alphabet.",
            clueImage: "clueImage/13.jpg",
            solved: false,
            level: 'medium'
        },
        {
            question: "Decrypt this text YZGJXK using the Caesar cipher with a shift of 5",
            answer: "VUDCUE",
            clue: "It's a simple left shift of 5 positions in the alphabet.",
            clueImage: "clueImage/13.jpg",
            solved: false,
            level: 'low'
        },
        {
            question: "What is the ciphertext obtained by encrypting the word BING with a shift of 13?",
            answer: "OVAT",
            clue: "It's a simple right shift of 13 positions in the alphabet.",
            clueImage: "clueImage/14.jpeg",
            solved: false,
            level: 'high'
        },
        {
            question: "What is the plaintext obtained by decrypting the word GURK with a shift of 13?",
            answer: "THEX",
            clue: "It's a simple left shift of 13 positions in the alphabet.",
            clueImage: "clueImage/14.jpeg",
            solved: false,
            level: 'high'
        },
        {
            question: "What is the shift used to encrypt the word HELLO to URYYB using the caesar cipher?",
            answer: "18",
            clue: "It's the number of positions that each letter is shifted to the right in the alphabet.",
            clueImage: "clueImage/14.jpeg",
            solved: false,
            level: 'medium'
        },
        {
            question: "What is the name of the algorithm that uses two keys, one for encryption and one for decryption?",
            answer: "RSA",
            clue: "It's an acronym of the surnames of its inventors.",
            clueImage: "clueImage/15.jpg",
            solved: false,
            level: 'low'
        },
        {
            question: "What is the name of the function that converts any input into a fixed-length output, regardless of the input size?",
            answer: "Hash function",
            clue: "It's often used to verify the integrity of data or messages.",
            clueImage: "clueImage/16.jpeg",
            solved: false,
            level: 'medium'
        },
        {
            question: "What is the name of the technique that allows two parties to agree on a secret key over an insecure channel?",
            answer: "Diffie-Hellman key exchange",
            clue: "It's based on the mathematical problem of discrete logarithm.",
            clueImage: "clueImage/17.jpg",
            solved: false,
            level: 'high'
        }
       
    ];

    function initializeBlockchain() {
        const genesisBlock = {
            data: "Genesis Block",
            hash: '0x' + Math.random().toString(16).substr(2, 8),
            prevHash: 'None'
        };
        blockchain.push(genesisBlock);
        displayBlockchain();
    }

    function getRandomUnsolvedPuzzle() {
        let unsolvedPuzzles = puzzles.filter(puzzle => !puzzle.solved);
        if (unsolvedPuzzles.length === 0) {
            return null; // No more unsolved puzzles
        }
        let randomIndex = Math.floor(Math.random() * unsolvedPuzzles.length);
        return unsolvedPuzzles[randomIndex];
    }
    function rotateToNextPuzzle() {
        let nextPuzzle = getRandomUnsolvedPuzzle();
        if (!nextPuzzle) {
            alert("No more puzzles to rotate to!");
            return null;
        }
        return nextPuzzle;
    }

    function updateStars(level) {
        const stars = { low: 1, medium: 2, high: 3 };
        starCount += stars[level] || 0;
        document.getElementById('startext').textContent = `Stars: ${starCount}`;
    }
    const levelColors = {
        low: '#ADD8E6', // Light Blue for low difficulty
        medium: '#FFD700', // Gold for medium difficulty
        high: '#FF6347' // Tomato Red for high difficulty
    };
    

    function playSound(filename) {
        const audio = new Audio(filename);
        audio.play();
    }

    function simpleHash(data) {
        return '0x' + data.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(16);
    }

    function createNewBlock(data, level) {
        const previousBlock = blockchain[blockchain.length - 1];
        const newBlock = {
            data: data,
            level: level, // Add the level here
            hash: simpleHash(data + previousBlock.hash),
            prevHash: previousBlock.hash
        };
        blockchain.push(newBlock);
        displayBlockchain(); // Update the UI with the new blockchain
    }
    
    
    function displayBlockchain() {
        blockchainContainer.innerHTML = ''; // Clear the existing blockchain display
    
        // Iterate through the blockchain and add each block to the display
        blockchain.forEach((block, index) => {
            // Create a div to represent the block
            const blockDiv = document.createElement('div');
            blockDiv.classList.add('block');
    
            // Set the background color based on the level
            const blockColor = levelColors[block.level] || '#FFFFFF'; // Default to white if level is undefined
            blockDiv.style.backgroundColor = blockColor;
    
            // Add the block's details to the div
            const blockContent = `
                <p>Block ${index}:</p>
                <p>Data: ${block.data}</p>
                <p>Hash: ${block.hash}</p>
                <p>Previous Hash: ${block.prevHash}</p>
            `;
            blockDiv.innerHTML = blockContent;
    
            // Append the block div to the blockchain container
            blockchainContainer.appendChild(blockDiv);
        });
    }
     
    
    

    function addBlock() {
        let currentPuzzle = getRandomUnsolvedPuzzle();

        if (!currentPuzzle) {
            playSound('finish.mp3');
            alert("All puzzles solved!");
            
            return;
        }

        let puzzleModal = document.getElementById("puzzleModal");
        let puzzleQuestion = document.getElementById("puzzleQuestion");
        let puzzleClueContainer = document.getElementById("puzzleClueContainer");
        let censoredClue = document.getElementById("censoredClue");
        let uncensoredClue = document.getElementById("uncensoredClue");
        let img = document.getElementById("popupImg");
        let puzzleAnswerInput = document.getElementById("puzzleAnswer");
        let submitAnswerBtn = document.getElementById("submitAnswer");
        let closePuzzleBtn = document.getElementById("closePuzzle");
        

        puzzleQuestion.textContent = `Puzzle: ${currentPuzzle.question}`;
        censoredClue.textContent = "Clue: Censored";
        uncensoredClue.textContent = `Clue: ${currentPuzzle.clue}`;
        puzzleAnswerInput.value = '';
        img.src = currentPuzzle.clueImage;
            // Check if the clueImage is empty
        if (currentPuzzle.clueImage) {
            img.src = currentPuzzle.clueImage;
        } else {
            img.src = "clueImage/default.jpg"; // Set it to an empty string or a placeholder URL
        }
        puzzleModal.style.display = "block";

        closePuzzleBtn.onclick = function() {
            puzzleModal.style.display = "none";
        };
        

        submitAnswerBtn.onclick = function() {
            console.log("Submit clicked"); // To confirm the function is triggered
            let userSolution = puzzleAnswerInput.value.toLowerCase();
            console.log("User Solution: ", userSolution); // Log user input
            console.log("Correct Answer: ", currentPuzzle.answer); // 
        if (userSolution === currentPuzzle.answer.toLowerCase()) {
            currentPuzzle.solved = true;
           // When a puzzle is solved correctly
        const newBlockData = `Puzzle Solved: ${currentPuzzle.question}`;
        createNewBlock(newBlockData, currentPuzzle.level); // Pass the level here
            updateStars(currentPuzzle.level);
            playSound('correct.mp3');
            } else {
                alert("Incorrect solution. Rotating to next puzzle!");
                currentPuzzle = rotateToNextPuzzle();
                if (currentPuzzle) {
                    puzzleQuestion.textContent = `Puzzle: ${currentPuzzle.question}`;
                    puzzleAnswerInput.value = '';
                    censoredClue.textContent = "Clue: Censored";
                    uncensoredClue.textContent = `Clue: ${currentPuzzle.clue}`;
                    if (currentPuzzle.clueImage) {
                        img.src = currentPuzzle.clueImage;
                    } else {
                        img.src = "clueImage/default.jpg"; // Set it to an empty string or a placeholder URL
                    }
                }
                playSound('incorrect.mp3');
            }
            puzzleModal.style.display = "none";
        };
            // Add event listener for hover effect
        puzzleClueContainer.addEventListener("mouseenter", () => {
            censoredClue.style.display = "none";
            uncensoredClue.style.display = "inline";
        });

        puzzleClueContainer.addEventListener("mouseleave", () => {
            censoredClue.style.display = "inline";
            uncensoredClue.style.display = "none";
        });

        window.onclick = function(event) {
            if (event.target == puzzleModal) {
                puzzleModal.style.display = "none";
            }
        };
    }

    addBlockBtn.addEventListener('click', addBlock);
    document.addEventListener('keydown', (e) => {
    let puzzleAnswerInput = document.getElementById("puzzleAnswer");

    // Check if the pressed key is Enter
    if (e.code === 'Enter') {
        // Prevent the default behavior of the Enter key
        e.preventDefault();

        if (puzzleAnswerInput.value !== '') {
            document.getElementById("submitAnswer").click();
        }
    } else if (e.code === 'Space' && document.activeElement !== puzzleAnswerInput) {
        // Trigger addBlock only if the pressed key is Space and the focus is not on the input field
        addBlock();
    }
});


    initializeBlockchain();
});
