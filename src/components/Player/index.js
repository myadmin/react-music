import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { actionCreators } from './store';
import { PlayerWrap, NormalPlayer, MiniPlayer } from './style';
import ProgressBar from '../../base/progressBar';

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songReady: false,
            currentTime: 0
        };

        this.onBack = this.onBack.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onTogglePlaying = this.onTogglePlaying.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onAudioReady = this.onAudioReady.bind(this);
        this.onAudioError = this.onAudioError.bind(this);
        this.onAudioTimeUpdate = this.onAudioTimeUpdate.bind(this);
        this.onProgressBarChange = this.onProgressBarChange.bind(this);
    }

    render() {
        const { playlist, fullScreen, currentSong, playing } = this.props;

        return (
            <PlayerWrap style={{ display: playlist.size ? '' : 'none' }}>
                <NormalPlayer style={{ display: fullScreen ? '' : 'none' }}>
                    <div className="background">
                        <img src={currentSong.image} alt={currentSong.name} style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className="top">
                        <div className="back" onClick={this.onBack}>
                            <i className="icon-back"></i>
                        </div>
                        <h1 className="title" dangerouslySetInnerHTML={{ __html: currentSong.name }} />
                        <h2 className="subtitle" dangerouslySetInnerHTML={{ __html: currentSong.singer }} />
                    </div>
                    <div className="middle">
                        <div className="middle-l">
                            <div className="cd-wrapper">
                                <div className={playing ? "cd play" : "cd play pause"}>
                                    <img src={currentSong.image} alt={currentSong.name} className="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="progress-wrapper">
                            <span className="time time-l">{this.format(this.state.currentTime)}</span>
                            <div className="progress-bar-wrapper">
                                <ProgressBar percent={this._precent(currentSong)} percentChange={this.onProgressBarChange} />
                            </div>
                            <span className="time time-r">{this.format(currentSong.duration)}</span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left">
                                <i className="icon-sequence"></i>
                            </div>
                            <div className={this.state.songReady ? "icon i-left" : "icon i-left disable"}>
                                <i onClick={this.onPrev} className="icon-prev"></i>
                            </div>
                            <div className={this.state.songReady ? "icon i-center" : "icon i-center disable"}>
                                <i onClick={this.onTogglePlaying} className={playing ? "needsclick icon-pause" : "needsclick icon-play"}></i>
                            </div>
                            <div className={this.state.songReady ? "icon i-right" : "icon i-right disable"}>
                                <i onClick={this.onNext} className="icon-next"></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon icon-not-favorite"></i>
                            </div>
                        </div>
                    </div>
                </NormalPlayer>
                <MiniPlayer style={{ display: fullScreen ? 'none' : '' }} onClick={this.onOpen}>
                    <div className="icon">
                        <div className="imgWrapper">
                            <img className={playing ? "play" : "play pause"} src={currentSong.image} alt={currentSong.name} style={{ width: "40px", height: "40px" }} />
                        </div>
                    </div>
                    <div className="text">
                        <h2 className="name" dangerouslySetInnerHTML={{ __html: currentSong.name }} />
                        <p className="desc" dangerouslySetInnerHTML={{ __html: currentSong.singer }} />
                    </div>
                    <div className="control">
                        <i onClick={this.onTogglePlaying} className={playing ? "icon-pause-mini" : "icon-play-mini"}></i>
                    </div>
                    <div className="control">
                        <i className="icon-playlist"></i>
                    </div>
                </MiniPlayer>
                <audio
                    onCanPlay={this.onAudioReady}
                    onError={this.onAudioError}
                    onTimeUpdate={this.onAudioTimeUpdate}
                    ref="audio"
                    src={currentSong.url}></audio>
            </PlayerWrap>
        )
    }

    componentDidUpdate() {
        if (this.props.currentSong.id) {
            this.audio = this.refs.audio;
            this.props.playing ? this.audio.play() : this.audio.pause();
        }
    }

    onBack() {
        this.props.setFullScreen(false);
    }

    onOpen() {
        this.props.setFullScreen(true);
    }

    onTogglePlaying(event) {
        event.stopPropagation();
        this._togglePlaying();
    }

    onPrev(event) {
        if (!this.state.songReady) return;
        let index = this.props.currentIndex - 1;
        if (index === -1) {
            index = this.props.playlist.length - 1;
        }
        this.props.setCurrentIndex(index);

        // 切换歌曲后，如果当前的播放状态跟之前的播放状态不一致，需要重新设置一下播放状态
        if (!this.props.playing) {
            this.onTogglePlaying(event);
        }

        this.setState({
            songReady: false
        });
    }

    onNext(event) {
        if (!this.state.songReady) return;
        let index = this.props.currentIndex + 1;
        if (index === this.props.playlist.length) {
            index = 0;
        }
        this.props.setCurrentIndex(index);

        if (!this.props.playing) {
            this.onTogglePlaying(event);
        }

        this.setState({
            songReady: false
        });
    }

    // 当播放进度条被拖动发送改变时修改当前播放时间
    onProgressBarChange(percent) {
        let currentTime = this.props.currentSong.duration * percent;
        this.refs.audio.currentTime = currentTime;
        this.setState({
            currentTime: currentTime
        })

        if (!this.props.playing) {
            this._togglePlaying();
        }
    }

    // 当歌曲加载完成后才执行
    onAudioReady() {
        this.setState({
            songReady: true
        });
    }

    // 当歌曲加载失败后，确保后续的操作能够正常运行
    onAudioError() {
        this.setState({
            songReady: true
        });
    }

    // 获取当前歌曲更新时间
    onAudioTimeUpdate(e) {
        this.setState({
            currentTime: e.target.currentTime
        });
    }

    _togglePlaying() {
        if (!this.state.songReady) return;
        let playingState = this.props.playing;
        this.props.setPlayingState(!playingState);
    }

    // 格式化时间
    format(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return `${minute}:${second}`;
    }

    // 补零
    _pad(num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
            num = '0' + num;
            len++;
        }
        return num;
    }

    _precent(currentSong) {
        return this.state.currentTime / currentSong.duration;
    }
}

const mapStateToProps = (state) => {
    return {
        playlist: state.getIn(['player', 'playlist']),
        fullScreen: state.getIn(['player', 'fullScreen']),
        currentSong: state.getIn(['player', 'currentSong']),
        playing: state.getIn(['player', 'playing']),
        currentIndex: state.getIn(['player', 'currentIndex']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFullScreen: function (fullScreenState) {
            dispatch(actionCreators.fullScreen(fullScreenState));
        },
        setPlayingState: function (playingState) {
            dispatch(actionCreators.playing(playingState));
        },
        setCurrentIndex: function (index) {
            dispatch(actionCreators.setCurrentSong(index));
            // dispatch(actionCreators.currentSong(this.playlist, index));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);