import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';

export default class Scroll extends PureComponent {
    render () {
        return (
            <div ref="wrapper" className="wrapper" style={{height: '100%'}}>
                {this.props.children}
            </div>
        )
    }

    componentDidMount () {
        setTimeout(() => {
            this._initScroll();
        }, 20);

        if (this.props.list.length) {
            this.refresh();
        }
    }

    _initScroll () {
        if (!this.refs.wrapper) {
            return
        }

        this.scroll = new BScroll(this.refs.wrapper, {
            probeType: 3,
            click: true
        });

        if (this.props.listenScroll) {
            this.scroll.on('scroll', (pos) => {
                this.props.scroll(pos);
            });
        }
    }

    enable () {
        this.scroll && this.scroll.enable();
    }

    disable () {
        this.scroll && this.scroll.disable();
    }

    refresh () {
        this.scroll && this.scroll.refresh();
    }

    scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
    }

    scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
    }
}