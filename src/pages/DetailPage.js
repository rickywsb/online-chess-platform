import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlayerProfile, followPlayer, unfollowPlayer, getFollowers } from '../api/chessApi';
import PlayerProfile from '../components/PlayerProfile';
import './DetailPage.css';

const DetailPage = () => {
  const { username } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await getPlayerProfile(username);
        setPlayerData(data);
        const followersData = await getFollowers(username);
        setFollowers(followersData.data);
      } catch (err) {
        setError('Player not found or an error occurred.');
      }
    };

    fetchPlayerData();
  }, [username]);

  const handleFollow = async () => {
    await followPlayer(username);
    // Re-fetch followers
    const updatedFollowers = await getFollowers(username);
    setFollowers(updatedFollowers.data);
  };

  const handleUnfollow = async () => {
    await unfollowPlayer(username);
    // Re-fetch followers
    const updatedFollowers = await getFollowers(username);
    setFollowers(updatedFollowers.data);
  };
  return (
    <div className="detail-container">
      <h1>Player Detail</h1>
      {error && <p className="error-message">{error}</p>}
      {playerData && <PlayerProfile playerData={playerData} />}
      
      <div className="player-buttons">
        <button onClick={handleFollow} className="button">Follow</button>
        <button onClick={handleUnfollow} className="button">Unfollow</button>
      </div>

      <h2>Followers</h2>
      <ul className="followers-list">
        {followers.map(follower => (
          <li key={follower._id}>
            <Link to={`/profile/${follower.user._id}`}>
              {follower.user.username}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailPage;