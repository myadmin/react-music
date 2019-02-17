import React, { PureComponent } from 'react';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import { ListViewWrap } from './style';
import Scroll from '../scroll/index';

const ANCHOR_HEIGHT = 18;

export default class ListView extends PureComponent { 
    constructor (props) {
        super(props);

        this.touch = {};

        this.onShortcutTouchStart = this.onShortcutTouchStart.bind(this);
        this.onShortcutTouchMove = this.onShortcutTouchMove.bind(this);
    }
    render () {
        const { listviewData } = this.props;
        console.log(listviewData)
        return (
            <ListViewWrap>
                <Scroll ref="listview" className="listview" list={listviewData}>
                    <ul>
                        {
                            listviewData.map((v, index) => {
                                return (
                                    <li ref={"listGroup" + index} className="list-group" key={v.title}>
                                        <h2 className="list-group-title">{v.title}</h2>
                                        <ul>
                                            {
                                                v.items.map(items => {
                                                    return (
                                                        <li key={items.name} className="list-group-item">
                                                            <SimpleImg className="avatar" height={50} src={items.avatar}/>
                                                            <span className="name">{items.name}</span>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <div ref="shortcut" className="list-shortcut" 
                        onTouchStart={this.onShortcutTouchStart}
                        onTouchMove={this.onShortcutTouchMove}>
                        <ul>
                            {
                                listviewData.map((v, i) => <li key={i} data-index={i} className="item">{v.nav}</li>)
                            }
                        </ul>
                    </div>
                </Scroll>
            </ListViewWrap>
        )
    }

    componentDidMount () {
        initSimpleImg();
    }

    onShortcutTouchStart (e) {
        let anchorIndex = e.target.getAttribute('data-index');
        let firstTouch = e.touches[0];
        this.touch.y1 = firstTouch.pageY;
        this.touch.anchorIndex = anchorIndex;
        this._scrollTo(anchorIndex);
    }

    onShortcutTouchMove (e) {
        // this.refs.shortcut.addEventListener('touchmove', (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }, { passive: false });
        e.preventDefault();
        e.stopPropagation();
        console.log(e)
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
        let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
        this._scrollTo(parseInt(anchorIndex, 10));
    }

    _scrollTo (index) {
        this.refs.listview.scrollToElement(this.refs['listGroup' + index], 0);
    }
}