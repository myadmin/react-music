import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../../base/searchBox';
import Scroll from '../../base/scroll/index';
import { actionCreators } from './store';
import { SearchWrapper } from './style';
import Loading from '../../base/loading/index';

class Search extends Component {
    render() {
        const { hots, type } = this.props;

        return (
            <SearchWrapper>
                <div className="search-box-wrapper">
                    <SearchBox queryValue={this.queryValue} />
                </div>
                {
                    type === 0 ? <div className="loading-container"><Loading /></div> :
                        type === 1 ?
                            <div className="shortcut-wrapper">
                                <div className="shortcut">
                                    <Scroll list={hots}>
                                        <div className="hot-key">
                                            <h1 className="title">热门搜索</h1>
                                            <ul>
                                                {
                                                    hots.map(hot => {
                                                        return <li key={hot.first} className="item">{hot.first}</li>
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    </Scroll>
                                </div>
                            </div> :
                            type === 2 ? 'failed' : null
                }
            </SearchWrapper>
        )
    }

    componentDidMount() {
        this.props.getHots();
    }

    queryValue(value) {
        console.log(value);
    }
}

const mapStateToProps = (state) => {
    return {
        hots: state.getIn(['search', 'hots']),
        type: state.getIn(['search', 'type']),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHots() {
            dispatch(actionCreators.getHots())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);