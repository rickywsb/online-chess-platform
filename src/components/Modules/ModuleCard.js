// ModuleCard.js
import React, { useState, useEffect } from 'react';
import VideoPlayer from '../VideoPlayer.js'; // Import the VideoPlayer component
import { getVideoById } from '../../api/video.js'; // Adjust the import path as needed
import './ModuleCard.css'; // Ensure you have a CSS file for styling

const ModuleCard = ({ module, onEdit, onDelete }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        if (module.videoId) {
          const videoData = await getVideoById(module.videoId);
          setVideoUrl(videoData.filePath); // Assuming the video URL is stored in filePath field
        } else if (module.videoUrl) {
          setVideoUrl(module.videoUrl); // Directly use the video URL if available
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, [module.videoId, module.videoUrl]);

  return (
    <div className="module-card">
      <h3>{module.title}</h3>
      <p>{module.description}</p>
      {videoUrl && (
        <div className="module-video">
          <VideoPlayer videoUrl={videoUrl} />
        </div>
      )}
      {(userRole === 'admin' || userRole === 'instructor') && (
        <div className="module-actions">
          <button className="edit-button" onClick={() => onEdit(module)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(module._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
