import axios from 'axios';
const API_BASE_URL = "https://online-chess-platform-7f442b10751d.herokuapp.com"
const API = axios.create({ baseURL: API_BASE_URL });

// 获取当前登录用户的个人资料
export const fetchMyProfile = async (token) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await API.get('/api/profile/me');
};

// 获取特定用户的个人资料
export const fetchUserProfile = async (userId, token) => {
  console.log('current token:', token); // 调试信息
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await API.get(`/api/profile/${userId}`);
};

// 更新当前登录用户的个人资料
export const updateMyProfile = async (updatedData, token) => {
  API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return await API.put('/api/profile/me', updatedData);
};

// 更新个人简介（这个函数可能不再需要，因为可以使用 updateMyProfile 函数）
export const updateProfileBio = async (newBio, token) => {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return await API.put('/api/profile/me', { bio: newBio });
};
