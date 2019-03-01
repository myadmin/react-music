import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    songs: [],
    type: -1,
    detail: {}
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

    if (action.type === actionTypes.GET_FAILED) {
        return state.set('type', 2);
    }

    if (action.type === actionTypes.SAVE_DETAIL) {
        return state.set('detail', action.item);
    }

    return state;
}