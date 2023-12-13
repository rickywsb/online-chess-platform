import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayersByTitle } from '../api/chessApi';
import TitleSearchBar from '../components/TitleSearchBar'; // 引入 TitleSearchBar 组件
const TitlePlayersPage = () => {
    const { title } = useParams();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                let savedPlayers = sessionStorage.getItem(`players-${title}`);
                if (!savedPlayers) {
                    const playerUsernames = await getPlayersByTitle(title);
                    savedPlayers = JSON.stringify(playerUsernames);
                    sessionStorage.setItem(`players-${title}`, savedPlayers);
                }
                setPlayers(JSON.parse(savedPlayers));
            } catch (error) {
                console.error('Error fetching players by title:', error);
            }
        };

        fetchPlayers();
    }, [title]);

    const handleTitleChange = (newTitle) => {
        sessionStorage.removeItem(`players-${title}`);
        navigate(`/title/${newTitle}`);
    };

    return (
        <div>
            <TitleSearchBar onTitleChange={handleTitleChange} />
            <h1>{title} Players</h1>
            <ul>
                {players.map((username) => (
                    <li key={username}>
                        <Link to={`/player/${username}`}>{username}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TitlePlayersPage;
