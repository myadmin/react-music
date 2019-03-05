import React, { Component, /* Fragment */ } from 'react';
import { ProgressCircleWrapper } from './style';

class ProgressCircle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dashArray: Math.PI * 100
        }
    }

    render() {
        const { radius } = this.props;
        const { dashArray } = this.state;

        return (
            <ProgressCircleWrapper>
                <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
                    <circle className="progress-bar" r="50" cx="50" cy="50" fill="transparent" strokeDasharray={dashArray} strokeDashoffset={`${this.dashOffset()}`} />
                </svg>
                {this.props.children}
            </ProgressCircleWrapper>
        )
    }

    dashOffset() {
        return (1 - this.props.percent) * this.state.dashArray;
    }
}

export default ProgressCircle;