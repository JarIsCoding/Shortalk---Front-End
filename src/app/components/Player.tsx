import { useState } from "react";
import Image from 'next/image';
import FilledMusicNote from '@/app/assets/FilledMusicNote.png'
import MusicNote from '@/app/assets/MusicNote.png'




const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    return(
        <Image src={FilledMusicNote} alt="ialPicture" className="w-[40px] h-[40px]"/>  
    )
  };

  return (
    <div>
      {isPlaying &&<audio src="/Audio/MainMenuMusic.mp3" controls={false}autoPlay={isPlaying} />}
      <button onClick={togglePlay}>
        <Image src={MusicNote} alt="MuscialPicture" className="w-[35px] h-[35px]"/>  
   </button>
    </div>
  );
};

export default Player;
