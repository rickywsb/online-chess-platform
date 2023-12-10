import React from 'react';
import { Link } from 'react-router-dom';
import { enrollInCourse, getEnrolledStudents } from '../../api/course.js'; 
import { useState, useEffect } from 'react';
import './CourseCard.css';

const CourseCard = ({ course, onEdit, onDelete, userRole, isEnrolled }) => {
  const handleEnroll = async () => {
    try {
      await enrollInCourse(course._id);
      alert('Enrolled successfully!');
    } catch (error) {
      console.error('Failed to enroll:', error);
      alert('Failed to enroll in course.');
    }
  };

  const [enrolledStudents, setEnrolledStudents] = useState([]);

useEffect(() => {
  const fetchEnrolledStudents = async () => {
    try {
      const students = await getEnrolledStudents(course._id);
      setEnrolledStudents(students);
    } catch (error) {
      console.error('Error fetching enrolled students:', error);
    }
  };

  fetchEnrolledStudents();
}, [course._id]);

  const canViewModules = userRole === 'admin' || userRole === 'instructor' || isEnrolled;


  return (
    <div className="course-details-container">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-subtitle">{course.description}</p>
      <div className="course-footer">
        <span className="course-price">${course.price}</span>

        

         {/* 显示查看模块按钮 */}
         {canViewModules && (
          <div className="course-enrollment-status">
           
            <Link to={`/courses/${course._id}/modules`} className="view-modules-button">
              View Modules
            </Link>
            <p className="enrollment-notice">You are already enrolled in this course.</p>
          </div>
        )}


        {/* 学生角色的按钮 */}
        {userRole === 'student' && !isEnrolled && (
          <button className="enroll-button" onClick={handleEnroll}>Enroll Now</button>
        )}

        {/* 教师和管理员角色的按钮 */}
        {(userRole === 'instructor' || userRole === 'admin') && (
          <>
            <button className="edit-button" onClick={() => onEdit(course)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(course._id)}>Delete</button>
          </>
        )}
      </div>
      <div className="enrolled-students">
      <h4>Coursemates</h4>
      <ul>
        {enrolledStudents.map(student => (
          <li key={student._id}>
            <Link to={`/profile/${student._id}`}>{student.username}</Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default CourseCard;