import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseModulesPage from './pages/CourseModulesPage.js'; // 导入你的模块页面组件

import { AuthProvider } from './contexts/AuthContext.js';

import './index.css';

// 引入Navbar组件
import Navbar from './components/Navbar.js';

// 引入页面组件
import HomePage from './pages/HomePage.js';
import CoursesPage from './pages/CoursesPage.js';
import BlogPage from './pages/BlogPage.js';
import LoginPage from './pages/LoginPage.js';
import CartPage from './pages/CartPage.js';
import RegisterPage from './pages/RegisterPage.js';
import ProfilePage from './pages/Profile.js';
import AdminPage from './pages/AdminPage.js';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <AuthProvider>

        <div className="App">
          <header className="App-header">
            {/* 使用Navbar组件 */}
            <Navbar />
          </header>
          {/* 路由设置 */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/player/:username" element={<DetailPage />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:courseId/modules" element={<CourseModulesPage />} />
            <Route path="/admin" element={<AdminPage />} />

            <Route path="/blog" element={<BlogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
