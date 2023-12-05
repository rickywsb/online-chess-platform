// components/PlayerProfile.js
import React from 'react';

const PlayerProfile = ({ playerData }) => {
    return (
        <div>
            <img src={playerData.avatar} alt={`${playerData.username}'s avatar`} />
            <h2>{playerData.name} ({playerData.username})</h2>
            <p>Title: {playerData.title}</p>
            <p>Followers: {playerData.followers}</p>
            <p>Country: {playerData.country}</p>
            <p>Location: {playerData.location}</p>
            <p>Status: {playerData.status}</p>
            {/* Add more fields as needed */}
        </div>
    );
};

export default PlayerProfile;
