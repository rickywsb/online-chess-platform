import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api/modules';

// 获取特定课程的所有模块
export const getModulesByCourseId = async (courseId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/course/${courseId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 添加新模块
export const addModule = async (moduleData) => {
  try {
    const response = await axios.post(API_BASE_URL, moduleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 更新模块信息
export const updateModule = async (moduleId, moduleData) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/${moduleId}`, moduleData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 删除模块
export const deleteModule = async (moduleId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${moduleId}`);
    return { message: 'Module deleted successfully.' };
  } catch (error) {
    throw error;
  }
};
