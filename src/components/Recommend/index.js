import React, { Component, /*PureComponent*/ } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RecommendItem from './pages/RecommendItem';
import Loading from '../../base/loading';
import RecommendDetail from '../RecommendDetail';
import { RecommendWrap } from './style';
import { actionCreators } from './store';
import { actionCreators as recommendActionCreators } from '../RecommendDetail/store';

class Recommend extends Component {
    render() {
        const { type, list, location } = this.props;

        return (
            <RecommendWrap ref="recommend">
                {
                    type === 0 ? '' :
                        type === 1 ? <RecommendItem ref='recommendItem' selectItem={this.props.selectItem.bind(this)} data={list} /> :
                            type === 2 ? 'failed' : null
                }
                {!list.length ? <div className="loading-container"><Loading /></div> : null}
                {/* 歌手详情页 */}
                <TransitionGroup>
                    <CSSTransition
                        timeout={300}
                        classNames="slider"
                        key={location.key}>
                        <Switch location={location}>
                            <Route className="recommend-detail" exact path="/recommend/:id" component={RecommendDetail}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </RecommendWrap>
        )
    }

    componentDidMount() {
        if (!this.props.list.length) {
            this.props.getList();
        }
    }

    componentDidUpdate() {
        if (this.props.playlist.size) {
            const bottom = this.props.playlist.size > 0 ? '60px' : '';
            if (this.refs.recommend) {
                this.refs.recommend.style.bottom = bottom;
                this.refs.recommendItem.refresh();
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['recommend', 'list']),
        type: state.getIn(['recommend', 'type']),
        playlist: state.getIn(['player', 'playlist']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList() {
            dispatch(actionCreators.getList())
        },
        selectItem(item) {
            this.props.history.push(`/recommend/${item.id}`);
            dispatch(recommendActionCreators.saveRecommentDetail(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recommend));