import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { HeaderWrap, Icon, Title, NavWrap, NavItem } from './style';
import { actionCreators }  from './store';

class Header extends Component {
    render () {
        const { navList, current } = this.props;
        return (
            <Fragment>
                <HeaderWrap>
                    <Icon />
                    <Title>Music App</Title>
                </HeaderWrap>
                <NavWrap>
                    {
                        navList.map(v => {
                            return (
                                <NavItem className={current === v.get('path') ? 'active' : ''} key={v.get('title')} onClick={() => this.props.change_tab(v.get('path'))}>
                                    <span>{v.get('title')}</span>
                                </NavItem>
                            )
                        })
                    }
                </NavWrap>
            </Fragment>
        )
    }

    componentDidMount () {
        this.props.init_tab();
    }
}

const mapStateToProps = (state) => {
    return {
        navList: state.getIn(['header', 'navList']),
        current: state.getIn(['header', 'current'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        change_tab(value) {
            this.history.push(`/${value}`);
            dispatch(actionCreators.changeTab(value));
        },
        init_tab () {
            let value = this.location.pathname.slice(1);
            dispatch(actionCreators.changeTab(value));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));