import React, { useState } from 'react';

const ProfileComponent = ({ profile, onUpdate, isLoggedIn, isCurrentUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(profile.bio);
  const [newPhoneNumber, setNewPhoneNumber] = useState(profile.phoneNumber);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(newBio, newPhoneNumber);
    setEditMode(false); // 关闭编辑模式
  };

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {profile.username}</p>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Bio:</label>
            <textarea
              value={newBio}
              onChange={(e) => setNewBio(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </form>
      ) : (
        <>
          <p>Bio: {profile.bio}</p>
          <p>Phone Number: {profile.phoneNumber}</p>
          {isCurrentUser && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
        </>
      )}

      {/* 显示敏感信息，仅当用户查看自己的资料时 */}
      {isLoggedIn && isCurrentUser && (
        <div>
          <p>Email: {profile.email}</p>
        </div>
      )}

      {/* 根据用户角色显示已购买的课程或教授的课程 */}
      <div>
        <h2>{profile.role === 'instructor' ? 'Teaching Courses' : 'Purchased Courses'}</h2>
        <ul>
        {
            Array.isArray(profile.courses) && profile.courses.length > 0 ? (
              profile.courses.map(course => (
                <li key={course._id}>{course.title}</li>
              ))
            ) : (
              <p>No purchased courses.</p>
            )
        }



        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
