import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, updateUserRole } from '../api/admin';

const AdminPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    console.log('User role:', role); // 调试输出

    if (role !== 'admin') {
        console.log('Redirecting to home, not an admin'); // 调试输出

      navigate('/');
    } else {
      loadUsers();
    }
  }, [navigate]);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      loadUsers(); // 重新加载用户列表以反映更改
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <select value={user.role} onChange={(e) => handleChangeRole(user._id, e.target.value)}>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
