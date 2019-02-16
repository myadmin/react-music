import styled from 'styled-components';

export const DetailWrap = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #222;
`;

export const DetailBanner = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 68%;
    transform-origin: top;
    background-image: url(${props => props.imgUrl});
    background-size: cover;
    transform: scale(1);
    z-index: 0;
`;

export const PlayWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
`;

export const Play = styled.div`
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid #ffcd32;
    color: #ffcd32;
    border-radius: 100px;
    font-size: 0;
    .icon-play{
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: 16px;
    }
    .text{
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
    }
`;

export const Filter = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7,17,27,.4);
`;

export const DetailLayer = styled.div`
    position: absolute;
    top: 300px;
    bottom: 0;
    width: 100%;
    background: #222;
`;

export const ItemWrap = styled.div`
    padding: 20px 30px;
`;


export const Item = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    height: 64px;
    font-size: 14px;
    .item{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }
`;

export const Title = styled.h2`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #fff;
`;

export const Desc = styled.p`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-top: 4px;
    color: hsla(0,0%,100%,.3);
`;