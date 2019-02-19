import { combineReducers } from 'redux-immutable';
import { reducer as HeaderReducer } from '../components/Header/store';
import { reducer as RecommendReducer } from '../components/Recommend/store';
import { reducer as DetailReducer } from '../components/Detail/store';
import { reducer as SingerReducer } from '../components/Singer/store';
import { reducer as SingerDetailReducer } from '../components/SingerDetail/store';

const reducer = combineReducers({
    header: HeaderReducer,
    recommend: RecommendReducer,
    recommendDetail: DetailReducer,
    singer: SingerReducer,
    singerDetail: SingerDetailReducer
});

export default reducer;