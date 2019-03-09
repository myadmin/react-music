import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    songs: [],
    type: -1,
    disc: {},
});

export default (state = defaultState, action) => {
    if (action.type === actionTypes.GET_START) {
        return state.set('type', 0);
    }

    if (action.type === actionTypes.GET_SUCCESS) {
        return state.merge({
            songs: action.data,
            type: 1
        });
    }

    if (action.type === actionTypes.SAVE_DETAIL) {
        action.disc.avatar = action.disc.picUrl;
        return state.set('disc', action.disc);
    }

    if (action.type === actionTypes.GET_FAILED) {
        return state.set('type', 2);
    }

    return state;
}