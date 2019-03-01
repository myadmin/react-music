import React, { PureComponent } from 'react';
import BScroll from 'better-scroll';

export default class Scroll extends PureComponent {
    constructor (props) {
        super(props);

        this.refresh = this.refresh.bind(this);
    }
    render () {
        return (
            <div ref="wrapper" className="wrapper">
                {this.props.children}
            </div>
        )
    }

    componentDidMount () {
        setTimeout(() => {
            this._initScroll();

            if (this.props.list.length) {
                this.refresh();
            }
        }, 20);
    }

    _initScroll () {
        if (!this.refs.wrapper) {
            return
        }

        this.scroll = new BScroll(this.refs.wrapper, {
            probeType: this.props.probeType || 1,
            click: true
        });

        if (this.props.listenScroll) {
            this.scroll.on('scroll', (pos) => {
                if (typeof this.props.scroll === 'function') {
                    this.props.scroll(pos);
                }
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