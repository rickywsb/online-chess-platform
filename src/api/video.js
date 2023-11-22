import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/videos'; // Adjust the base URL as needed

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
