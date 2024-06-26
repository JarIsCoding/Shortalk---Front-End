import { ICard, IGameInfo, ILobbyRoomBackEnd, ITeamInfo, iGameInfo, iLobbyRoomBackEnd } from "@/Interfaces/Interfaces";


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
    console.log(Team2Info);
    if ((Object.keys(Team1Info).length != 0) && (Object.keys(Team2Info).length != 0)) {
        Team1Info.members.map(member => {
            if ((member.name != '') && !member.readyStatus) {
                return false;
            }
            if (member.name) {
                Team1Counter++;
            }
        })
        Team2Info.members.map(member => {
            if ((member.name != '') && !member.readyStatus) {
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
    if (game.Speaker == userName) {
        return "Speaker";
    }

    let speakerOnTeam1 = false;
    if (
        game.Speaker == game.TeamMemberA1 ||
        game.Speaker == game.TeamMemberA2 ||
        game.Speaker == game.TeamMemberA3 ||
        game.Speaker == game.TeamMemberA4 ||
        game.Speaker == game.TeamMemberA5
    ) { speakerOnTeam1 = true }

    let playerOnTeam1 = false;
    if (
        userName == game.TeamMemberA1 ||
        userName == game.TeamMemberA2 ||
        userName == game.TeamMemberA3 ||
        userName == game.TeamMemberA4 ||
        userName == game.TeamMemberA5
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
        game.TeamMemberA1,
        game.TeamMemberA2,
        game.TeamMemberA3,
        game.TeamMemberA4,
        game.TeamMemberA5,
        game.TeamMemberB1,
        game.TeamMemberB2,
        game.TeamMemberB3,
        game.TeamMemberB4,
        game.TeamMemberB5,
    ]
    for (let player of players) {
        if (player != '') {
            counter++;
        }
    }
    console.log("Turn "+game.Turn);
    console.log("Number of players "+counter);
    const round = Math.ceil(game.Turn / (Math.ceil(counter/2)*2));

    return round;
}

export const determineNumberOfTurns = (game: IGameInfo) => {
    let counter = 0;
    let players = [
        game.TeamMemberA1,
        game.TeamMemberA2,
        game.TeamMemberA3,
        game.TeamMemberA4,
        game.TeamMemberA5,
        game.TeamMemberB1,
        game.TeamMemberB2,
        game.TeamMemberB3,
        game.TeamMemberB4,
        game.TeamMemberB5,
    ]
    for (let player of players) {
        if (player != '') {
            counter++;
        }
    }
    
    return counter*game.NumberOfRounds;
}
export const ConvertLobbyi2I =  (data: iLobbyRoomBackEnd) => {
    let lobby: ILobbyRoomBackEnd = {} as ILobbyRoomBackEnd;
    lobby.LobbyName = data.lobbyName;
    lobby.Host = data.host;
    lobby.NumberOfRounds = data.numberOfRounds;
    lobby.TimeLimit = data.timeLimit;
    lobby.TeamMemberA1 = data.teamMemberA1;
    lobby.TeamMemberA2 = data.teamMemberA2;
    lobby.TeamMemberA3 = data.teamMemberA3;
    lobby.TeamMemberA4 = data.teamMemberA4;
    lobby.TeamMemberA5 = data.teamMemberA5;
    lobby.TeamMemberB1 = data.teamMemberB1;
    lobby.TeamMemberB2 = data.teamMemberB2;
    lobby.TeamMemberB3 = data.teamMemberB3;
    lobby.TeamMemberB4 = data.teamMemberB4;
    lobby.TeamMemberB5 = data.teamMemberB5;
    lobby.ReadyStatusA1 = data.readyStatusA1;
    lobby.ReadyStatusA2 = data.readyStatusA2;
    lobby.ReadyStatusA3 = data.readyStatusA3;
    lobby.ReadyStatusA4 = data.readyStatusA4;
    lobby.ReadyStatusA5 = data.readyStatusA5;
    lobby.ReadyStatusB1 = data.readyStatusB1;
    lobby.ReadyStatusB2 = data.readyStatusB2;
    lobby.ReadyStatusB3 = data.readyStatusB3;
    lobby.ReadyStatusB4 = data.readyStatusB4;
    lobby.ReadyStatusB5 = data.readyStatusB5;

    return lobby;
     

}


export const ConvertLobbyI2i =  (data: ILobbyRoomBackEnd) => {
    let lobby: iLobbyRoomBackEnd = {} as iLobbyRoomBackEnd;

    lobby.lobbyName = data.LobbyName;
    lobby.host = data.Host;
    lobby.numberOfRounds = data.NumberOfRounds;
    lobby.timeLimit = data.TimeLimit;
    lobby.teamMemberA1 = data.TeamMemberA1;
    lobby.teamMemberA2 = data.TeamMemberA2;
    lobby.teamMemberA3 = data.TeamMemberA3;
    lobby.teamMemberA4 = data.TeamMemberA4;
    lobby.teamMemberA5 = data.TeamMemberA5;
    lobby.teamMemberB1 = data.TeamMemberB1;
    lobby.teamMemberB2 = data.TeamMemberB2;
    lobby.teamMemberB3 = data.TeamMemberB3;
    lobby.teamMemberB4 = data.TeamMemberB4;
    lobby.teamMemberB5 = data.TeamMemberB5;
    lobby.readyStatusA1 = data.ReadyStatusA1;
    lobby.readyStatusA2 = data.ReadyStatusA2;
    lobby.readyStatusA3 = data.ReadyStatusA3;
    lobby.readyStatusA4 = data.ReadyStatusA4;
    lobby.readyStatusA5 = data.ReadyStatusA5;
    lobby.readyStatusB1 = data.ReadyStatusB1;
    lobby.readyStatusB2 = data.ReadyStatusB2;
    lobby.readyStatusB3 = data.ReadyStatusB3;
    lobby.readyStatusB4 = data.ReadyStatusB4;
    lobby.readyStatusB5 = data.ReadyStatusB5;

    return lobby;
     

}


export const Converti2I =  (data: iGameInfo) => {
    let game: IGameInfo = {} as IGameInfo;
    game.LobbyName = data.lobbyName;
    game.Host = data.host;
    game.NumberOfRounds = data.numberOfRounds;
    game.TimeLimit = data.timeLimit;
    game.TeamMemberA1 = data.teamMemberA1;
    game.TeamMemberA2 = data.teamMemberA2;
    game.TeamMemberA3 = data.teamMemberA3;
    game.TeamMemberA4 = data.teamMemberA4;
    game.TeamMemberA5 = data.teamMemberA5;
    game.TeamMemberB1 = data.teamMemberB1;
    game.TeamMemberB2 = data.teamMemberB2;
    game.TeamMemberB3 = data.teamMemberB3;
    game.TeamMemberB4 = data.teamMemberB4;
    game.TeamMemberB5 = data.teamMemberB5;
    game.Turn = data.turn;
    game.Speaker = data.speaker;
    game.OnePointWord = data.onePointWord;
    game.ThreePointWord = data.threePointWord;
    game.Team1Score = data.team1Score;
    game.Team2Score =data.team2Score;
    game.OnePointWordHasBeenSaid = data.onePointWordHasBeenSaid;
    game.ThreePointWordHasBeenSaid = data.threePointWordHasBeenSaid;
    game.BuzzWords = data.buzzWords;
    game.SkippedWords = data.skippedWords;
    game.OnePointWords = data.onePointWords;
    game.ThreePointWords = data.threePointWords;

    return game;
     

}

export const String2ICardArray = (wordList: string) => {
    console.log(wordList);
    if(wordList == ''){
        return [];
    }
    const cardStringArray = wordList.split(',')
    const cardArray: ICard[] = [];

    cardStringArray.map( card => {
        const cardSubArray = card.split('-');
        const newCard: ICard = {
            top: cardSubArray[0],
            bottom: cardSubArray[1]
        }
        cardArray.push(newCard);
    })

    return cardArray;
}

export const DetermineInitialTeam = (game: IGameInfo) => {
    let Team1 = [
        game.TeamMemberA1,
        game.TeamMemberA2,
        game.TeamMemberA3,
        game.TeamMemberA4,
        game.TeamMemberA5,
    ]

    for(let player in Team1){
        if(game.Speaker == player)
            return 'Team1';
    }

    return 'Team2';
}

export const DetermineTeam = (teamUp: string) => {
    if(teamUp == "Team1"){
        return "Team2"
    }
    return "Team1"
}

export const determineSpeaker = (game: IGameInfo) => {
    let counter = 0;
    let players = [
        game.TeamMemberA1,
        game.TeamMemberA2,
        game.TeamMemberA3,
        game.TeamMemberA4,
        game.TeamMemberA5,
        game.TeamMemberB1,
        game.TeamMemberB2,
        game.TeamMemberB3,
        game.TeamMemberB4,
        game.TeamMemberB5,
    ]
    for (let player in players) {
        if (player != "") {
            counter++;
        }
    }

    const round = Math.ceil(game.Turn / (Math.ceil(counter/2)*2));

    return round;
}

export const AddUpPoints = (buzzWords: string, onePointWords: string, threePointWords:string ) => {
    return String2ICardArray(onePointWords).length + 3*String2ICardArray(threePointWords).length - String2ICardArray(buzzWords).length
}