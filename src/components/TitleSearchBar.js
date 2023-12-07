import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleSearchBar.css'; // Import the CSS file

const titles = ['GM', 'WGM', 'IM', 'WIM', 'FM', 'WFM', 'NM', 'WNM', 'CM', 'WCM'];

const TitleSearchBar = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleTitleSearch = async () => {
        if (title) {
            navigate(`/title/${title}`);
        }
    };

    return (
        <div className="title-search-bar-container">
            <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="title-search-bar-select"
            >
                <option value="">Select a title</option>
                {titles.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
            <button
                onClick={handleTitleSearch}
                className="title-search-bar-button"
            >
                Search
            </button>
        </div>
    );
};

export default TitleSearchBar;
