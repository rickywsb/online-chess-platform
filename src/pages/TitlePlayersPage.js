import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPlayersByTitle } from '../api/chessApi';
import TitleSearchBar from '../components/TitleSearchBar'; // 引入 TitleSearchBar 组件

const TitlePlayersPage = () => {
    const { title } = useParams();
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // 尝试从 sessionStorage 获取保存的搜索结果
        const savedPlayers = sessionStorage.getItem(`players-${title}`);
        if (savedPlayers) {
            setPlayers(JSON.parse(savedPlayers));
        } else {
            fetchPlayers();
        }
    }, [title]);

    const fetchPlayers = async () => {
        try {
            const playerUsernames = await getPlayersByTitle(title);
            setPlayers(playerUsernames);
            // 将搜索结果保存到 sessionStorage
            sessionStorage.setItem(`players-${title}`, JSON.stringify(playerUsernames));
        } catch (error) {
            console.error('Error fetching players by title:', error);
        }
    };

    const handleTitleChange = (newTitle) => {
        // 在新搜索时清除之前的保存结果
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
