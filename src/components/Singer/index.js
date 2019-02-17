import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SingerWrap } from './style';
import { actionCreators } from './store';
import Loading from '../../base/loading'
import ListView from '../../base/listView';

class Singer extends Component {
    render () {
        const { singerList, type } = this.props;
        return (
            <SingerWrap>
                {
                    type === 0 ? <Loading /> :
                    type === 1 ? <ListView listviewData={singerList}/>:
                    type === 2 ? 'failed' : null
                }
            </SingerWrap>
        )
    }

    componentDidMount () {
        this.props.getSingerList();
    }
}

const mapStateToProps = (state) => {
    return {
        singerList: state.getIn(['singer', 'singerList']),
        type: state.getIn(['singer', 'type']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSingerList() {
            dispatch(actionCreators.getSingerList())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Singer);