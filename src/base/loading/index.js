import React, { PureComponent } from 'react';
import { LoadingWrap } from './style';

export default class Loading extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            title: '正在载入...'
        }
    }
    
    render () {
        return (
            <LoadingWrap>
                <img width="24" height="24" src={require('./loading.gif')} alt=""/>
                <p className="desc">{this.state.title}</p>
            </LoadingWrap>
        )
    }
}