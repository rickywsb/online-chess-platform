import React, { useEffect, useState } from 'react';
import { fetchMyProfile, fetchUserProfile, updateMyProfile } from '../api/profile.js';
import ProfileComponent from '../components/Profile/Profile.js';
import { useParams } from 'react-router-dom';
import './ProfilePage.css';


const ProfilePage = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            console.log('Fetching data...');
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No authentication token found');
                    return;
                }

                let response;
                if (id) {
                    response = await fetchUserProfile(id, token);
                } else {
                    response = await fetchMyProfile(token);
                }

                console.log('Profile data received:', response.data);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Error fetching profile: ' + error.message);
            }
        };

        fetchData();
    }, [id]);

    const isOwner = id ? id === localStorage.getItem('userId') : true;
    const userRole = localStorage.getItem('userRole'); // Assuming user role is stored in localStorage
    const canEdit = localStorage.getItem('token') && (isOwner || userRole === 'admin');

    const handleUpdateProfile = async (newBio, newPhoneNumber) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authentication token found');
                return;
            }

            const updatedProfile = await updateMyProfile({ bio: newBio, phoneNumber: newPhoneNumber }, token);
            setProfile(prevProfile => ({
                ...prevProfile,
                bio: updatedProfile.data.bio,
                phoneNumber: updatedProfile.data.phoneNumber
            }));
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Error updating profile: ' + error.message);
        }
    };

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="container">
            {error ? (
                <div className="error-message">{error}</div>
            ) : profile ? (
                <ProfileComponent 
                    profile={profile} 
                    onUpdate={canEdit ? handleUpdateProfile : null} 
                    isLoggedIn={!!localStorage.getItem('token')}
                    isCurrentUser={isOwner}
                />
            ) : (
                <p className="loading">Loading profile...</p>
            )}
        </div>
    );
};

export default ProfilePage;