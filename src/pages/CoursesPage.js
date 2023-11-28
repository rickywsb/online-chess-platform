import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/Courses/CourseCard';
import CourseForm from '../components/Courses/CourseForm';
import { useAuth } from '../contexts/AuthContext'; // 引入 useAuth 钩子
import '../components/Courses/CoursesPage.css';

axios.defaults.baseURL = 'http://localhost:5001';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const { user } = useAuth(); // 使用 useAuth 钩子获取用户数据
  const userRole = user?.role; // 直接访问用户角色

  console.log("Current user role:", userRole); // 调试信息

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      const response = await axios.post('/api/courses', courseData);
      setCourses(prevCourses => [...prevCourses, response.data]);
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleUpdateCourse = async (id, courseData) => {
    try {
      const response = await axios.patch(`/api/courses/${id}`, courseData);
      setCourses(prevCourses =>
        prevCourses.map(course => (course._id === id ? response.data : course))
      );
      setEditingCourse(null); // Reset editing course
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await axios.delete(`/api/courses/${id}`);
      setCourses(prevCourses =>
        prevCourses.filter(course => course._id !== id)
      );
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const closeEditForm = () => {
    setEditingCourse(null);
  };

  return (
    <div className="courses-container">
      <h1>Courses</h1>
      <p>Here is a list of available courses.</p>
      {userRole === 'instructor' || userRole === 'admin' ? (
        <>
          {!editingCourse && <CourseForm setCourses={setCourses} />}
          {editingCourse && (
            <CourseForm
              course={editingCourse}
              setCourses={setCourses}
              closeModal={closeEditForm}
            />
          )}
        </>
      ) : null}
      <div className="course-list">
        {courses.map(course => (
          <CourseCard
            key={course._id}
            course={course}
            onEdit={userRole === 'instructor' || userRole === 'admin' ? () => setEditingCourse(course) : null}
            onDelete={userRole === 'instructor' || userRole === 'admin' ? () => handleDeleteCourse(course._id) : null}
            userRole={userRole} // 确保传递 userRole
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
