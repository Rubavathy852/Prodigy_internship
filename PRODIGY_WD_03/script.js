let playerText = document.getElementById("playerText");
let restartbtn = document.getElementById("restartBtn");
let boxes = Array.from(document.getElementsByClassName("box"));


let winnerIndicator = getComputedStyle(document.body).getPropertyValue("--winning-block");
let drawIndication = getComputedStyle(document.body). getPropertyValue('--draw-block')

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
let count_plays

const startGame = () => {
  boxes.forEach(box => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerHTML = `${currentPlayer} has won!`;
      let winning_blocks = playerHasWon();
      count_plays = 10
      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      return;
    }
    count_plays++;
    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
  }

  if (count_plays === 9) {
    playerText.innerHTML = "draw gram!";
    boxes.forEach((box) => (box.style.color = drawIndication));
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartbtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  count_plays = 0
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.style.color = '#f2c14e'
  });

  playerText.innerHTML = "Tic Tac Toe";

  currentPlayer = X_TEXT;
}

startGame();
