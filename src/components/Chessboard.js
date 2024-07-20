import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import './ChessBoard.css'; // Import the CSS file

const ChessBoard = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [message, setMessage] = useState('');

  const onDrop = ({ sourceSquare, targetSquare }) => {
    try {
      // Validate the move
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for simplicity
      });

      // Illegal move
      if (move === null) {
        setMessage('Invalid move.');
        return;
      }

      setFen(game.fen());
      setMessage('Player moved.');

      // Check if game is over after player's move
      if (game.isGameOver()) {
        setMessage('Game over. Player wins!');
        return;
      }

      // AI move
      setTimeout(() => {
        const moves = game.moves();
        const move = moves[Math.floor(Math.random() * moves.length)];
        game.move(move);
        setFen(game.fen());
        setMessage('AI moved.');

        // Check if game is over after AI's move
        if (game.isGameOver()) {
          setMessage('Game over. AI wins!');
        }
      }, 1000); // AI move delay for better UX
    } catch (error) {
      console.error('Error:', error);
      setMessage('Invalid move.');
    }
  };

  return (
    <div className="chessboard-container">
      <Chessboard
        position={fen}
        onPieceDrop={(sourceSquare, targetSquare) => onDrop({ sourceSquare, targetSquare })}
        areArrowsAllowed={true}
        boardOrientation="white"
      />
      <p>{message}</p>
    </div>
  );
};

export default ChessBoard;
