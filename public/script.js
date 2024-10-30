const socket = io();

function joinRoom(roomId, token) {
  socket.emit("joinRoom", { roomId, token });
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = window.location.pathname.split("/").pop();
  const token = urlParams.get("token");

  // Join the room with the given roomId and token
  if (roomId && token) {
    joinRoom(roomId, token);
  }

  // Send chat message
  document.getElementById("chat-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const message = document.getElementById("chat-message").value;
    socket.emit("chatMessage", { roomId, message, token });
    document.getElementById("chat-message").value = "";
  });

  // Receive message from server
// Assuming you have already established a socket connection
socket.on("message", ({ userName, message }) => {
    const messageElement = document.createElement("div");
    messageElement.innerText = `${userName}: ${message}`; // Use both userName and message
    document.getElementById("messages").appendChild(messageElement);
  });
  
  
  
});
