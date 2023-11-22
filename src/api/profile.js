import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5001' });

// Function to get the profile of the currently logged-in user
// Now using a query parameter for userId
export const fetchProfile = async (userId) => {
    console.log('Calling API to fetch profile for user ID:', userId);
    try {
      const response = await API.get(`/api/profile/${userId}`);
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Error in API call:', error);
      throw error; // 抛出错误以便在调用处捕获
    }
  };
  
// Function to get the profile of a specific user by ID
export const fetchUserProfile = async (userId) => {
  return await API.get(`/api/profile/${userId}`);
};

// Function to update the profile of the currently logged-in user
// Assuming you will pass userId in the updatedData
export const updateProfile = async (updatedData) => {
  // Temporarily removed the Authorization header since authentication is bypassed
  return await API.put('/api/profile', updatedData);
};

export const updateProfileBio = async (userId, newBio, token) => {
    try {
      // 设置授权头部
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      // 发送 PUT 请求
      const response = await API.put(`/api/profile/${userId}`, { bio: newBio });
  
      // 返回响应数据
      return response.data;
    } catch (error) {
      // 处理或抛出错误
      console.error('Error updating profile:', error);
      throw error;
    }
  };
  