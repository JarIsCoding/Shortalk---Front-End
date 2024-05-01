//Local Storage Functions

//Favorites
export const saveToLocalStorage = (city : string, country : string) => {

    let favorites = getlocalStorage();
    let location = city + ", " + country;
    if (!favorites.includes(location)) {
        favorites.push(location);
    }

    localStorage.setItem("Weather Favorites", JSON.stringify(favorites));
}

export const getlocalStorage= ():string[]  => {

    let localStorageData = localStorage.getItem("Weather Favorites");

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);

}

export const removeFromLocalStorage = (city : string, country : string) => {

    let favorites = getlocalStorage();
    let location = city + ", " + country;

    let namedIndex = favorites.indexOf(location);

    favorites.splice(namedIndex, 1);

    localStorage.setItem("Weather Favorites", JSON.stringify(favorites))

}