import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getDetailStart = () => ({
    type: actionTypes.GET_DETAIL_START
});

export const getDetailSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_SUCCESS,
    data
});

export const getDetailFail = () => ({
    type: actionTypes.GET_DETAIL_FAIL
});

export const getDetailInfo = (id) => {
    return (dispatch) => {
        dispatch(getDetailStart());

        axios.get(`https://api.pushemail.xyz/playlist/detail?id=${id}`)
            .then(res => {
                if (res.status === 200) {
                    dispatch(getDetailSuccess(res.data));
                }
            })
            .catch(err => {
                if (err) {
                    dispatch(getDetailFail());
                }
            });
    }
}