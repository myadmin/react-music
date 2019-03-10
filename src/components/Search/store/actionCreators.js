import axios from 'axios';
import * as actionTypes from './actionTypes';

export const getSearchStart = () => ({
    type: actionTypes.GET_START
});

export const getSearchSuccess = (data) => ({
    type: actionTypes.GET_SUCCESS,
    data
});

export const getSearchFailed = () => ({
    type: actionTypes.GET_FAILED,
});

export const getHots = () => {
    return (dispatch) => {
        dispatch(getSearchStart());

        let url = `https://api.pushemail.xyz/search/hot`;
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    dispatch(getSearchSuccess(res.data.result.hots));
                }
            }, () => {
                dispatch(getSearchFailed());
            });
    }
};
