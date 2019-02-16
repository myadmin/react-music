import React, { Component, /*PureComponent*/ } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import RecommendItem from './pages/RecommendItem';
import Loading from '../../base/loading';

import { RecommendWrap } from './style';
import { actionCreators } from './store';

class Recommend extends Component {
    render () {
        const { type, list } = this.props;

        return (
            <RecommendWrap>
                {
                    type === 0 ? '' :
                    type === 1 ? <RecommendItem detail={this.props.detail.bind(this)} data={list} /> :
                    type === 2 ? 'failed' : null
                }
                {!list.length ? <div className="loading-container"><Loading /></div> : null}
            </RecommendWrap>
        )
    }

    componentDidMount () {
        if (!this.props.list.length) {
            this.props.getList();
        }
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.getIn(['recommend', 'list']),
        type: state.getIn(['recommend', 'type']),
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