import React, { Component, /* Fragment */ } from 'react';
import { connect } from 'react-redux';
// import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { actionCreators } from './store';
import { PlayerWrap, NormalPlayer, MiniPlayer } from './style';

class Player extends Component {
    constructor(props) {
        super(props);

        this.onBack = this.onBack.bind(this);
        this.onOpen = this.onOpen.bind(this);
    }
    render() {
        const { playlist, fullScreen, currentSong } = this.props;
        console.log(fullScreen)
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
                                <div className="cd">
                                    <img src={currentSong.image} alt={currentSong.name} className="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="operators">
                            <div className="icon i-left">
                                <i className="icon-sequence"></i>
                            </div>
                            <div className="icon i-left">
                                <i className="icon-prev"></i>
                            </div>
                            <div className="icon i-center">
                                <i className="icon-play"></i>
                            </div>
                            <div className="icon i-right">
                                <i className="icon-next"></i>
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
                            <img src={currentSong.image} alt={currentSong.name} style={{ width: "40px", height: "40px" }} />
                        </div>
                    </div>
                    <div className="text">
                        <h2 className="name" dangerouslySetInnerHTML={{ __html: currentSong.name }} />
                        <p className="desc" dangerouslySetInnerHTML={{ __html: currentSong.singer }} />
                    </div>
                    <div className="control">
                        {/* <i className="icon-mini icon-play-mini"></i> */}
                    </div>
                    <div className="control">
                        <i className="icon-playlist"></i>
                    </div>
                </MiniPlayer>
            </PlayerWrap>
        )
    }

    onBack() {
        this.props.setFullScreen(false);
    }

    onOpen() {
        this.props.setFullScreen(true);
    }
}

const mapStateToProps = (state) => {
    return {
        playlist: state.getIn(['player', 'playlist']),
        fullScreen: state.getIn(['player', 'fullScreen']),
        currentSong: state.getIn(['player', 'currentSong']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFullScreen: function (fullScreenState) {
            dispatch(actionCreators.fullScreen(fullScreenState));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);