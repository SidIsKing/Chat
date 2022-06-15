const socket = io("http://localhost:8000");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("messageInp");
const messageContainer = document.querySelector(".container");
var audio = new Audio("ting.mp3");
const append = (message, position) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageElement.classList.add("message");
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == "left") {
        audio.play();
    }
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append("You: " + message, "right");
    socket.emit("send", message);
    messageInput.value = "";
});
const Name = prompt("Enter your Name to join: ");
socket.emit("new-user-joined", Name);
socket.on("user-joined", (Name) => {
    append(Name + " joined the chat", "left");
});
socket.on("receive", (data) => {
    append(data.Name + ": " + data.message, "left");
});
socket.on("left", (Name) => {
    append(Name + " left the chat", "left");
});
const boldBtn = document.querySelector("#bold_btn");
boldBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.execCommand("bold");
});
const italicBtn = document.querySelector("#italic_btn");
italicBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.execCommand("italic");
});
const strikethroughBtn = document.querySelector("#strikethrough_btn");
strikethroughBtn.addEventListener("click", (e) => {
    e.preventDefault();
    document.execCommand("strikethrough");
});