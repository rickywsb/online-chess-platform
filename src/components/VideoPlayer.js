// VideoPlayer.js
import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className='player-wrapper'>
      <ReactPlayer
        url={videoUrl}
        className='react-player'
        width='100%'
        height='100%'
        controls // This will provide play/pause, volume, and fullscreen controls
      />
    </div>
  );
};

export default VideoPlayer;
