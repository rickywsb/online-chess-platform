// api/admin.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001'; // 或您的后端服务器地址

// 获取认证令牌的函数
const getAuthConfig = () => {
  const token = localStorage.getItem('token'); // 从本地存储获取令牌
  return {
    headers: {
      Authorization: `Bearer ${token}` // 在请求头中包含令牌
    }
  };
};

// 获取所有用户的函数
export const fetchUsers = async () => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_BASE_URL}/api/users`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 更新用户角色的函数
export const updateUserRole = async (userId, newRole) => {
  try {
    const config = getAuthConfig();
    const response = await axios.patch(`${API_BASE_URL}/api/user/${userId}/role`, { newRole }, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};
