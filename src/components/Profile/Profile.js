import React, { useState } from 'react';

const ProfileComponent = ({ profile, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newBio, setNewBio] = useState(profile.bio);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(newBio);
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
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button> {/* 修改这里 */}
        </form>
      ) : (
        <>
          <p>Bio: {profile.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit Bio</button>
        </>
      )}
      {/* 显示已购买的课程 */}
      <div>
        <h2>Purchased Courses</h2>
        <ul>
          {profile.purchasedCourses.map(course => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfileComponent;
