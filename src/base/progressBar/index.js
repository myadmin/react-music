import React, { Component, /* Fragment */ } from 'react';
import { ProgressBarWrapper, BarInner, Progress, ProgressBtnWrapper, ProgressBtn } from './style';
import { prefixStyle } from '../../common/dom';

const progressBtnWidth = 16;
const transform = prefixStyle('transform');

class ProgressBar extends Component {
    constructor(props) {
        super(props);

        this.touch = {};

        this.onProgressTouchStart = this.onProgressTouchStart.bind(this);
        this.onProgressTouchMove = this.onProgressTouchMove.bind(this);
        this.onProgressTouchEnd = this.onProgressTouchEnd.bind(this);
        this.onProgressClick = this.onProgressClick.bind(this);
    }

    render() {
        return (
            <ProgressBarWrapper ref="progressBar" onClick={this.onProgressClick}>
                <BarInner>
                    <Progress ref="progress" />
                    <ProgressBtnWrapper ref="progressBtn"
                        onTouchStart={this.onProgressTouchStart}
                        onTouchMove={this.onProgressTouchMove}
                        onTouchEnd={this.onProgressTouchEnd}>
                        <ProgressBtn />
                    </ProgressBtnWrapper>
                </BarInner>
            </ProgressBarWrapper>
        )
    }

    componentDidUpdate() {
        if (this.props.percent >= 0 && !this.touch.initiated) {
            const barWidth = this.refs.progressBar.clientWidth - progressBtnWidth;
            const offsetWidth = this.props.percent * barWidth;
            this._offset(offsetWidth);
        }
    }

    // 进度条开始拖动
    onProgressTouchStart(e) {
        e.preventDefault();
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.refs.progress.clientWidth;
    }

    // 进度条拖动
    onProgressTouchMove(e) {
        e.preventDefault();
        if (!this.touch.initiated) {
            return;
        }
        const deltaX = e.touches[0].pageX - this.touch.startX;
        const offsetWidth = Math.min(this.refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
        this._offset(offsetWidth);
    }

    // 进度条停止拖动
    onProgressTouchEnd() {
        this.touch.initiated = false;
        this._triggerPercent();
    }

    onProgressClick(e) {
        e.preventDefault();
        e.stopPropagation();
        let offsetWidth = e.clientX - this.refs.progressBar.offsetLeft;
        this._offset(offsetWidth);
        this._triggerPercent();
    }

    _offset(offsetWidth) {
        this.refs.progress.style.width = `${offsetWidth}px`;
        this.refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`;
    }

    _triggerPercent() {
        const barWidth = this.refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.refs.progress.clientWidth / barWidth;
        this.props.percentChange(percent);
    }
}

export default ProgressBar;