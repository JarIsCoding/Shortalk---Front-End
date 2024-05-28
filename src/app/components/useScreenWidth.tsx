'use client'

import { useState, useEffect } from 'react';

const useScreenWidth = (minWidth: number): boolean => {
    const [isWide, setIsWide] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth > minWidth
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(min-width: ${minWidth}px)`);

        const handleResize = (event: MediaQueryListEvent) => {
            setIsWide(event.matches);
        };

        // Initial check
        setIsWide(mediaQuery.matches);

        // Add listener
        mediaQuery.addEventListener('change', handleResize);

        // Cleanup listener on component unmount
        return () => {
            mediaQuery.removeEventListener('change', handleResize);
        };
    }, [minWidth]);

    return isWide;
}

export default useScreenWidth