import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // 确保正确导入 useAuth
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // 使用 useAuth 钩子

  const handleLogout = () => {
    logout(); // 调用从 AuthContext 获取的 logout 函数
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-item">Home</Link>
      <Link to="/courses" className="nav-item">Courses</Link>
      <Link to="/blog" className="nav-item">Blog</Link>
      {!isLoggedIn ? (
        <>
          <Link to="/login" className="nav-item">Login</Link>
          <Link to="/register" className="nav-item">Register</Link>
        </>
      ) : (
        <>
          <Link to="/profile" className="nav-item">Profile</Link>
          <button onClick={handleLogout} className="nav-item">Logout</button>
        </>
      )}
      <Link to="/cart" className="nav-item">Cart</Link>
    </nav>
  );
};

export default Navbar;