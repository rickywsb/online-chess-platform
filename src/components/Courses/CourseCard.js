import React from 'react';
import { Link } from 'react-router-dom';
import './CourseCard.css';

const CourseCard = ({ course, onEdit, onDelete, userRole }) => {
  return (
    <div className="course-card">
      <h3 className="course-title">{course.title}</h3>
      <p className="course-description">{course.description}</p>
      <div className="course-footer">
        <span className="course-price">${course.price}</span>

        {/* 学生角色的按钮 */}
        {userRole === 'student' && (
          <>
            <Link to={`/courses/${course._id}/modules`} className="view-modules-button">
              View Modules
            </Link>
            <button className="enroll-button">Enroll Now</button>
          </>
        )}

        {/* 教师和管理员角色的按钮 */}
        {(userRole === 'instructor' || userRole === 'admin') && (
          <>
            <button className="edit-button" onClick={() => onEdit(course)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(course._id)}>Delete</button>
            <Link to={`/courses/${course._id}/modules`} className="view-modules-button">
              View Modules
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
