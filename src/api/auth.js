import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userId', response.data.result._id); // 确保从响应中提取 _id

    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Add Register User Function
export const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        role: 'student' // 设置默认角色为学生
      });
      // 这里你可以根据需要处理响应，例如保存用户数据或直接登录用户
      return response.data;
    } catch (error) {
      // 这里处理错误，例如显示错误消息
      throw error;
    }
  };

  // 登出用户
export const logoutUser = () => {
  // 移除存储的用户信息和 token
  localStorage.removeItem('user');
  localStorage.removeItem('userId');
};
