// components/FollowButton.js
import React, { useState, useEffect } from 'react';
import { followPlayer, unfollowPlayer, getFollowers } from '../api/chessApi';

const FollowButton = ({ username }) => {
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        checkIfFollowing();
    }, [username]);

    const checkIfFollowing = async () => {
        setLoading(true);
        try {
            const followers = await getFollowers(username);
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            setIsFollowing(followers.data.some(follower => follower.user._id === userId));
        } catch (error) {
            console.error('Error fetching followers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        setLoading(true);
        try {
            await followPlayer(username);
            setIsFollowing(true);
        } catch (error) {
            console.error('Error following player:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnfollow = async () => {
        setLoading(true);
        try {
            await unfollowPlayer(username);
            setIsFollowing(false);
        } catch (error) {
            console.error('Error unfollowing player:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <button disabled>Loading...</button>;
    }

    return (
        <button onClick={isFollowing ? handleUnfollow : handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
    );
};

export default FollowButton;
