import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavBar, Icon, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
// import BScroll from 'better-scroll';
import { actionCreators } from './store';
import {
    DetailWrap,
    DetailBanner,
    PlayWrapper,
    Play,
    Filter,
    DetailLayer,
    ItemWrap,
    Item,
    Title,
    Desc,
} from './style';

class Detail extends PureComponent {
    render () {
        const { type, playlist } = this.props;

        return (
            <DetailWrap>
                <NavBar
                    mode="dark"
                    leftContent={<Icon type="left" />}
                    onLeftClick={() => this.props.goBack()}
                >{playlist.name}</NavBar>
                {
                    type === 0 ? '' :
                    type === 1 ? this.renderDetail(playlist) :
                    type === 2 ? 'fail' : null
                }
            </DetailWrap>
        )
    }

    renderDetail (data) {
        return (
            <Fragment>
                <DetailBanner imgUrl={data.coverImgUrl}>
                    <PlayWrapper>
                        <Play>
                            <i className="icon-play" />
                            <span className="text">随机播放全部</span>
                        </Play>
                    </PlayWrapper>
                    <Filter />
                </DetailBanner>
                <DetailLayer className="wrapper-layer">
                    <ItemWrap className="content">
                        {
                            data.tracks.map(v => {
                                return (
                                    <Item key={v.id}>
                                        <div className="item">
                                            <Title>
                                                {v.name}
                                            </Title>
                                            <Desc>
                                                {v.ar[0].name}
                                            </Desc>
                                        </div>
                                    </Item>
                                )
                            })
                        }
                    </ItemWrap>
                </DetailLayer>
            </Fragment>

        )
    }

    componentDidMount () {
        let id = this.props.match.params.id;
        this.props.getDetailInfo(id);
    }

    componentDidUpdate () {
        /*if (this.props.playlist.id) {
            if (this.props.playlist.tracks.length) {
                const wrapper = document.querySelector('.wrapper-layer');
                new BScroll(wrapper, {
                    click: true
                });
            }
        }*/

        this.loadingToast();
    }

    loadingToast () {
        Toast.loading('Loading...', 1);
    }
}

const mapStateToProps = (state) => {
    return {
        type: state.getIn(['detail', 'state']),
        playlist: state.getIn(['detail', 'playlist'])
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailInfo(id) {
            dispatch(actionCreators.getDetailInfo(id))
        },
        goBack() {
            this.history.goBack();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Detail));