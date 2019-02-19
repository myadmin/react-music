import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CacheRoute from 'react-router-cache-route';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { SingerWrap } from './style';
import { actionCreators } from './store';
import { actionCreators as detailActionCreators } from '../SingerDetail/store';
import Loading from '../../base/loading'
import ListView from '../../base/listView';
import SingerDetail from '../../components/SingerDetail';
import 'animate.css/animate.min.css';

class Singer extends Component {
    render() {
        const { singerList, type, location } = this.props;

        return (
            <SingerWrap>
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ? <ListView detail={this.props.detail.bind(this)} listviewData={singerList} /> :
                            type === 2 ? 'failed' : null
                }
                {/* 歌手详情页 */}
                <TransitionGroup>
                    <CSSTransition 
                        key={location.key}
                        timeout={500}
                        in={this.props.location.pathname !== '/singer/'}
                        classNames={{
                            enter: 'animated faster',
                            enterActive: 'slideInRight',
                            exit: 'animated faster',
                            exitActive: 'slideInRight'
                        }}
                        mountOnEnter={true}
                        unmountOnExit={true}>
                        <CacheRoute className="singer-detail" path="/singer/:id" component={SingerDetail}/>
                    </CSSTransition>
                </TransitionGroup>
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
        detail(item) {
            this.props.history.push(`/singer/${item.id}`);
            dispatch(detailActionCreators.saveSingerDetail(item));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Singer));