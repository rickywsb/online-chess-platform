import React, { useState } from 'react';
import { registerUser } from '../api/auth'; // 确保路径正确
import { useNavigate } from 'react-router-dom'; 
import './LoginForm.css';// 引入 useNavigate 钩子

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '', // 添加 phoneNumber 字段
  });
  const navigate = useNavigate(); // 创建 navigate 函数

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 使用auth.js中定义的函数
      const response = await registerUser(formData.username, formData.email, formData.password, formData.phoneNumber);
      console.log(response);
      // Handle success (e.g., log in the user and redirect)
      navigate('/login'); // 使用 navigate 函数导航到登录页面

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleInputChange}
        placeholder="Username"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleInputChange}
        placeholder="Phone Number"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
