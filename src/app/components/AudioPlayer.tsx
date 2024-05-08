import React from 'react';
const AudioPlayer = () => {
    return (
        <div>
            <audio controls autoPlay loop className='w-[1000px] hidden'>
                <source src="/Audio/MainMenuMusic.mp3"  type="audio/mp3" />
            </audio>
         </div>

    );
}; 
export default AudioPlayer;
// Player Join - multi - pop
// Quit - finger snap
// Winner - you-win-sequence