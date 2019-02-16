import { combineReducers } from 'redux-immutable';
import { reducer as HeaderReducer } from '../components/Header/store';
import { reducer as RecommendReducer } from '../components/Recommend/store';
import { reducer as DetailReducer } from '../components/Detail/store';

const reducer = combineReducers({
    header: HeaderReducer,
    recommend: RecommendReducer,
    detail: DetailReducer
});

export default reducer;