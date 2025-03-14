# Chess Game Application

This is a real-time multiplayer chess game built using Node.js, Express, Socket.IO, and Chess.js. Players can connect to the server, play chess, and spectators can watch the game in progress.

## Features
- Real-time chess gameplay with two players.
- Spectator mode for additional connections.
- Drag-and-drop interface for making moves.
- Automatic board flipping for the black player.

## Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd CHASS
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage
1. Start the server:
   ```bash
   node app.js
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

## File Structure
- `app.js`: Main server file.
- `views/index.ejs`: Frontend template for the chessboard.
- `public/js/main.js`: Client-side JavaScript for handling the chessboard and moves.
- `public/css/style.css`: Styles for the chessboard (not included in this example).

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **Socket.IO**: Real-time communication.
- **Chess.js**: Chess logic and validation.
- **EJS**: Templating engine.

## How to Play
1. Open the application in two browser tabs or share the link with another player.
2. The first player to connect will be assigned the white pieces, and the second player will be assigned the black pieces.
3. Drag and drop pieces to make moves. The game follows standard chess rules.

## License
This project is licensed under the MIT License.
