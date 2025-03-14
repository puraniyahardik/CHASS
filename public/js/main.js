//send to client to server
 //send to client to server
// socket.emit("churan")
// socket.on('churan papdi', function(){
//     console.log('churan papdi recived from backend');

// const { Chess } = require("chess.js");


const socket = io(); 
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

 
const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    board.forEach((row, rowIndex)=>{
        row.forEach((square, squareIndex) => {
         const squareElement = document.createElement('div');

         squareElement.classList.add('square', 
            (rowIndex + squareIndex) % 2 === 0 ? 'light' :
            'black' 
         );

         squareElement.dataset.row = rowIndex;
         squareElement.dataset.col = squareIndex;

         if (square) {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('piece',
                square.color === 'w' ? 'white' : 'black'
            );

            pieceElement.innerText = getPieceUnicode(square);
            pieceElement.draggable = playerRole === square.color;

            pieceElement.addEventListener('dragstart', (e) => {
                if (pieceElement.draggable) {
                    draggedPiece = pieceElement;
                    sourceSquare = {
                        row: rowIndex, 
                        col:squareIndex
                    }
                    e.dataTransfer.setData('text/plain', '');
                }
            })

            pieceElement.addEventListener('dragend', (e)=> {
                draggedPiece = null;
                sourceSquare = null;
            });
            squareElement.appendChild(pieceElement);
         }

         squareElement.addEventListener('dragover', function(e){
            e.preventDefault();
         });

         squareElement.addEventListener('drop',function(e){
            e.preventDefault();
            if (draggedPiece) {
                const targetSource = {
                    row: parseInt(squareElement.dataset.row),
                    col: parseInt(squareElement.dataset.col)
                };

                handleMove(sourceSquare, targetSource);
            }
         })
         boardElement.appendChild(squareElement);
        });
    });

    if (playerRole === 'b') {
        boardElement.classList.add('flipped');
    }else{
        boardElement.classList.remove('flipped');
    }
}

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to:`${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion:'q'
    };

    socket.emit('move',move);
}

const getPieceUnicode = (piece) => {
    const unicodePiece = {
        k :'♔',
        p:'♙',
        r:'♖',
        n:'♘',
        q:'♕',
        b:'♗',

        K:'♚',
        P:'♟',
        R:'♜',
        N:'♞',
        Q:'♛',
        B:'♝'
    }

    return unicodePiece[piece.type] || '';
}


socket.on('playerRole', function(role){
    playerRole = role;
    renderBoard();
});

socket.on('spectatorRole', function(){
    playerRole = null;
    renderBoard();
});

socket.on('boardState', function(fen){
    chess.load(fen);
    renderBoard();
});

socket.on('move', function(move){
    chess.move(move);
    renderBoard();
})


renderBoard();
