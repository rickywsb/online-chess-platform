import React, { useState } from 'react';
import { addCourse, updateCourse } from '../../api/course.js';

const CourseForm = ({ course, setCourses, closeModal }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    price: course?.price || '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (course) {
        // Update existing course
        response = await updateCourse(course._id, formData);
        setCourses(prevCourses => prevCourses.map(c => c._id === course._id ? response : c));
      } else {
        // Add new course
        response = await addCourse(formData);
        setCourses(prevCourses => [...prevCourses, response]);
      }
      // Reset form
      setFormData({ title: '', description: '', price: '' });
      // Optionally close modal
      if (closeModal) closeModal();
    } catch (error) {
      console.error('Failed to submit course:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleInputChange}
        placeholder="Price"
        required
      />
      <button type="submit">{course ? 'Update' : 'Create'} Course</button>
      <br/>
      {closeModal && (
        <button type="button" onClick={closeModal}>Cancel</button>
      )}
    </form>
  );
};

export default CourseForm;
