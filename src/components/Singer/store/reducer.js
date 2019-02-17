import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    singerList: [],
    type: -1
});

export default (state = defaultState, action) => {
    if (action.type === actionTypes.GET_START) {
        return state.set('type', 0);
    }

    if (action.type === actionTypes.GET_SUCCESS) {
        return state.merge({
            singerList: action.data,
            type: 1
        });
    }

    if (action.type === actionTypes.GET_FAILED) {
        return state.set('type', 2);
    }

    return state;
}