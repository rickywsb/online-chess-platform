import React, { useEffect, useState } from 'react';
import { fetchProfile, fetchUserProfile, updateProfileBio } from '../api/profile.js';
import ProfileComponent from '../components/Profile/Profile.js';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
  
    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data...'); // 确认函数被调用
            try {
              const userId = localStorage.getItem('userId');
              console.log('User ID:', userId); // 打印 userId 的值
              if (!userId) {
                console.error('No userId found');
                setError('No userId found');
                return;
              }
              const response = await fetchProfile(userId);
              console.log('Profile data received:', response.data);
              setProfile(response.data);
            } catch (error) {
              console.error('Error fetching profile:', error);
              setError('Error fetching profile');
            }
          };
          
  
      fetchData();
    }, []);
    const handleUpdateBio = async (newBio) => {
        try {
          const userId = localStorage.getItem('userId');
          const token = localStorage.getItem('token');
      
          // 调用 updateProfileBio 函数
          const updatedProfile = await updateProfileBio(userId, newBio, token);
      
          // 更新本地状态
          setProfile({ ...profile, bio: updatedProfile.bio });
        } catch (error) {
          console.error('Error updating profile:', error);
          // 可以在这里处理错误，例如显示错误消息
        }
      };
      
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
      <div>
        {profile ? (
            <ProfileComponent profile={profile} onUpdate={handleUpdateBio} />
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    );
  };
  
  export default ProfilePage;
  