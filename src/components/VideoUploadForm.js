// VideoUploadForm.js
import React, { useState } from 'react';
import axios from 'axios';

const VideoUploadForm = ({ courseId }) => {
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('title', 'Your Video Title'); // Replace with actual title input if needed
    formData.append('description', 'Your Video Description'); // Replace with actual description input if needed
    formData.append('courseId', courseId);

    try {
      await axios.post('/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Handle success (e.g., show a message, refresh the list of videos)
    } catch (error) {
      console.error('Error uploading video:', error);
      // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default VideoUploadForm;
