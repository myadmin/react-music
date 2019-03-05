import * as actionTypes from './actionTypes';
import { playMode } from '../../../common/config';
import { shuffle } from '../../../common/util';

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

export const currentSong = (currentSong) => ({
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
});

export const randomPlay = list => {
    return dispatch => {
        dispatch(mode(playMode.random));
        dispatch(sequenceList(list));
        let randomList = shuffle(list);
        dispatch(playlist(randomList));
        dispatch(currentIndex(0));
        dispatch(fullScreen(true));
        dispatch(playing(true));
        dispatch(currentSong(randomList[0]));
    }
}

function findIndex(list, song) {
    return list.findIndex(item => {
        return item.id === song.id;
    });
}

export const selectPlay = (list, index) => {
    return (dispatch, getState) => {
        // dispatch(settingPlay(list, index, true))
        dispatch(sequenceList(list));
        // 获取当前播放的模式
        let mode = getState().getIn(['player', 'mode']);
        // 如果是随机播放，则需要做将播放列表随机处理
        if(mode === playMode.random) {
            let randomList = shuffle(list);
            dispatch(playlist(randomList));
            index = findIndex(randomList, list[index]);
            dispatch(currentSong(randomList[index]));
        } else {
            dispatch(playlist(list));
            dispatch(currentSong(list[index]));
        }
        dispatch(currentIndex(index));
        dispatch(fullScreen(true));
        dispatch(playing(true));
    }
};

export const setCurrentSong = (index, list) => {
    return dispatch => {
        dispatch(currentIndex(index));
        dispatch(currentSong(list[index]));
    }
};