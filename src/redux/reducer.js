import { actionType } from "./actionType";
import { songs } from '../songs';

const nextSongFuction = (song) => {
    let currentIndex = songs.indexOf(song);
    let nextIndex = (currentIndex + 1)% songs.length;
    return songs[nextIndex];
}

const previousSongFuction = (song) => {
    let currentIndex = songs.indexOf(song);
    let previousIndex = (currentIndex -1 < 0) ? songs.length-1: currentIndex -1;
    return songs[previousIndex];
}

const INITIAL_STATE = {
    currentSong: songs[0],
    duration:0,
    currentTime:0,
    nextSong: songs[1],
    isPlaying: false
}

export const playerControlReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case actionType.FORWARD:
            return {...state, currentSong: nextSongFuction(state.currentSong), nextSong: nextSongFuction(state.nextSong)}
        case actionType.BACKWARD:
            return {...state, currentSong: previousSongFuction(state.currentSong), nextSong: state.currentSong}
        case actionType.TOGGLE:
            return {...state,isPlaying:!state.isPlaying}
        case actionType.SETCURRENTTIME:
            return {...state, currentTime:action.payload }
        case actionType.SETDURATION:
            return {...state, duration:action.payload }
        default:
            return state;
    }
}

