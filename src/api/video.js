import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL;
const API_BASE_URL = `${API_BASE}/api/videos`; // Adjust the base URL as needed

// Fetch video details by ID
export const getVideoById = async (videoId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${videoId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add other video-related API calls here if needed
