import { combineReducers } from 'redux-immutable';
import { reducer as HeaderReducer } from '../components/Header/store';
import { reducer as RecommendReducer } from '../components/Recommend/store';
// import { reducer as DetailReducer } from '../components/Detail/store';
import { reducer as SingerReducer } from '../components/Singer/store';
import { reducer as SingerDetailReducer } from '../components/SingerDetail/store';
import { reducer as PlayerReducer } from '../components/Player/store';
import { reducer as RecommendDetail } from '../components/RecommendDetail/store';
import { reducer as RankReducer } from '../components/Rank/store';
import { reducer as RankDetailReducer } from '../components/RankDetail/store';
import { reducer as SearchReducer } from '../components/Search/store'; 

const reducer = combineReducers({
    header: HeaderReducer,
    recommend: RecommendReducer,
    recommendDetail: RecommendDetail,
    singer: SingerReducer,
    singerDetail: SingerDetailReducer,
    player: PlayerReducer,
    rank: RankReducer,
    rankDetail: RankDetailReducer,
    search: SearchReducer,
});

export default reducer;