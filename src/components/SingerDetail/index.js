import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
import { SingerDetailWrap } from './style';
import { actionCreators } from './store';

class SingerDetail extends Component {
    constructor(props) {
        super(props);

        if (!this.props.detail.id) {
            this.props.history.goBack();
            return ;
        }
    }

    render() {
        const { hotSongs, type, detail, match, history } = this.props;

        // 当直接打开歌手详情页，而不是从上一级跳过来时，渲染一个空的div
        if (!this.props.detail.id) {
            return <div />;
        }
        console.log(hotSongs)
        return (
            <SingerDetailWrap className="slider topic-wrap">
                <span onClick={() => history.goBack()} className="back">back</span>
                <h3>{match.params.topicId}</h3>
                <img src={detail.avatar} alt="" />
                {
                    type === 0 ? '加载中' :
                        type === 1 ? 
                        hotSongs.map(song => {
                            return (
                                <p key={song.id}>{song.name}</p>
                            )
                        }) : 
                        type === 2 ? 'fail' : null
                }
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
        hotSongs: state.getIn(['singerDetail', 'hotSongs']),
        artist: state.getIn(['singerDetail', 'artist']),
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
