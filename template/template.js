document.addEventListener("DOMContentLoaded", () => {
  const numberOfPots = 9;
  const gameBoard = document.getElementById("game-board");
  const scoreDisplay = document.getElementById("score");
  const replayButton = document.getElementById("replay-button");

  let score = 0;
  let gameOver = false;
  let molePosition = null;
  let plantPosition = null;
  let moleInterval, plantInterval;

  const getRandomPosition = () => Math.floor(Math.random() * numberOfPots);

  const setMole = () => {
    const randomPosition = getRandomPosition();
    if (randomPosition !== plantPosition) {
      molePosition = randomPosition;
      updateBoard();
    }
  };

  const setPlant = () => {
    const randomPosition = getRandomPosition();
    if (randomPosition !== molePosition) {
      plantPosition = randomPosition;
      updateBoard();
    }
  };

  const updateBoard = () => {
    gameBoard.innerHTML = ""; // Clear the board
    for (let i = 0; i < numberOfPots; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.addEventListener("click", () => handleTileClick(i));

      if (i === molePosition) {
        const mole = document.createElement("img");
        mole.src = "../public/monty-mole.png";
        mole.alt = "Mole";
        mole.classList.add("icon");
        tile.appendChild(mole);
      }

      if (i === plantPosition) {
        const plant = document.createElement("img");
        plant.src = "../public/piranha-plant.png";
        plant.alt = "Plant";
        plant.classList.add("icon");
        tile.appendChild(plant);
      }

      gameBoard.appendChild(tile);
    }
  };

  const handleTileClick = (index) => {
    if (gameOver) return;

    if (index === molePosition) {
      score += 10;
      scoreDisplay.textContent = `Your Score: ${score}`;
      molePosition = null;
    } else if (index === plantPosition) {
      gameOver = true;
      alert(`GAME OVER! Your score is: ${score}`);
      replayButton.style.display = "inline";
      clearInterval(moleInterval);
      clearInterval(plantInterval);
    }

    updateBoard();
  };

  const startGame = () => {
    gameOver = false;
    score = 0;
    molePosition = null;
    plantPosition = null;
    scoreDisplay.textContent = `Your Score: ${score}`;
    replayButton.style.display = "none";

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
  };

  replayButton.addEventListener("click", startGame);

  startGame();
});
