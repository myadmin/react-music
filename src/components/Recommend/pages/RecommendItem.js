import React, { PureComponent, Fragment } from 'react';
import BScroll from 'better-scroll';
import { RecommendItemWrap, List, Item, Icon, Text } from '../style';

class RecommendItem extends PureComponent {
    render () {
        const { data } = this.props;
        return (
            <Fragment>
                <RecommendItemWrap className="wrapper">
                    <List className="content">
                        {
                            data.map(v => {
                                return (
                                    <Item key={v.name} onClick={() => this.props.detail(v.id)}>
                                        <Icon>
                                            <img src={v.coverImgUrl} alt={v.name}/>
                                        </Icon>
                                        <Text>
                                            <h2>{v.name}</h2>
                                            <p>{v.copywriter}</p>
                                        </Text>
                                    </Item>
                                )
                            })
                        }
                    </List>
                </RecommendItemWrap>
            </Fragment>
        )
    }

    componentDidMount () {
        // console.log(this.props.data);
        if (this.props.data.length)
        {
            const wrapper = document.querySelector('.wrapper');
            new BScroll(wrapper, {
                click: true
            });
        }
    }
}

export default RecommendItem;