// components/TitleSearchBar.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TitleSearchBar.css';
const titles = ['GM', 'WGM', 'IM', 'WIM', 'FM', 'WFM', 'NM', 'WNM', 'CM', 'WCM'];

const TitleSearchBar = () => {
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const handleTitleSearch = async () => {
        if (title) {
            navigate(`/title/${title}`); // Redirect to a page showing list of players with the selected title
        }
    };

    return (
        <div>
            <select value={title} onChange={(e) => setTitle(e.target.value)}>
                <option value="">Select a title</option>
                {titles.map((t) => (
                    <option key={t} value={t}>{t}</option>
                ))}
            </select>
            <button onClick={handleTitleSearch}>Search</button>
        </div>
    );
};

export default TitleSearchBar;
