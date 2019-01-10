import { combineReducers } from 'redux-immutable';
import { reducer as HeaderReducer } from '../components/Header/store';
import { reducer as RecommendReducer } from '../components/Recommend/store';

const reducer = combineReducers({
    header: HeaderReducer,
    recommend: RecommendReducer
});

export default reducer;