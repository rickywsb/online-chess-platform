import React, { useState, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import { Chess } from 'chess.js';

const ChessGame = () => {
  const [chess] = useState(new Chess());
  const [fen, setFen] = useState('start');

  useEffect(() => {
    setFen(chess.fen());
  }, [chess]);

  const handleMove = (move) => {
    console.log("Player's move:", move);

    if (chess.move(move)) {
      setFen(chess.fen());
      getComputerMove(chess.fen()).then((computerMove) => {
        // 在这里处理计算机的走法
        if (computerMove) {
          // 执行计算机的走法
          chess.move({ from: computerMove.substring(0, 2), to: computerMove.substring(2, 4) });
          setFen(chess.fen());
        }
      });
      
    }

  };

  const getComputerMove = async (fen) => {
    console.log("Sending FEN to server:", fen);

    try {
      const response = await fetch('http://localhost:5001/chess/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fen }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received response from server:", data);

      return data.bestMove;
    } catch (error) {
      console.error('Error fetching computer move:', error);
    }
  };
  

  return (
    <Chessboard
      position={fen}
      onDrop={(move) =>
        handleMove({
          from: move.sourceSquare,
          to: move.targetSquare,
          promotion: "q", // 默认晋升为皇后
        })
      }
    />
  );
};

export default ChessGame;
