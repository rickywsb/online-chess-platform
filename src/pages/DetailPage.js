import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayerProfile, followPlayer, unfollowPlayer, getFollowers, getComments, addComment } from '../api/chessApi';
import PlayerProfile from '../components/PlayerProfile';

const DetailPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const data = await getPlayerProfile(username);
        setPlayerData(data);

        const followersData = await getFollowers(username);
        setFollowers(followersData.data);

        const commentsData = await getComments(username);
        setComments(commentsData.data);
      } catch (err) {
        setError('Player not found or an error occurred.');
      }
    };

    fetchPlayerData();
  }, [username]);

  const handleFollow = async () => {
    await followPlayer(username);
    const updatedFollowers = await getFollowers(username);
    setFollowers(updatedFollowers.data);
  };

  const handleUnfollow = async () => {
    await unfollowPlayer(username);
    const updatedFollowers = await getFollowers(username);
    setFollowers(updatedFollowers.data);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddComment = async () => {
    if (newComment) {
      await addComment(username, newComment);
      setNewComment('');
      const updatedComments = await getComments(username);
      setComments(updatedComments.data);
    }
  };

  return (
    <div>
      <button onClick={handleBack}>Back</button>
      <h1>Player Detail</h1>
      {error && <p>{error}</p>}
      {playerData && <PlayerProfile playerData={playerData} />}
      <button onClick={handleFollow} style={{ marginRight: '10px' }}>Follow</button>

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

      <h2>Comments</h2>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>
            {comment.user.username}: {comment.comment}
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment"
        />
        <br/>
        <button onClick={handleAddComment}>Comment</button>
      </div>
    </div>
  );
};

export default DetailPage;
