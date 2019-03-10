import React, { Component } from 'react';
import { connect } from 'react-redux';
import MusicList from '../MusicList';
import { actionCreators } from './store';
import { RankDetailWrapper } from './style';

class RankDetail extends Component {
    constructor(props) {
        super(props);

        if (!this.props.detail.id) {
            this.props.history.goBack();
            return ;
        }
    }

    render () {
        if (!this.props.detail.id) {
            return <div />;
        }
    
        return (
            <RankDetailWrapper className="slider">
                <MusicList rank={true} musicData={this.props}/>
            </RankDetailWrapper>
        )
    }

    componentDidMount() {
        if (this.props.detail.id) {
            this.props.getRankDetail(this.props.detail.id);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        songs: state.getIn(['rankDetail', 'songs']),
        type: state.getIn(['rankDetail', 'type']),
        detail: state.getIn(['rankDetail', 'disc']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRankDetail: function (id) {
            dispatch(actionCreators.getRankDetail(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RankDetail);