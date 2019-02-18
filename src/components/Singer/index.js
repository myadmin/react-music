import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CacheRoute from 'react-router-cache-route';
// import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { SingerWrap } from './style';
import { actionCreators } from './store';
import Loading from '../../base/loading'
import ListView from '../../base/listView';
import SingerDetail from '../../components/SingerDetail';

class Singer extends Component {
    render() {
        const { singerList, type } = this.props;
        return (
            <SingerWrap>
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ? <ListView detail={this.props.detail.bind(this)} listviewData={singerList} /> :
                            type === 2 ? 'failed' : null
                }
                {/* 歌手详情页 */}
                <CacheRoute className="singer-detail" path="/singer/:id" exact component={SingerDetail} />
            </SingerWrap>
        )
    }

    componentDidMount() {
        this.props.getSingerList();
    }
}

const mapStateToProps = (state) => {
    return {
        singerList: state.getIn(['singer', 'singerList']),
        type: state.getIn(['singer', 'type']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerList() {
            dispatch(actionCreators.getSingerList())
        },
        detail(id) {
            this.props.history.push(`/singer/${id}`);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Singer));