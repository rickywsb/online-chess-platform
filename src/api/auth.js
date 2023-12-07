import axios from 'axios';

console.log('API URL:', process.env.REACT_APP_API_URL); // 这将打印出环境变量的值，以便于调试
console.log('API URL:', process.env.REACT_APP_API_BASE_URL); // 这将打印出环境变量的值，以便于调试


const API_URL = process.env.REACT_APP_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('userId', response.data.result._id); // 确保从响应中提取 _id

    }
    return response.data;
    console.log(response.data); // 添加这行来检查响应数据
  } catch (error) {
    throw error;
  }
};

// Add Register User Function
export const registerUser = async (username, email, password, phoneNumber) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        phoneNumber, // 确保 phoneNumber 被包括在请求体中

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
