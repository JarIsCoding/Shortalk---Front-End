// components/Player.js

import { useState } from "react";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      {isPlaying &&
        <audio
          src="/Audio/MainMenuMusic.mp3"
          controls={false}
          autoPlay={isPlaying}
        />
      }
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Player;
