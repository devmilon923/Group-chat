const express = require("express");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

// Secret key for JWT
const JWT_SECRET = "sgsdgsgdsdgsghfg";

// Store user counts for each room
const roomUserCount = {};

// Serve home page
app.get("/", (req, res) => {
  res.render("index");
});

// Create a new room and return room ID
app.post("/create-room", (req, res) => {
  const roomId = uuidv4();
  roomUserCount[roomId] = 0; // Initialize user count for the new room
  res.json({ roomId });
});

// Join an existing room
app.get("/chat/:roomId", (req, res) => {
  const { roomId } = req.params;
  res.render("chat", { roomId });
});

// Join room endpoint
app.post("/join-room", (req, res) => {
  const { name } = req.body;
  const token = jwt.sign({ name }, JWT_SECRET);
  res.json({ token });
});

// WebSocket connection handler
io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomId, token }) => {
    try {
      const user = jwt.verify(token, JWT_SECRET);
      socket.userName = user.name || "Anonymous"; // Store the user's name
      socket.roomId = roomId; // Store the roomId
      socket.join(roomId);

      // Increase user count for the room
      roomUserCount[roomId] = (roomUserCount[roomId] || 0) + 1;

      // Notify the room about the new user
      io.to(roomId).emit("message", {
        userName: socket.userName,
        message: `Joined the room.`,
        userCount: roomUserCount[roomId], // Send the updated count
      });
    } catch (err) {
      socket.emit("error", "Invalid token");
    }
  });

  socket.on("chatMessage", ({ roomId, message }) => {
    const userName = socket.userName || "Anonymous"; // Retrieve the user's name
    io.to(roomId).emit("message", { userName, message, userCount: roomUserCount[roomId] }); // Emit with updated userCount
  });

  socket.on("disconnect", () => {
    const roomId = socket.roomId; // Retrieve roomId
    const userName = socket.userName || "Anonymous"; // Retrieve user name

    // Decrease user count for the room
    if (roomUserCount[roomId]) {
      roomUserCount[roomId]--;
      // Notify the room about the user leaving
      io.to(roomId).emit("message", {
        userName,
        message: `Has left the chat.`,
        userCount: roomUserCount[roomId], // Send the updated count
      });
    }
  });
});

server.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);
