import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getListStart = () => ({
    type: actionTypes.GET_START
});

export const getListSuccess = (data) => ({
    type: actionTypes.GET_SUCCESS,
    data
});

export const getListFailed = () => ({
    type: actionTypes.GET_FAILED,
});

export const getList = () => {
    return (dispatch) => {
        dispatch(getListStart());

        let url = `https://api.pushemail.xyz/toplist/detail`;
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    dispatch(getListSuccess(replaceImage(res.data.list)));
                }
            }, () => {
                dispatch(getListFailed());
            });
    }
};

function replaceImage (arrImages) {
    let ret = [];
    arrImages.forEach(element => {
        if (element.tracks.length) {
            element.coverImgUrl = element.coverImgUrl.replace(/^http/, 'https');
            ret.push(element);
        }
    });

    return ret;
}