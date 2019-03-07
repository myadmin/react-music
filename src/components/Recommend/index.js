import React, { Component, /*PureComponent*/ } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecommendItem from './pages/RecommendItem';
import Loading from '../../base/loading';

import { RecommendWrap } from './style';
import { actionCreators } from './store';

class Recommend extends Component {
    render() {
        const { type, list } = this.props;

        return (
            <RecommendWrap ref="recommend">
                {
                    type === 0 ? '' :
                        type === 1 ? <RecommendItem ref='recommendItem' detail={this.props.detail.bind(this)} data={list} /> :
                            type === 2 ? 'failed' : null
                }
                {!list.length ? <div className="loading-container"><Loading /></div> : null}
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
        detail(id) {
            this.props.history.push(`/recommend/${id}`);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Recommend));