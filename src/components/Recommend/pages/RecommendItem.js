import React, { PureComponent } from 'react';
import { SimpleImg, initSimpleImg } from 'react-simple-img';
import Scroll from '../../../base/scroll';

import { RecommendItemWrap, List, Item, Icon, Text } from '../style';

class RecommendItem extends PureComponent {
    render () {
        const { data } = this.props;
        return (
            <RecommendItemWrap>
                <Scroll className="wrapper" recommend={data}>
                    <List className="content">
                        {
                            data.map(v => {
                                return (
                                    <Item key={v.name} onClick={() => this.props.detail(v.id)}>
                                        <Icon>
                                            <SimpleImg height={60} src={v.picUrl} />
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
                </Scroll>                
            </RecommendItemWrap>
        )
    }

    componentDidMount () {
        initSimpleImg();
    }
}

export default RecommendItem;