import styled from 'styled-components';
import IconImage from '../../static/img/logo.png';

export const HeaderWrap = styled.div`
    position: relative;
    height: 44px;
    text-align: center;
    color: #ffcd32;
    font-size: 0;
`;

export const Icon = styled.div`
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
    width: 90px;
    height: 25px;
    margin-right: 12px;
    background: url(${IconImage}) center center no-repeat;
    background-size: 100%;
`;

export const Title = styled.h1`
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: 18px;
`;

export const NavWrap = styled.div`
    display: flex;
    height: 44px;
    line-height: 44px;
    font-size: 14px;
    .active {
        span {
            color: #ffcd32;
            border-bottom: 2px solid #ffcd32;
        }
    }
`;

export const NavItem = styled.div`
    flex: 1;
    text-align: center;
    span {
        padding-bottom: 5px;
        color: hsla(0,0%,100%,.5);
    }
`;