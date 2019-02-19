import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { SingerDetailWrap } from './style';
import { actionCreators } from './store';

class SingerDetail extends Component {
    constructor (props) {
        super(props);

        if (!this.props.detail.id) {
            this.props.history.goBack();
        }
    }

    render () {
        const { hotSongs, type, detail } = this.props;

        if (!this.props.detail.id) {
            return '';
        }

        return (
            <Fragment>
                {
                    type === 0 ? '加载中' :
                    type === 1 ? 
                    <div>
                        <img src={detail.avatar} alt=""/>
                        {
                            hotSongs.map(song => {
                                return (
                                    <p key={song.id}>{song.name}</p>
                                )  
                            }) 
                        }
                    </div> : 
                    type === 2 ? 'fail' : null
                }
            </Fragment>
        )
    }

    componentDidMount () {
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
