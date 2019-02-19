import styled from 'styled-components';

export const SingerWrap = styled.div`
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%;
    .loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .singer-detail{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #000;
        z-index: 100;
        transition: all .3s;
    }
`;