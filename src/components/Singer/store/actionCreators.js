import axios from 'axios';
import * as actionTypes from './actionTypes';

const HOT_NAME = '热门';
const HOT_SINNER_LEN = 10;

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

export const getSingerList = () => {
    return (dispatch) => {
        dispatch(getListStart());

        let url = `https://api.pushemail.xyz/artist/list?cat=1001`;
        axios.get(url)
            .then(res => {
                if (res.status === 200) {
                    // console.log(res.data.list.artists)
                    dispatch(getListSuccess(_normalizeSinger(res.data.artists)));
                }
            }, () => {
                dispatch(getListFailed());
            });
    }
};

// 数据整理
const _normalizeSinger = (list) => {
    let map = {
        hot: {
            title: HOT_NAME,
            items: [],
            nav: HOT_NAME.toString().substr(0, 1)
        }
    };

    list.forEach((item, index) => {
        if (index < HOT_SINNER_LEN) {
            map.hot.items.push({
                id: item.id,
                name: item.name,
                avatar: item.picUrl.replace(/^http/, 'https'),
            });
        }
        const key = item.albumSize;
        if (!map[key]) {
            map[key] = {
                title: key,
                items: [],
                nav: key.toString()
            }
        }
        map[key].items.push({
            id: item.id,
            name: item.name,
            avatar: item.picUrl.replace(/^http/, 'https')
        });
    });

    // 为了得到有序列表，需要处理map
    let hot = [];
    let ret = [];
    for (let key in map) {
        let val = map[key];
        // console.log(val.title.match(/\d/))
        if (val.title === HOT_NAME) {
            hot.push(val);
        } else {
            ret.push(val);
        }
    }

    ret.sort((a, b) => {
        return a.title - b.title;
    });
    
    return hot.concat(ret);
}