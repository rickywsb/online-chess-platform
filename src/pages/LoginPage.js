import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 引入 useHistory 钩子

import { loginUser } from '../api/auth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // 使用 useHistory 钩子
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.result._id); // 从 data.result 中提取 _id
      console.log('Logged in user ID:', data.result._id); // 确认存储的用户ID

      navigate('/'); // 登录后重定向到主页
    } catch (error) {
      console.error('Login failed:', error);
      // 可以在这里处理错误，例如显示错误消息
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
