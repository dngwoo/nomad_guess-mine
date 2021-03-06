import { getSocket } from "./sockets";

const messages = document.querySelector("#jsMessage");
const sendMsg = document.querySelector("#jsSendMsg");

const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class=${nickname ? "out" : "self"}>${
    nickname ? nickname : "You"
  }: </span>
    <span class="content">${text} </span>
  `;
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMsg(value);
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const handleNewMessage = ({ message, nickname }) =>
  appendMsg(message, nickname);

// 리더는 채팅을 못치게 만들기 위한 함수
export const disableChat = () => {
  sendMsg.style.display = "none";
};

export const enableChat = () => {
  sendMsg.style.display = "flex";
};
