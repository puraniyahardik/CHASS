const express = require('express');
const socket = require('socket.io');
const http = require('http');
const { Chess } = require('chess.js');
const path = require('path');
const { title } = require('process');


const app = express();
const PORT = 4000;
const server = http.createServer(app);

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//socket instance
const io = socket(server);

//chess.js

const chess = new Chess();
let currentPlayer = 'w';
let players = {};

app.get('/', (req, res) => {
    res.render("index", { title: "Chess Game" })
});
io.on('connection', function (socket) {
    console.log("socket is connected");



    if (!players.white) {
        players.white = socket.id;
        socket.emit('playerRole', 'w')
    } else if (!players.black) {
        players.black = socket.id;
        socket.emit('playerRole', 'b')
    } else {
        socket.emit('spectatorRole')
    }

    socket.on('disconnect', function () {
        if (socket.id === players.white) {
            delete players.white;
            console.log("remove white");
        } else if (socket.id === players.black) {
            delete players.black;
            console.log("remove black");
        }
    });

    socket.on('move', (move)=>{
        try {

            if (chess.turn() === 'w' && socket.id !== players.white) return;
            if (chess.turn() === 'b' && socket.id !== players.black) return;

           const result = chess.move(move);
           if (result) {
            currentPlayer = chess.turn();
            io.emit('move', move);
            io.emit('boardState', chess.fen());
           } else{
            console.log("Invalid move", move);
            socket.emit('invalidMove',move);
           }

        } catch (error) {
            console.log(error);
            socket.emit('invalidMove',move)
        }
    });
});


server.listen(PORT, () => {
    console.log(`srver running on http://localhost:${PORT}`);
})
// app.listen(PORT, () => {
//     console.log(`Conncted ${PORT}`);
// })
