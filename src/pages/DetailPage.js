import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPlayerProfile, followPlayer, unfollowPlayer, getFollowers } from '../api/chessApi';
import PlayerProfile from '../components/PlayerProfile';

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
    <div>
      <h1>Player Detail</h1>
      {error && <p>{error}</p>}
      {playerData && <PlayerProfile playerData={playerData} />}
      <button onClick={handleFollow}>Follow</button>
      <button onClick={handleUnfollow}>Unfollow</button>
      <h2>Followers</h2>
      <ul>
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
