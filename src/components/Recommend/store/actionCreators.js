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

        axios.get('https://api-music.leanapp.cn/top/playlist/highquality?limit=20')
            .then(res => {
                if (res.status === 200) {
                    dispatch(getListSuccess(res.data));
                }
            }, () => {
                dispatch(getListFailed());
            });
    }
}
