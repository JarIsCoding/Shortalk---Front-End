

export function shuffleArray(array: string[]): string[] {
    const newArray = array.slice(); // Create a copy of the original array to avoid modifying it
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements at indices i and j
    }
    return newArray;
}

export function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0'); // Calculate minutes
    const ss = (seconds % 60).toString().padStart(2, '0'); // Calculate seconds
    return `${m}:${ss}`; // Return formatted time
}
