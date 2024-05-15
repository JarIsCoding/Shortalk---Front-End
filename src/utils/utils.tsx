import { IGameInfo, ITeamInfo } from "@/Interfaces/Interfaces";


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

export function formatTimeMinutesAndSeconds(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(1, '0'); // Calculate minutes
    const ss = (seconds % 60).toString().padStart(2, '0'); // Calculate seconds
    return { m, ss }; // Return formatted time
}

export function reverseFormatTime(minutes: number, seconds: number): number {
    const totalSeconds = minutes * 60 + seconds; // Calculate total seconds
    return totalSeconds; // Return total seconds
}


export const renderOptions = (minNum: number, maxNum: number, ifSeconds: boolean) => {
    const renderedOptions = [];
    for (let i = minNum; i <= maxNum; i++) {
        renderedOptions.push(<option key={i} value={i}>{ifSeconds ? String(i).padStart(2, '0') : i}</option>)
    }
    return renderedOptions;
}


export const checkIfPlayersAreReady = (Team1Info: ITeamInfo, Team2Info: ITeamInfo) => {

    // console.log("Team1Info: "+JSON.stringify(Team1Info));
    // console.log("Team2Info: "+JSON.stringify(Team2Info));

    let Team1Counter = 0;
    let Team2Counter = 0;
    //Object.keys(obj).length === 0
    console.log(Team1Info);
    if ((Object.keys(Team1Info).length != 0) && (Object.keys(Team2Info).length != 0)) {
        Team1Info.members.forEach(member => {
            if (member.name && !member.readyStatus && (member.name != Team1Info.host)) {
                return false;
            }
            if (member.name) {
                Team1Counter++;
            }
        })
        Team2Info.members.forEach(member => {
            if (member.name && !member.readyStatus && (member.name != Team2Info.host)) {
                return false;
            }
            if (member.name) {
                Team2Counter++;
            }
        })
    } else {
        return false
    }


    if (Team1Counter < 2 || Team2Counter < 2) {
        return false
    }

    // console.log("Team1Counter: "+Team1Counter);
    // console.log("Team2Counter: "+Team2Counter);
    return true;
}

export const determineRole = (userName: string, game: IGameInfo) => {
    if (game.speaker == userName) {
        return "Speaker";
    }

    let speakerOnTeam1 = false;
    if (
        game.speaker == game.teamMemberA1 ||
        game.speaker == game.teamMemberA2 ||
        game.speaker == game.teamMemberA3 ||
        game.speaker == game.teamMemberA4 ||
        game.speaker == game.teamMemberA5
    ) { speakerOnTeam1 = true }

    let playerOnTeam1 = false;
    if (
        userName == game.teamMemberA1 ||
        userName == game.teamMemberA2 ||
        userName == game.teamMemberA3 ||
        userName == game.teamMemberA4 ||
        userName == game.teamMemberA5
    ) { playerOnTeam1 = true }

    if (speakerOnTeam1 == playerOnTeam1) {
        return "Guesser"
    } else {
        return "Defense"
    }

}

export const determineRound = (game: IGameInfo) => {
    let counter = 0;
    let players = [
        game.teamMemberA1,
        game.teamMemberA2,
        game.teamMemberA3,
        game.teamMemberA4,
        game.teamMemberA5,
        game.teamMemberB1,
        game.teamMemberB2,
        game.teamMemberB3,
        game.teamMemberB4,
        game.teamMemberB5,
    ]
    for (let player in players) {
        if (player != "") {
            counter++;
        }
    }

    const round = Math.ceil(game.turn / (Math.ceil(counter/2)*2));

    return round;
}