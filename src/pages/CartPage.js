// pages/CartPage.js
import React from 'react';
import { getEnrolledCourses } from '../api/course'; 
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import CourseCard from '../components/Courses/CourseCard'; 
import { useNavigate } from 'react-router-dom';// 引入 useNavigate 钩子

import './CartPage.css';
import Modal from 'react-modal';
import './ModalStyles.css'; 
const CartPage = () => {
  Modal.setAppElement('#root'); // 设置模态对话框的根元素
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth(); // 使用 useAuth 钩子获取用户数据
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
    if (!user) {
      setShowLoginModal(true);
    }
  }, [user]);

  const username = user?.username; // 直接访问用户角色

  const fetchEnrolledCourses = async () => {
    try {
      const courses = await getEnrolledCourses(user._id);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };
  // Calculate the total price of enrolled courses
const totalPrice = enrolledCourses.reduce((total, course) => total + course.price, 0);
const navigateToLogin = () => {
  navigate('/login'); // 修改为您的登录页面路由
};

const navigateToRegister = () => {
  navigate('/register'); // 修改为您的注册页面路由
}
  return (
    <div>
      <h1>Shopping Cart</h1>
      <p>Review your selected courses and proceed to checkout.</p>
      <Modal
        isOpen={showLoginModal}
        onRequestClose={() => setShowLoginModal(false)}
        contentLabel="Login Reminder"
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Login Required</h2>
        <p>You need to be logged in to view enroll courses. Please login or register.</p>
        <button onClick={navigateToLogin}>Login</button>
        <button onClick={navigateToRegister}>Register</button>
      </Modal>
      {user && enrolledCourses.length > 0 && (
          <div className="course-container" >
            {enrolledCourses.map(course => (
             <div className="cart-container" key={course._id}>
             <div className="cart-items">
               <div className="cart-item" key={course._id}>
                 <h3 className="course-title">{course.title}</h3>
                 <p className="course-description">{course.description}</p>
                 <div className="course-footer">
                   <span className="course-price">${course.price}</span>
                 </div>
               </div>
               {/* Add more cart items here */}
             </div>
             
             
           </div>
           
            ))}
            <div className="cart-checkout">
               <div className="total-amount">
                 <span>Total:</span>
                 <span className="total-price">${totalPrice.toFixed(2)}</span>
               </div>
               <button className="checkout-button">Checkout</button>
             </div>
            
          </div>
        )}
      
    </div>
  );
};

export default CartPage;
