import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import MusicList from '../MusicList';
import { DiscWrapper } from './style';

class RecommendDetail extends Component {
    constructor(props) {
        super(props);

        if (!this.props.detail.id) {
            this.props.history.push(`/recommend`);
            return ;
        }
    }

    render() {
        // 当直接打开歌手详情页，而不是从上一级跳过来时，渲染一个空的div
        if (!this.props.detail.id) {
            return <div />;
        }

        return (
            <DiscWrapper className="slider">
                <MusicList musicData={this.props}/>
            </DiscWrapper>
        )
    }

    componentDidMount() {
        if (this.props.detail.id) {
            this.props.getRecommendDetail(this.props.detail.id);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.getIn(['recommendDetail', 'songs']),
        type: state.getIn(['recommendDetail', 'type']),
        detail: state.getIn(['recommendDetail', 'disc']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecommendDetail: function (id) {
            dispatch(actionCreators.getRecommendDetail(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecommendDetail);