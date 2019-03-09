import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SingerWrap } from './style';
import { actionCreators } from './store';
import { actionCreators as detailActionCreators } from '../SingerDetail/store';
import Loading from '../../base/loading'
import ListView from '../../base/listView';
import SingerDetail from '../../components/SingerDetail';

class Singer extends Component {
    render() {
        const { singerList, type, location } = this.props;

        return (
            <SingerWrap ref="singer">
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ? <ListView ref="list" detail={this.props.detail.bind(this)} listviewData={singerList} /> :
                            type === 2 ? "failed" : null
                }
                {/* 歌手详情页 */}
                <TransitionGroup>
                    <CSSTransition
                        timeout={300}
                        classNames="slider"
                        key={location.key}>
                        <Switch location={location}>
                            <Route className="singer-detail" exact path="/singer/:id" component={SingerDetail}/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </SingerWrap>
        )
    }

    componentDidMount() {
        this.props.getSingerList();
    }

    componentDidUpdate() {
        if (this.props.playlist.size && this.refs.list) {
            const bottom = this.props.playlist.size > 0 ? '60px' : '';
            this.refs.singer.style.bottom = bottom;
            this.refs.list.onRefresh();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        singerList: state.getIn(['singer', 'singerList']),
        type: state.getIn(['singer', 'type']),
        playlist: state.getIn(['player', 'playlist'])
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerList() {
            dispatch(actionCreators.getSingerList())
        },
        detail(item) {
            this.props.history.push(`/singer/${item.id}`);
            dispatch(detailActionCreators.saveSingerDetail(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Singer));