import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Header from './components/Header';
import Player from './components/Player';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                {/*占位*/}
                <Fragment>
                    <Header />
                    <CacheSwitch>
                        <CacheRoute path="/" exact render={() => <Redirect to="/recommend" />} />
                        {
                            this.props.navList.map(v => {
                                return <CacheRoute
                                    className={v.get('path')}
                                    key={v.get('path')}
                                    path={'/' + v.get('path')}
                                    component={v.get('component')} />
                            })
                        }
                    </CacheSwitch>
                    <Player />
                </Fragment>
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