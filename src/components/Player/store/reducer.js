import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import { playMode } from '../../../common/config';

const defaultState = fromJS({
    singer: {},                 //歌曲详情
    playing: false,             //播放状态
    fullScreen: false,          //播放器展开/收起
    playlist: [],               //歌曲列表
    sequenceList: [],           //播放列表
    mode: playMode.sequence,    //播放模式
    currentIndex: -1,           //当前播放索引
    currentSong: {},            //当前播放歌曲
});

export default (state = defaultState, action) => {
    let type = action.type;
    
    switch (type) {
        case actionTypes.SET_PLAYING:
            return state.merge({
                sequenceList: state.get('sequenceList').concat(action.sequenceList),
                playlist: state.get('playlist').concat(action.playlist),
                currentIndex: action.currentIndex,
                fullScreen: action.fullScreen,
                playing: action.playing,
                currentSong: action.currentSong
            });
        case actionTypes.SET_SINGER:
            return state.set('singer', action.singer);
        case actionTypes.SET_PLAYING_STATE:
            return state.set('playing', action.playing);
        case actionTypes.SET_FULL_SCREEN:
            return state.set('fullScreen', action.fullScreen);
        case actionTypes.SET_PLAYLIST:
            let playlist = state.get('playlist').clear();
            return state.merge({
                playlist: playlist.concat(action.playlist)
            });
        case actionTypes.SET_SEQUENCE_LIST:
            let sequenceList = state.get('sequenceList').clear();
            return state.merge({
                sequenceList: sequenceList.concat(action.sequenceList)
            });
        case actionTypes.SET_PLAY_MODE:
            return state.set('mode', action.mode);
        case actionTypes.SET_CURRENT_INDEX:
            return state.set('currentIndex', action.currentIndex);
        case actionTypes.SET_CURRENT_SONG:
            return state.set('currentSong', action.currentSong);
        default:
            return state;
    }
}