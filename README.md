# Real-Time Group Chat Application

This project is a real-time group chat application using **Express**, **Socket.IO**, **JWT** for user authentication, and **EJS** as the template engine. Users can create and join rooms, and the app tracks the user count for each room.

## Features

- **Room Creation**: Users can create unique rooms, generating a unique room ID.
- **Real-time Messaging**: Messages are broadcasted to all users in a room using WebSockets.
- **User Count Tracking**: The app keeps track of the number of users in each room and notifies everyone in the room when someone joins or leaves.
- **JWT Authentication**: Users are authenticated via JSON Web Tokens (JWT), allowing only verified users to join rooms.

## Project Structure

- `app.js`: Main server file handling API routes, WebSocket connections, and room management.
- `public/`: Directory for static files (e.g., CSS, JavaScript for the front-end).
- `views/`: EJS templates for rendering pages.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd <repo-directory>

2. **Install dependencies:**:
   ```bash
   npm install

3. **Install dependencies:**:
   ```bash
   node app.js

## Configuration Note:

- **JWT Secret Key**: Located within the main file (`app.js`), set as `JWT_SECRET`. Update it for production environments to enhance security.

4. **Preview URL:**:
- Access the application: Open http://localhost:3000 in your browser.


# Some others infomation about this project:
---------------------------------------------

## Dependencies Used

- **express**: Web framework for handling routes and middleware.
- **jsonwebtoken**: For generating and verifying JWTs.
- **uuid**: Generates unique room IDs.
- **socket.io**: Enables real-time, bidirectional communication for chat.
- **body-parser**: Parses incoming JSON requests.
- **ejs**: Renders HTML templates on the server.

## API Endpoints

- **GET /**: Renders the home page.
- **POST /create-room**: Creates a new room with a unique room ID.
- **GET /chat/:roomId**: Joins an existing room with a specific room ID.
- **POST /join-room**: Authenticates the user and returns a JWT for room access.

## WebSocket Events

- **joinRoom**: Allows a user to join a specified room with a valid JWT. Sends a notification to other room users with the updated user count.
- **chatMessage**: Broadcasts a message to all users in the room.
- **disconnect**: Decreases the user count and notifies remaining users when someone leaves the room.

## License

This project is licensed under the **MIT License**.
