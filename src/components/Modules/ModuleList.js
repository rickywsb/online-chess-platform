import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModuleCard from './ModuleCard';
import ModuleForm from './ModuleForm'; // Ensure you have a ModuleForm component
import { useAuth } from '../../contexts/AuthContext'; // 引入 useAuth 钩子

const ModuleList = ({ courseId }) => {
  const [modules, setModules] = useState([]);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [editingModule, setEditingModule] = useState(null); // State to hold the module being edited
  const { user } = useAuth(); // 使用 useAuth 钩子获取用户数据
  const userRole = user?.role; // 直接访问用户角色
  console.log("Current user role:", userRole);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await axios.get(`/api/modules/course/${courseId}`);
        setModules(response.data);
      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, [courseId]);

  const addModuleToList = (newModule) => {
    setModules(prevModules => [...prevModules, newModule]);
  };

  const updateModuleInList = (updatedModule) => {
    setModules(prevModules => prevModules.map(module => 
      module._id === updatedModule._id ? updatedModule : module
    ));
  };

  const deleteModuleFromList = (moduleId) => {
    setModules(prevModules => prevModules.filter(module => module._id !== moduleId));
  };

  const handleModuleAddition = (moduleData) => {
    addModuleToList(moduleData);
    setShowModuleForm(false); // Close the form after addition
  };

  const handleModuleUpdate = (updatedModule) => {
    updateModuleInList(updatedModule);
    setEditingModule(null); // Reset the editing state
  };

  const handleEdit = (module) => {
    setEditingModule(module); // Set the module to be edited
    setShowModuleForm(true); // Show the form for editing
  };

  const handleDelete = async (moduleId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this module?');
    if (confirmDelete) {
      try {
        await axios.delete(`/api/modules/${moduleId}`);
        deleteModuleFromList(moduleId);
      } catch (error) {
        console.error('Error deleting module:', error);
      }
    }
  };

  return (
    <div className="module-list">
      <h2>Modules</h2>
            {/* 仅当用户是管理员或讲师时显示添加模块按钮 */}
      {(userRole === 'admin' || userRole === 'instructor') && (
            <button onClick={() => { setShowModuleForm(true); setEditingModule(null); }}>Add Module</button>
      )}

      {showModuleForm && (
        <ModuleForm
          courseId={courseId}
          moduleData={editingModule}
          onModuleAddition={handleModuleAddition}
          onModuleUpdate={handleModuleUpdate}
        />
      )}
      {modules.map(module => (
        <ModuleCard
          key={module._id}
          module={module}
          onEdit={() => handleEdit(module)}
          onDelete={() => handleDelete(module._id)}
        />
      ))}
    </div>
  );
};

export default ModuleList;
