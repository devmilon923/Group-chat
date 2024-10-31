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

  const countDiv = document.getElementById("count");

  socket.on("message", ({ userName, message, userCount }) => {
    countDiv.innerText = userCount;
    
    const messagesContainer = document.getElementById("messages");
    if (message == "Joined the room.") {
      
      countDiv.innerText = userCount;
      document.getElementById(
        "messages"
      ).innerHTML += `<div class='mb-2 border rounded font-normal bg-green-200 p-3'><span class='font-bold'>${userName}</span>: ${message}</div>`;
    } else if (message == "Has left the chat.") {
     
      countDiv.innerText = userCount;
      document.getElementById(
        "messages"
      ).innerHTML += `<div class='mb-2 border font-normal rounded bg-red-200 p-3'><span class='font-bold'>${userName}</span>: ${message}</div>`;
    } else {
     
      countDiv.innerText = userCount;
      document.getElementById(
        "messages"
      ).innerHTML += `<div class='mb-2 border rounded font-normal bg-white p-3'><span class='font-bold'>${userName}</span>: ${message}</div>`;
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
});
