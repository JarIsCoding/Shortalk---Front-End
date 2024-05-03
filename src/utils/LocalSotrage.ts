// Session Storage Functions

// Favorites
export const saveToSessionStorage = (city: string, country: string) => {
    let favorites = getSessionStorage();
    let location = city + ", " + country;
    if (!favorites.includes(location)) {
        favorites.push(location);
    }

    sessionStorage.setItem("Weather Favorites", JSON.stringify(favorites));
}

export const getSessionStorage = (): string[] => {
    let sessionStorageData = sessionStorage.getItem("Weather Favorites");

    if (sessionStorageData == null) {
        return [];
    }

    return JSON.parse(sessionStorageData);
}

export const removeFromSessionStorage = (city: string, country: string) => {
    let favorites = getSessionStorage();
    let location = city + ", " + country;

    let namedIndex = favorites.indexOf(location);

    favorites.splice(namedIndex, 1);

    sessionStorage.setItem("Weather Favorites", JSON.stringify(favorites));
}
