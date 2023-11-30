import React from 'react';
import { Link } from 'react-router-dom';
import { enrollInCourse } from '../../api/course.js'; 
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

  const canViewModules = userRole === 'admin' || userRole === 'instructor' || isEnrolled;


  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-footer">
        <span className="course-price">${course.price}</span>

        

         {/* 显示查看模块按钮 */}
         {canViewModules && (
          <Link to={`/courses/${course._id}/modules`} className="view-modules-button">
            View Modules
          </Link>
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
    </div>
  );
};

export default CourseCard;
