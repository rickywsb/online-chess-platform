import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModuleForm = ({ courseId, moduleData, onModuleAddition, onModuleUpdate }) => {
  const [formData, setFormData] = useState({
    title: moduleData?.title || '',
    description: moduleData?.description || '',
    videoUrl: moduleData?.videoUrl || '',
  });

  // Update form data when editing an existing module
  useEffect(() => {
    if (moduleData) {
      setFormData({
        title: moduleData.title,
        description: moduleData.description,
        videoUrl: moduleData.videoUrl,
      });
    }
  }, [moduleData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (moduleData) {
        // If editing an existing module
        response = await axios.patch(`/api/modules/${moduleData._id}`, formData);
        onModuleUpdate(response.data);
      } else {
        // If adding a new module
        response = await axios.post('/api/modules', { ...formData, courseId });
        onModuleAddition(response.data);
      }
    } catch (error) {
      console.error('Failed to submit module:', error);
      // Handle errors (e.g., display error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Module Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Module Description"
        required
      />
      <input
        type="text"
        name="videoUrl"
        value={formData.videoUrl}
        onChange={handleInputChange}
        placeholder="Video URL"
        required
      />
      <button type="submit">{moduleData ? 'Update' : 'Add'} Module</button>
    </form>
  );
};

export default ModuleForm;
