import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001';
const API_BASE_URL = `${API_BASE}/api`;

export const getUserRank = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/rank/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};