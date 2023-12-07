import axios from 'axios';

// Base URL for Chess.com API
const CHESS_API_BASE_URL = 'https://api.chess.com/pub';

// Function to get player profile details
export const getPlayerProfile = async (username) => {
    try {
        const response = await axios.get(`${CHESS_API_BASE_URL}/player/${username}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching player profile:', error);
        throw error;
    }
};

// Add more functions here if needed for other Chess.com API endpoints
export const followPlayer = async (username) => {
    const token = localStorage.getItem('token');
    return axios.post('/api/follow-player', { chessPlayerUsername: username }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
  
export const unfollowPlayer = async (chessPlayerUsername) => {
    const token = localStorage.getItem('token');
    return axios.delete(`/api/unfollow-player/${chessPlayerUsername}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
};
  
  export const getFollowers = async (chessPlayerUsername) => {
    return axios.get(`/api/player/${chessPlayerUsername}/followers`);
};

// 在 chessApi.js 中添加

export const getPlayersByTitle = async (title) => {
    try {
        const response = await axios.get(`${CHESS_API_BASE_URL}/titled/${title}`);
        return response.data.players;
    } catch (error) {
        console.error('Error fetching players by title:', error);
        throw error;
    }
};
