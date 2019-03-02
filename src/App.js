import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Header from './components/Header';
import Player from './components/Player';
// import Detail from './components/Detail';
// import SingerDetail from './components/SingerDetail/index';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <CacheSwitch>
                    {/*占位*/}
                    <Fragment>
                        <Header/>
                        <CacheRoute path="/" exact render={() => <Redirect to="/recommend" />}/>
                        {
                            this.props.navList.map(v => {
                                return <CacheRoute
                                    key={v.get('path')}
                                    path={'/' + v.get('path')}
                                    component={v.get('component')}/>
                            })
                        }
                        {/* 推荐详情页 */}
                        {/* <CacheRoute path="/singer/:id" exact component={SingerDetail} /> */}
                        <Player />
                    </Fragment>
                </CacheSwitch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navList: state.getIn(['header', 'navList']),
    }
};

export default connect(mapStateToProps, null)(App);