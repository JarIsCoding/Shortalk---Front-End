import { useState } from "react";
import Image from 'next/image';
import MusicalNotePic from '@/app/assets/MusicalNotePic.png'


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
      <button onClick={togglePlay}>
        <Image src={MusicalNotePic} alt="MuscialPicture" className="w-[40px] h-[40px]"/>  
   </button>
    </div>
  );
};

export default Player;
