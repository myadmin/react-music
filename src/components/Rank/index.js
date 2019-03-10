import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as rankActionCreators } from '../RankDetail/store';
import RankDetail from '../RankDetail/index';
import Scroll from '../../base/scroll/index';
import { RankWrapper } from './style';
import Loading from '../../base/loading/index';

class Rank extends Component {
    render() {
        const { type, list, location } = this.props;

        return (
            <RankWrapper ref="rankWrapper">
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ?
                            <Scroll ref="listScroll" list={list} className="toplist">
                                <ul>
                                    {
                                        list.map(item => {
                                            return (
                                                <li onClick={this.onClickChangeItem.bind(this, item)} key={item.id} className="item">
                                                    <div className="icon">
                                                        <SimpleImg width={100} height={100} src={item.coverImgUrl} />
                                                    </div>
                                                    <ul className="songlist">
                                                        {
                                                            item.tracks.map((song, index) => {
                                                                return (
                                                                    <li key={index} className="song">
                                                                        <span>{index + 1}</span>
                                                                        <span>{song.first}-{song.second}</span>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </Scroll> :
                            type === 2 ? 'failed' : null
                }
                {/* 排行榜详情页 */}
                <TransitionGroup>
                    <CSSTransition
                        timeout={300}
                        classNames="slider"
                        key={location.key}>
                        <Switch location={location}>
                            <Route className="rank-detail" exact path="/rank/:id" component={RankDetail}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </RankWrapper>
        )
    }

    componentDidMount() {
        this.props.getList();
        initSimpleImg();
    }

    componentDidUpdate() {
        if (this.props.playlist.size) {
            const bottom = this.props.playlist.size ? '60px' : '';
            if (this.refs.rankWrapper) {
                this.refs.rankWrapper.style.bottom = bottom;
                this.refs.listScroll.refresh();
            }
        }
    }

    onClickChangeItem(item) {
        this.props.changeItem(item);
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['rank', 'list']),
        type: state.getIn(['rank', 'type']),
        playlist: state.getIn(['player', 'playlist']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getList() {
            dispatch(actionCreators.getList())
        },
        changeItem(item) {
            this.history.push(`/rank/${item.id}`);
            dispatch(rankActionCreators.saveRankDetail(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Rank));