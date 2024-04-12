import { useAppContext } from '@/context/Context';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  initialTime: number; // Initial time in seconds
}

const Timer = ({ initialTime }: TimerProps) => {

  const {isTimeUp, setIsTimeUp} = useAppContext();

  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);
    if(time == 0){
      setIsTimeUp(true)
    }
    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0');
    const ss = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${ss}`;
  };

  return (
    <div>{"Time: " + formatTime(time)}</div>
  );
};

export default Timer;
