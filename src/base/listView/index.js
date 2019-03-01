import React, { PureComponent } from 'react';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import { ListViewWrap } from './style';
import Scroll from '../scroll/index';

const ANCHOR_HEIGHT = 18;
const TITLE_HEIGHT = 30;

export default class ListView extends PureComponent { 
    constructor (props) {
        super(props);

        this.touch = {};
        this.probeType = 3;
        this.listenScroll = true;
        this.listHeight = [];

        this.state = {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        };

        this.onShortcutTouchStart = this.onShortcutTouchStart.bind(this);
        this.onShortcutTouchMove = this.onShortcutTouchMove.bind(this);
        this.onScroll = this.onScroll.bind(this);
    }
    render () {
        const { listviewData } = this.props;

        return (
            <ListViewWrap>
                <Scroll 
                    ref="listview" 
                    className="listview" 
                    list={listviewData} 
                    probeType={this.probeType}
                    listenScroll={this.listenScroll}
                    scroll={this.onScroll}>
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
                                                        <li onClick={() => this.props.detail(items)} key={items.name} className="list-group-item">
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
                                listviewData.map((v, i) => {
                                    return (
                                        <li key={i} 
                                            data-index={i} 
                                            className={this.state.currentIndex === i ? 'current item' : 'item'}>{v.nav}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="list-fixed" ref="fixed">
                    {
                        this.fixedTitle() ? <h1 className="fixed-title">
                            {this.fixedTitle()}
                        </h1> : ''
                    }
                    </div>
                </Scroll>
            </ListViewWrap>
        )
    }

    componentDidMount () {
        initSimpleImg();

        setTimeout(() => {
            this._calculateHeight();
        }, 20);  
    }

    componentDidUpdate () {
        // console.log(this.state.scrollY)
        // console.log(this.state.scrollY)
        const listHeight = this.listHeight;
        // 当滚动到顶部，this.state.scrollY > 0
        if (this.state.scrollY > 0) {
            this.setState({
                currentIndex: 0
            });
            return ;
        }
        
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
            let height1 = listHeight[i];
            let height2 = listHeight[i + 1];
            if (-this.state.scrollY >= height1 && -this.state.scrollY < height2) {
                this.setState({
                    currentIndex: i,
                    diff: height2 + this.state.scrollY
                }, () => {
                    let fixedTop = (this.state.diff > 0 && this.state.diff < TITLE_HEIGHT) ? this.state.diff - TITLE_HEIGHT : 0;
                    if (this.state.fixedTop === fixedTop) {
                        return;
                    }
                    this.setState({
                        fixedTop: fixedTop
                    }, () => {
                        this.refs.fixed.style.transform = `translate3d(0, ${this.state.fixedTop}px, 0)`;
                    });
                });
                return false;
            } 
        }

        // 当滚动到底部，且-this.state.scrollY大于最后一个元素的上级
        this.setState({
            currentIndex: listHeight.length - 2
        });
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
        let firstTouch = e.touches[0];
        this.touch.y2 = firstTouch.pageY;
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
        let anchorIndex = parseInt(this.touch.anchorIndex, 10) + delta;
        this._scrollTo(anchorIndex);
    }

    onClickSelectItem (item) {
        this.props.onClickSelectItem(item);
    }

    onScroll (pos) {
        this.setState({
            scrollY: pos.y
        });
    }

    _scrollTo (index) {
        // 点击顶部或底部没有数据的地方时，阻止代码运行
        if (!index && index !== 0) {
            return;
        }

        // 拖动超出顶部区域或拖动超出底部区域时，阻止代码运行
        if (index < 0) {
            index = 0;
        } else if (index > this.listHeight.length - 2) {
            index = this.listHeight.length - 2;
        }

        // 设置当前滚动的y值
        this.setState({
            scrollY: -this.listHeight[index]
        }, () => {
            // 滚动到当前元素
            this.refs.listview.scrollToElement(this.refs['listGroup' + index], 0);
        });
    }

    _calculateHeight () {
        this.listHeight = [];
        const list = this.refs;
        let height = 0;
        this.listHeight.push(height);
        for (let i in list) {
            if (list[i].nodeName === 'LI') {
                height += list[i].clientHeight;
                this.listHeight.push(height);
            }
        }
    }

    fixedTitle () {
        if (this.state.scrollY > 0) {
            return ''
        }
        const { listviewData } = this.props;
        return listviewData[this.state.currentIndex] ? listviewData[this.state.currentIndex].title : ''
    }
}