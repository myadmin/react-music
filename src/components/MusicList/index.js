import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { MusicListWrap, BackWrap, Title, BgImage, PlayWrapper, Filter } from './style';
import Loading from '../../base/loading';
import SongList from '../../base/songList';
import Scroll from '../../base/scroll';
import { prefixStyle } from '../../common/dom';
import { actionCreators } from '../Player/store';

const RESERVED_HEIGHT = 40;
const transform = prefixStyle('transform');
const backdrop = prefixStyle('backdrop-filter');

class MusicList extends PureComponent {
    constructor(props) {
        super(props);

        this.probeType = 3;
        this.listenScroll = true;

        this.state = {
            scrollY: 0
        };

        this.onScroll = this.onScroll.bind(this);
        this.selectItem = this.selectItem.bind(this);
        this.onClickRandom = this.onClickRandom.bind(this);
    }

    render() {
        const { detail, songs, history, type } = this.props.musicData;

        return (
            <MusicListWrap>
                <BackWrap onClick={() => { history.goBack() }}>
                    <i className="icon-back" />
                </BackWrap>
                <Title>{detail.name}</Title>
                <BgImage bgStyle={detail.avatar} ref="bgImage">
                    <PlayWrapper>
                        {
                            songs.length > 0 ?
                                <div className="play" ref="playBtn" onClick={this.onClickRandom}>
                                    <i className="icon-play"></i>
                                    <span className="text">随机播放全部</span>
                                </div> : null
                        }
                    </PlayWrapper>
                    <Filter ref="filter" />
                </BgImage>
                <div className="bg-layer" ref="layer" />
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ?
                            <Scroll
                                probeType={this.probeType}
                                listenScroll={this.listenScroll}
                                scroll={this.onScroll}
                                ref="list"
                                list={songs}>
                                <div className="song-list-wrapper">
                                    <SongList selectItem={this.selectItem} songs={songs} />
                                </div>
                            </Scroll> :
                            type === 2 ? 'failed' : null
                }
            </MusicListWrap>
        )
    }

    componentDidUpdate() {
        if (this.props.musicData.type === 1) {
            this.imageHeight = this.refs.bgImage.clientHeight;
            this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
            this.refs.list.refs.wrapper.style.top = `${this.imageHeight}px`;
        }

        if (this.props.playlist.size) {
            const bottom = this.props.playlist.size > 0 ? '60px' : '';
            if (this.refs.list) {
                this.refs.list.refs.wrapper.style.bottom = bottom;
                this.refs.list.refresh();
            }
        }
    }

    onScroll(pos) {
        if (!this.refs.layer) return;
        let newY = pos.y;
        let translateY = Math.max(this.minTranslateY, newY);
        let zIndex = 0;
        let scale = 1;
        let blur = 0;
        this.refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
        const percent = Math.abs(newY / this.imageHeight);
        if (newY > 0) {
            scale = 1 + percent;
            zIndex = 10;
        } else {
            blur = Math.min(20 * percent, 20);
        }
        this.refs.filter.style[backdrop] = `blur(${blur}px)`;
        if (newY < this.minTranslateY) {
            zIndex = 10;
            this.refs.bgImage.style.paddingTop = 0;
            this.refs.bgImage.style.height = `${RESERVED_HEIGHT}px`;
            this.refs.playBtn.style.display = 'none';
        } else {
            this.refs.bgImage.style.paddingTop = '70%';
            this.refs.bgImage.style.height = 0;
            this.refs.playBtn.style.display = '';
        }
        this.refs.bgImage.style[transform] = `scale(${scale})`;
        this.refs.bgImage.style.zIndex = zIndex;
    }

    selectItem(item, index) {
        this.props.selectPlay(item, index);
    }

    onClickRandom() {
        this.props.randomPlay(this.props.musicData.songs);
    }
}

const mapStateToProps = (state) => {
    return {
        playlist: state.getIn(['player', 'playlist'])
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        selectPlay: function (item, index) {
            dispatch(actionCreators.selectPlay(this.musicData.songs, index))
        },
        randomPlay: function (list) {
            dispatch(actionCreators.randomPlay(list));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MusicList);
