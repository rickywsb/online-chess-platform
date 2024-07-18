// CourseModulesPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModuleList from '../components/Modules/ModuleList.js';
import { getModulesByCourseId } from '../api/modules.js';
import { getCourseById } from '../api/course.js'; // Import the getCourseById function
import './CourseModulesPage.css'; // Import the CSS file

const CourseModulesPage = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseAndModules = async () => {
      try {
        setLoading(true);
        
        // Fetch course details
        const course = await getCourseById(courseId);
        setCourseName(course.name);

        // Fetch modules
        const fetchedModules = await getModulesByCourseId(courseId);
        setModules(fetchedModules);
      } catch (error) {
        console.error('Error fetching course or modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndModules();
  }, [courseId]);

  const handleModuleAddition = (newModule) => {
    setModules([...modules, newModule]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-modules-page">
      <h1>Modules for Course: {courseName}</h1>
      <ModuleList modules={modules} courseId={courseId} />
    </div>
  );
};

export default CourseModulesPage;
