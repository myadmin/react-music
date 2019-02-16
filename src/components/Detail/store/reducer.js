import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';

const defaultState = fromJS({
    playlist: {},
    state: -1
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.GET_DETAIL_START:
            return state.set('state', 0);
        case actionTypes.GET_DETAIL_SUCCESS:
            return state.merge({
                state: 1,
                playlist: action.data.playlist
            });
        case actionTypes.GET_DETAIL_FAIL:
            return state.set('state', 2);
        default:
            return state;
    }
}