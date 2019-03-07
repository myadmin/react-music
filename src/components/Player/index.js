import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
import Lyric from 'lyric-parser';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { actionCreators } from './store';
import { PlayerWrap, NormalPlayer, MiniPlayer } from './style';
import { playMode } from '../../common/config';
import { shuffle } from '../../common/util';
import { prefixStyle } from '../../common/dom';
import ProgressBar from '../../base/progressBar';
import ProgressCircle from '../../base/progressCircle';
import Scroll from '../../base/scroll/index';

const transform = prefixStyle('transform');
const transitionDuration = prefixStyle('transitionDuration');

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            songReady: false,
            currentTime: 0,
            currentLyric: null,
            currentLineNum: 0,
            currentShow: 'cd',
            playingLyric: '',
        };

        this.touch = {};

        this.onBack = this.onBack.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onTogglePlaying = this.onTogglePlaying.bind(this);
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onAudioLoadStart = this.onAudioLoadStart.bind(this);
        this.onAudioReady = this.onAudioReady.bind(this);
        this.onAudioError = this.onAudioError.bind(this);
        this.onAudioEnd = this.onAudioEnd.bind(this);
        this.onAudioTimeUpdate = this.onAudioTimeUpdate.bind(this);
        this.onProgressBarChange = this.onProgressBarChange.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
        this.onMiddleTouchStart = this.onMiddleTouchStart.bind(this);
        this.onMiddleTouchMove = this.onMiddleTouchMove.bind(this);
        this.onMiddleTouchEnd = this.onMiddleTouchEnd.bind(this);
        this.hanldeLyric = this.hanldeLyric.bind(this);
    }

    render() {
        const { playlist, fullScreen, currentSong, playing, mode } = this.props;

        const IconMode = mode === playMode.sequence ? "icon-sequence" : mode === playMode.loop ? "icon-loop" : "icon-random";

        if (!playlist.size) {
            return null;
        }

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
                    <div className="middle"
                        onTouchStart={this.onMiddleTouchStart}
                        onTouchMove={this.onMiddleTouchMove}
                        onTouchEnd={this.onMiddleTouchEnd}>
                        <div className="middle-l" ref="middleL">
                            <div className="cd-wrapper">
                                <div className={playing ? "cd play" : "cd play pause"}>
                                    <img src={currentSong.image} alt={currentSong.name} className="image" />
                                </div>
                            </div>
                            <div className="playing-lyric-wrapper">
                                <div className="playing-lyric">{this.state.playingLyric}</div>
                            </div>
                        </div>
                        {
                            this.state.currentLyric ?
                                <Scroll className="middle-r" ref="lyricList" list={this.state.currentLyric.lines}>
                                    <div className="lyric-wrapper">
                                        {
                                            this.state.currentLyric ?
                                                <div>
                                                    {
                                                        this.state.currentLyric.lines.map((line, index) => {
                                                            return <p key={line.time} ref={"lyricLine" + index} className={this.state.currentLineNum === index ? "text current" : "text"}>{line.txt}</p>
                                                        })
                                                    }
                                                </div> : null
                                        }
                                    </div>
                                </Scroll> : null
                        }
                    </div>
                    <div className="bottom">
                        <div className="dot-wrapper">
                            <span className={this.state.currentShow === 'cd' ? "dot active" : "dot"} />
                            <span className={this.state.currentShow === 'lyric' ? "dot active" : "dot"} />
                        </div>
                        <div className="progress-wrapper">
                            <span className="time time-l">{this.format(this.state.currentTime)}</span>
                            <div className="progress-bar-wrapper">
                                <ProgressBar percent={this._precent(currentSong)} percentChange={this.onProgressBarChange} />
                            </div>
                            <span className="time time-r">{this.format(currentSong.duration)}</span>
                        </div>
                        <div className="operators">
                            <div className="icon i-left" onClick={this.onChangeMode}>
                                <i className={IconMode} />
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
                        <ProgressCircle radius={32} percent={this._precent(currentSong)}>
                            <i onClick={this.onTogglePlaying} className={playing ? "icon-mini icon-pause-mini" : "icon-mini icon-play-mini"}></i>
                        </ProgressCircle>
                    </div>
                    <div className="control">
                        <i className="icon-playlist"></i>
                    </div>
                </MiniPlayer>
                <audio
                    onLoadStart={this.onAudioLoadStart}
                    onCanPlay={this.onAudioReady}
                    onError={this.onAudioError}
                    onTimeUpdate={this.onAudioTimeUpdate}
                    onEnded={this.onAudioEnd}
                    ref="audio"
                    src={currentSong.url}></audio>
            </PlayerWrap>
        )
    }

    // 收起播放器
    onBack() {
        this.props.setFullScreen(false);
    }

    // 打开播放器
    onOpen() {
        this.props.setFullScreen(true);
    }

    // 切换播放状态
    onTogglePlaying(event) {
        event.stopPropagation();
        this._togglePlaying();
    }

    // 上一首
    onPrev(event) {
        if (!this.state.songReady) return;

        if (this.props.playlist.length === 1) {
            this.onAudioLoop();
        } else {
            let index = this.props.currentIndex - 1;
            if (index === -1) {
                index = this.props.playlist.length - 1;
            }
            this.props.setCurrentIndex(index, this.props.playlist.toJS());

            // 切换歌曲后，如果当前的播放状态跟之前的播放状态不一致，需要重新设置一下播放状态
            if (!this.props.playing) {
                this.onTogglePlaying(event);
            }
        }

        this.setState({
            songReady: false
        });
    }

    // 下一首
    onNext(event) {
        if (!this.state.songReady) return;

        if (this.props.playlist.length === 1) {
            this.onAudioLoop();
        } else {
            let index = this.props.currentIndex + 1;
            if (index === this.props.playlist.length) {
                index = 0;
            }
            this.props.setCurrentIndex(index, this.props.playlist.toJS());

            if (!this.props.playing) {
                this.onTogglePlaying(event);
            }
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
        });

        if (!this.props.playing) {
            this._togglePlaying();
        }

        if (this.state.currentLyric) {
            this.state.currentLyric.seek(currentTime * 1000);
        }
    }

    onAudioLoadStart() {
        this.setState({
            songReady: true
        }, () => {
            if (this.state.currentLyric) {
                this.state.currentLyric.stop();
            }
            setTimeout(() => {
                this._play();
                this.getLyric();
            }, 100);
        });
    }

    // 当歌曲加载完成后才执行
    onAudioReady() {
        console.log('onAudioReady');
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

    // 修改播放模式
    onChangeMode() {
        const mode = (this.props.mode + 1) % 3;
        this.props.setPlayMode(mode);
        let list = null;
        if (mode === playMode.random) {
            list = shuffle(this.props.sequenceList.toJS());
        } else {
            list = this.props.sequenceList.toJS();
        }

        this.resetCurrentIndex(list);
        this.props.setPlayList(list);
    }

    // 当前歌曲结束后，自动播放下一首
    onAudioEnd(event) {
        if (this.props.mode === playMode.loop) {
            this.onAudioLoop();
        } else {
            this.onNext(event);
        }
    }

    // 循环播放
    onAudioLoop() {
        this.refs.audio.currentTime = 0;
        this.refs.audio.play();
        if (this.state.currentLyric) {
            this.state.currentLyric.seek();
        }
    }

    onMiddleTouchStart(event) {
        event.preventDefault();
        const touch = event.touches[0];
        this.touch.initialted = true;
        this.touch.startX = touch.pageX;
        this.touch.startY = touch.pageY;
    }

    onMiddleTouchMove(event) {
        event.preventDefault();
        if (!this.touch.initialted) {
            return;
        }
        const touch = event.touches[0];
        const deltaX = touch.pageX - this.touch.startX;
        const deltaY = touch.pageY - this.touch.startY;
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
            return;
        }
        const left = this.state.currentShow === 'cd' ? 0 : -window.innerWidth;
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
        this.refs.lyricList.refs.wrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
        this.refs.lyricList.refs.wrapper.style[transitionDuration] = 0;
        this.refs.middleL.style.opacity = 1 - this.touch.percent;
        this.refs.middleL.style[transitionDuration] = 0;
    }

    onMiddleTouchEnd() {
        let offsetWidth, opacity;
        // 从右向左滑动
        if (this.state.currentShow === 'cd') {
            if (this.touch.percent > 0.1) {
                offsetWidth = -window.innerWidth;
                opacity = 0;
                this.setState({
                    currentShow: 'lyric'
                });
            } else {
                offsetWidth = 0;
                opacity = 1;
            }
        } else { // 从左向右滑动
            if (this.touch.percent < 0.9) {
                offsetWidth = 0;
                this.setState({
                    currentShow: 'cd'
                });
                opacity = 1;
            } else {
                offsetWidth = -window.innerWidth;
                opacity = 0;
            }
        }
        const time = 300;
        this.refs.lyricList.refs.wrapper.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
        this.refs.lyricList.refs.wrapper.style[transitionDuration] = `${time}ms`;
        this.refs.middleL.style.opacity = opacity;
        this.refs.middleL.style[transitionDuration] = `${time}ms`;
        this.touch = {};
    }

    // 重置当前播放的歌曲的索引
    resetCurrentIndex(list) {
        let index = list.findIndex(item => {
            return item.id === this.props.currentSong.id
        });
        this.props.setCurrentIndex(index, list);
    }

    // 获取歌词，解析成dom
    getLyric() {
        this.props.currentSong.getLyric().then((lyric) => {
            this.setState({
                currentLyric: new Lyric(lyric, this.hanldeLyric)
            }, () => {
                if (this.props.playing) {
                    this.state.currentLyric.play();
                }
            });
        }).catch(() => {
            this.setState({
                currentLyric: null,
                playingLyric: '',
                currentLineNum: 0,
            })
        });
    }

    // 监听歌词的变化
    hanldeLyric({ lineNum, txt }) {
        this.setState({
            currentLineNum: lineNum
        }, () => {
            if (lineNum > 5) {
                let currentLine = lineNum - 5;
                let lineEl = this.refs['lyricLine' + currentLine];
                this.refs.lyricList.scrollToElement(lineEl, 1000);
            } else {
                this.refs.lyricList.scrollTo(0, 0, 1000);
            }
            this.setState({
                playingLyric: txt
            });
        });
    }

    // 切换播放/暂停
    _togglePlaying() {
        if (!this.state.songReady) return;
        let playingState = this.props.playing;
        this.audio = this.refs.audio;
        !playingState ? this.audio.play() : this.audio.pause();
        this.props.setPlayingState(!playingState);
        if (this.state.currentLyric) {
            this.state.currentLyric.togglePlay();
        }
    }

    // 格式化时间
    format(interval) {
        interval = interval | 0;
        const minute = interval / 60 | 0;
        const second = this._pad(interval % 60);
        return `${minute}:${second}`;
    }

    _play() {
        this.audio = this.refs.audio;
        this.props.playing ? this.audio.play() : this.audio.pause();
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
        mode: state.getIn(['player', 'mode']),
        sequenceList: state.getIn(['player', 'sequenceList']),
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
        setCurrentIndex: function (index, list) {
            dispatch(actionCreators.setCurrentSong(index, list))
        },
        setPlayMode: function (mode) {
            dispatch(actionCreators.mode(mode));
        },
        setPlayList: function (list) {
            dispatch(actionCreators.playlist(list));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);