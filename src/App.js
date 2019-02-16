import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect } from 'react-router-dom';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Header from './components/Header';
import Detail from './components/Detail';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <CacheSwitch>
                    {/*占位*/}
                    <Fragment>
                        <Header />
                        <CacheRoute path="/" exact render={() => <Redirect to="/recommend" />}/>
                        {
                            this.props.navList.map(v => {
                                return <CacheRoute
                                    key={v.get('path')}
                                    path={'/' + v.get('path')}
                                    exact
                                    component={v.get('component')}/>
                            })
                        }
                        <CacheRoute path="/recommend/:id" exact component={Detail} />
                    </Fragment>
                </CacheSwitch>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        navList: state.getIn(['header', 'navList']),
        current: state.getIn(['header', 'current']),
    }
};

export default connect(mapStateToProps, null)(App);