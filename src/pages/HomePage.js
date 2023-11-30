import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/Courses/CourseCard'; // 确保路径正确
import { getEnrolledCourses } from '../api/course'; // 引入 getEnrolledCourses 函数

const HomePage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth(); // 使用 useAuth 钩子获取用户数据

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const courses = await getEnrolledCourses(user._id);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to Chess Online Education</h1>
      <p>Learn chess with the best courses and instructors online.</p>

      {user && enrolledCourses.length > 0 && (
        <div>
          <h2>Continue Study</h2>
          <div>
          {enrolledCourses.map(course => (
            <CourseCard 
              key={course._id} 
              course={course} 
              userRole={user.role} 
              isEnrolled={true} 
            />
          ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
