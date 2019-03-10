import { fromJS } from 'immutable';
import * as actionTypes from './actionTypes';
import Recommend from '../../Recommend';
import Singer from '../../Singer';
import Rank from '../../Rank';
import Search from '../../Search';

const defaultState = fromJS({
    navList: [
        {path: 'recommend', title: '推荐', component: Recommend},
        {path: 'singer', title: '歌手', component: Singer},
        {path: 'rank', title: '排行', component: Rank},
        {path: 'search', title: '搜索', component: Search}
    ],
    current: 'recommend'
});

export default (state = defaultState, action) => {
    if (action.type === actionTypes.CHANGE_TAB) {
        if (action.value === '') {
            action.value = 'recommend';
        }
       
        if (action.value.indexOf('recommend') > -1) {
            action.value = 'recommend';
        }

        if (action.value.indexOf('singer') > -1) {
            action.value = 'singer';
        }

        if (action.value.indexOf('rank') > -1) {
            action.value = 'rank';
        }

        return state.set('current', action.value);
    }

    return state;
}