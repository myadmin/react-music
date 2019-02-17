import { combineReducers } from 'redux-immutable';
import { reducer as HeaderReducer } from '../components/Header/store';
import { reducer as RecommendReducer } from '../components/Recommend/store';
import { reducer as DetailReducer } from '../components/Detail/store';
import { reducer as SingerReducer } from '../components/Singer/store';

const reducer = combineReducers({
    header: HeaderReducer,
    recommend: RecommendReducer,
    detail: DetailReducer,
    singer: SingerReducer
});

export default reducer;