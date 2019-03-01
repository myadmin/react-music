import styled from 'styled-components';

export const MusicListWrap = styled.div`
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #222;
    .bg-layer{
        position: relative;
        height: 100%;
        background: #222;
    }
    .wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        width: 100%;
        background: #222;
        .song-list-wrapper{
            padding: 20px 30px;
        }
    }
`;

export const BackWrap = styled.div`
    position: absolute;
    top: 6px;
    z-index:  50;
    .icon-back{
        display: block;
        padding: 10px;
        font-size: 22px;
        color: #ffcd32;
    }
`;

export const Title = styled.h1`
    position: absolute;
    top: 0;
    left: 10%;
    z-index: 40;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
`;

export const BgImage = styled.div`
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-image: url(${props => props.bgStyle});
    background-size: cover;
`;

export const PlayWrapper = styled.div`
    position: absolute;
    bottom: 20px;
    z-index: 50;
    width: 100%;
    .play{
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