import React, { useEffect, useState } from 'react';
import { fetchMyProfile, fetchUserProfile, updateMyProfile } from '../api/profile.js';
import ProfileComponent from '../components/Profile/Profile.js';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    // 获取当前登录用户的 ID
    const currentUserId = localStorage.getItem('userId');
    const isLoggedIn = !!currentUserId; // 用户是否登录
    const isCurrentUser = id ? id === currentUserId : true; // 是否查看当前用户的资料

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data...');
            try {
                const token = localStorage.getItem('token');
                let response;
                if (id) {
                    // 如果有 id 参数，获取特定用户的资料
                    response = await fetchUserProfile(id, token);
                } else {
                    // 否则，获取当前登录用户的资料
                    response = await fetchMyProfile(token);
                }
                console.log('Profile data received:', response.data);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error fetching profile');
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateProfile = async (newBio, newPhoneNumber) => {
      try {
          const token = localStorage.getItem('token');
          const updatedProfile = await updateMyProfile({ bio: newBio, phoneNumber: newPhoneNumber }, token);
          
          // 使用回调函数来确保状态更新后的操作
          setProfile(prevProfile => ({
              ...prevProfile,
              bio: updatedProfile.data.bio, // 确保使用从响应中获取的数据
              phoneNumber: updatedProfile.data.phoneNumber
          }));
      } catch (error) {
          console.error('Error updating profile:', error);
      }
  };
  

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            {profile ? (
                <ProfileComponent 
                    profile={profile} 
                    onUpdate={handleUpdateProfile} 
                    isLoggedIn={isLoggedIn}
                    isCurrentUser={isCurrentUser}
                />
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;
