import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ModuleList from '../components/Modules/ModuleList.js';
import ModuleForm from '../components/Modules/ModuleForm.js';
import { getModulesByCourseId } from '../api/modules.js'; // 假设你有这样的API函数

const CourseModulesPage = () => {
  const { courseId } = useParams();
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchModules = async () => {
      try {
        setLoading(true);
        const fetchedModules = await getModulesByCourseId(courseId);
        setModules(fetchedModules);
      } catch (error) {
        console.error('Error fetching modules:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [courseId]);

  const handleModuleAddition = (newModule) => {
    setModules([...modules, newModule]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Modules for Course {courseId}</h1>
      {/* <ModuleForm onModuleAddition={handleModuleAddition} courseId={courseId} /> */}
      
      <ModuleList modules={modules} courseId={courseId} />
    </div>
  );
};

export default CourseModulesPage;
