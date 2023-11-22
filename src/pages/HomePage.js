// pages/HomePage.js
import React from 'react';
import ChessGame from '../components/ChessGame.js'; // 确保路径正确

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Chess Online Education</h1>
      <ChessGame />

      <p>Learn chess with the best courses and instructors online.</p>
    </div>
  );
};

export default HomePage;