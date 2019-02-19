import axios from 'axios';
import * as actionTypes from './actionTypes';

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

export const saveSingerDetail = (item) => ({
    type: actionTypes.SAVE_DETAIL,
    item
});


export const getSingerDetail = (id) => {
    return (dispatch) => {
        dispatch(getDetailStart());

        let url = `https://api.pushemail.xyz/artists?id=${id}`;
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data);
                    // console.log(res.data.list.artists)
                    dispatch(getDetailSuccess(res.data));
                }
            }, () => {
                dispatch(getDetailFailed());
            });
    }
};
