import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'; // Import the CSS file

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleSearch = async () => {
        navigate(`/player/${username}`);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Chess.com username"
                className="search-bar-input"
            />
            <button onClick={handleSearch} className="search-bar-button">
                Search
            </button>
        </div>
    );
};

export default SearchBar;
