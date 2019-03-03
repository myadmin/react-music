import * as actionTypes from './actionTypes';

export const singer = singer => ({
    type: actionTypes.SET_SINGER,
    singer
});

export const playing = playing => ({
    type: actionTypes.SET_PLAYING_STATE,
    playing
});

export const fullScreen = fullScreen => ({
    type: actionTypes.SET_FULL_SCREEN,
    fullScreen
});

export const playlist = playlist => ({
    type: actionTypes.SET_PLAYLIST,
    playlist
});

export const sequenceList = sequenceList => ({
    type: actionTypes.SET_SEQUENCE_LIST,
    sequenceList
});

export const mode = mode => ({
    type: actionTypes.SET_PLAY_MODE,
    mode
});

export const currentIndex = currentIndex => ({
    type: actionTypes.SET_CURRENT_INDEX,
    currentIndex
});

export const currentSong = currentSong => ({
    type: actionTypes.SET_CURRENT_SONG,
    currentSong: currentSong || {}
});

export const settingPlay = (list, index, iTag) => ({
    type: actionTypes.SET_PLAYING,
    sequenceList: list,
    playlist: list,
    currentIndex: index,
    fullScreen: iTag,
    playing: iTag,
    currentSong: list[index] || {}
})

export const selectPlay = (list, index) => {
    return (dispatch) => {
        dispatch(settingPlay(list, index, true))
        // dispatch(sequenceList(list));
        // dispatch(playlist(list));
        // dispatch(currentIndex(index));
        // dispatch(fullScreen(true));
        // dispatch(playing(true));
        // dispatch(currentSong(list, index));
    }
}

export const setCurrentSong = index => {
    return (dispatch, getState) => {
        let state = getState();
        let list = state.getIn(['player', 'playlist'])
        dispatch(currentIndex(index));
        dispatch(currentSong(list.get(index)));
    }
}