import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';
import Header from './components/Header';
import Detail from './components/Detail';

class App extends Component {
    render () {
        return (
            <BrowserRouter>
                <Switch>
                    {/*占位*/}
                    <Fragment>
                        <Header />
                        <Route path="/" exact render={() => <Redirect to="/recommend" />}/>
                        {
                            this.props.navList.map(v => {
                                return <Route
                                    key={v.get('path')}
                                    path={'/' + v.get('path')}
                                    exact
                                    component={v.get('component')}/>
                            })
                        }
                        <Route path="/recommend/:id" exact component={Detail} />
                    </Fragment>
                </Switch>
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