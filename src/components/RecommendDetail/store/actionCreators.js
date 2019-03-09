import axios from 'axios';
import * as actionTypes from './actionTypes';
import { createSong } from '../../../common/song';

export const getDetailStart = () => ({
    type: actionTypes.GET_START
});

export const getDetailSuccess = (data) => ({
    type: actionTypes.GET_SUCCESS,
    data
});

export const getDetailFailed = () => ({
    type: actionTypes.GET_FAILED,
});

export const saveRecommentDetail = disc => ({
    type: actionTypes.SAVE_DETAIL,
    disc
});

export const getRecommendDetail = (id) => {
    return (dispatch) => {
        dispatch(getDetailStart());

        let url = `https://api.pushemail.xyz/playlist/detail?id=${id}`;
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    let songs = _normalizeSongs(res.data.playlist.tracks);
                    dispatch(getDetailSuccess(songs));
                }
            }, () => {
                dispatch(getDetailFailed());
            });
    }
};

function _normalizeSongs (list) {
    let ret = [];
    list.forEach(item => {
        if (item.id && item.al.pic_str) {
            ret.push(createSong(item));
        }
    });
    return ret;
}
