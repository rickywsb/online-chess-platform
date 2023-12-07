// components/SearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './SearchBar.css'; // Import the CSS file

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // Use the useNavigate hook

    const handleSearch = async () => {
        navigate(`/player/${username}`); // Redirect to the detail page with the username
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Chess.com username"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;
