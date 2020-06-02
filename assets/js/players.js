const board = document.querySelector("#jsPBoard");

const addPlayers = (players) => {
  board.innerHTML = ""; // jsPBoard안에 요소들을 한번 싹 지워준다.
  players.forEach((player) => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname}: ${player.points}`;
    board.appendChild(playerElement);
  });
};

export const handlePlayerUpdate = ({ sockets }) => {
  addPlayers(sockets);
};
