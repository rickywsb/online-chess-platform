import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/Courses/CourseCard'; // 确保路径正确
import SearchBar from '../components/SearchBar.js';
import TitleSearchBar from '../components/TitleSearchBar'; // 引入 TitleSearchBar 组件

import { getEnrolledCourses } from '../api/course'; // 引入 getEnrolledCourses 函数
import './HomePage.css'; // 引入 HomePage.css 文件

const HomePage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth(); // 使用 useAuth 钩子获取用户数据

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
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

  const allUsersInfo = (
    <div>
      <h2>3 Expert Tips For The Day</h2>
      <blockquote>
        "Always control the center. It's the key to winning the game."
        <footer>- National Master Ricky Wu</footer>
      </blockquote>
      <blockquote>
        "Don't rush. Take your time and think through your moves."
        <footer>- National Master Sibo Wu</footer>
      </blockquote>
      <blockquote>
        "Study your endgames. It's the most important part of the game."
        <footer>- National Master Sibo (Ricky) Wu</footer>
      </blockquote>
    </div>
  );

  // Hardcoded information for logged-in users
  const loggedInInfo = (
    <div>
      <h2>Upcoming Online Events</h2>
      <p>As a registered member, you have exclusive access to special online events.</p>
    
      <div className="event-card">
        <h4>Chess Strategies Webinar</h4>
        <div className="event-details">
          <span className="event-date">Date: December 15, 2023</span>
        </div>
        <div className="event-details">
          <span className="event-time">Time: 13:00 - 14:30 PM EST</span>
        </div>
        <p>Join National Master Ricky Wu as he discusses advanced chess strategies. RSVP <a href="#">here</a>.</p>
      </div>
      <div className="event-card">
        <h4>Beginner's Chess Workshop</h4>
        <div className="event-details">
          <span className="event-date">Date: December 28, 2023</span>
        </div>
        <div className="event-details">
          <span className="event-time">Time: 13:00 - 14:30 PM EST</span>
        </div>
        <p>Learn the basics of chess with Grandmaster Jane Smith. RSVP <a href="#">here</a>.</p>
      </div>
    </div>
  );
  
  
  return (
    <div className="homepage-container">

      <div className="main-column">
        <div className="homepage-header">
          <h1>Hello {username }, Welcome to Chess Online Education</h1>
          <p>Learn chess with the best courses and instructors online.</p>
        </div>

        <div className="expert-tips">
          {allUsersInfo}
        </div>

        {user && (
          <div className="event-info">
            {loggedInInfo}
          </div>
        )}

        {user && enrolledCourses.length > 0 && (
          <div className="course-container">
            <h2>Continue Study</h2>
            {enrolledCourses.map(course => (
              <CourseCard 
                key={course._id} 
                course={course} 
                userRole={user.role} 
                isEnrolled={true} 
              />
            ))}
          </div>
        )}
      </div>
      {/* Search column */}
      <div className="search-column">
        <h1>Search Players</h1> {/* Title for the search bars */}
        <p> Search by Usernames or Titles</p>
        <div className="search-bar">
          <SearchBar />
        </div>
        <div className="title-search-bar">
          <TitleSearchBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
