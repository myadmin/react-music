import React, { PureComponent, /*Fragment*/ } from 'react';
import { DetailWrap } from './style';

class Detail extends PureComponent {
    render () {
        return (
            <DetailWrap>
                {this.props.match.params.id}
            </DetailWrap>
        )
    }
}

export default Detail;