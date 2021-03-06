import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
import { SingerDetailWrap } from './style';
import { actionCreators } from './store';
import MusicList from '../MusicList';

class SingerDetail extends Component {
    constructor(props) {
        super(props);

        if (!this.props.detail.id) {
            this.props.history.goBack();
            return ;
        }
    }

    render() {
        // const { songs, type, detail, match, history } = this.props;

        // 当直接打开歌手详情页，而不是从上一级跳过来时，渲染一个空的div
        if (!this.props.detail.id) {
            return <div />;
        }

        return (
            <SingerDetailWrap className="slider topic-wrap">
                <MusicList musicData={this.props}/>
            </SingerDetailWrap>
        )
    }

    componentDidMount() {
        if (this.props.detail.id) {
            this.props.getSingerDetail(this.props.detail.id);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.getIn(['singerDetail', 'songs']),
        type: state.getIn(['singerDetail', 'type']),
        detail: state.getIn(['singerDetail', 'detail']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerDetail: function (id) {
            dispatch(actionCreators.getSingerDetail(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);
