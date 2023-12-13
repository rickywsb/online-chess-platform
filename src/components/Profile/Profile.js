import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6

const ProfileComponent = ({ profile, onUpdate,  isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(profile.bio);
  const [newPhoneNumber, setNewPhoneNumber] = useState(profile.phoneNumber);


  const navigate = useNavigate();

  const handleCourseClick = (courseId) => {
   

   
    navigate(`/courses/${courseId}/modules`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(newBio, newPhoneNumber);
    setEditMode(false); // 关闭编辑模式
  };

  return (
    <div >
      <h1>Profile</h1>
      <div className="profile-info">
        <span>Username:</span> {profile.username}
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div className="profile-info">
            <label>Bio:</label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </div>
          <div className="profile-info">
            <label>Phone Number:</label>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </div>
          <button className="button" type="submit">Save Changes</button>
          <button className="button" type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <div className="profile-info">
            <span>Bio:</span> {profile.bio || 'N/A'}
          </div>
          <div className="profile-info">
            <span>Phone Number:</span> {profile.phoneNumber}
          </div>
          {isCurrentUser && <button className="button" onClick={() => setEditMode(true)}>Edit Profile</button>}
        </>
      )}
  
      { isCurrentUser && (
        <div className="profile-info email">
          <span>Email:</span> {profile.email}
        </div>
      )}
  
      <div>
        <h2>{profile.role === 'instructor' ? 'Teaching Courses' : 'Purchased Courses'}</h2>
        <ul className="list">
            {Array.isArray(profile.courses) && profile.courses.length > 0 ? (
              profile.courses.map(course => (
                <li key={course._id} className="list-item">
                  <button className="button" onClick={() => handleCourseClick(course._id)}>
                    {course.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No purchased courses.</p>
            )}
        </ul>
      </div>
    </div>
  );
  
    
};

export default ProfileComponent;