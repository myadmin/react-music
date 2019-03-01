import React, { PureComponent } from 'react';
import { MusicListWrap, BackWrap, Title, BgImage, PlayWrapper, Filter } from './style';
import Loading from '../../base/loading';
import SongList from '../../base/songList';
import Scroll from '../../base/scroll';
import { profixStyle } from '../../common/dom';

const RESERVED_HEIGHT = 40;
const transform = profixStyle('transform');
const backdrop = profixStyle('backdrop-filter');

class MusicList extends PureComponent {
    constructor(props) {
        super(props);

        this.probeType = 3;
        this.listenScroll = true;

        this.state = {
            scrollY: 0
        };

        this.onScroll = this.onScroll.bind(this);
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
                                <div className="play" ref="playBtn">
                                    <i className="icon-play"></i>
                                    <span className="text">随机播放全部</span>
                                </div> : null
                        }
                    </PlayWrapper>
                    <Filter ref="filter" />
                </BgImage>
                <div className="bg-layer" ref="layer" />
                <div className="loading-container"><Loading /></div>
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
                                    <SongList songs={songs} />
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
}

export default MusicList;
