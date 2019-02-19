import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
// import { SingerDetailWrap } from './style';
import { actionCreators } from './store';

class SingerDetail extends Component {
    componentWillMount () {
       
    }

    render () {
        const { hotSongs } = this.props;
        return (
            <Fragment>
                {
                    hotSongs.forEach(song => {
                        return (
                            <div key={song.id}>{song.name}</div>
                        )  
                    })
                }
            </Fragment>
        )
    }

    componentDidMount () {
        // this.props.getSingerDetail(this.props.match.params.id);
    }
}

const mapStateToProps = (state) => {
    return {
        hotSongs: state.getIn(['singerDetail', 'hotSongs']),
        artist: state.getIn(['singerDetail', 'artist']),
        type: state.getIn(['singerDetail', 'type']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerDetail(id) {
            dispatch(actionCreators.getSingerDetail(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingerDetail);
