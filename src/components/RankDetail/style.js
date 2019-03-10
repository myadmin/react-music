import styled from 'styled-components';

export const RankDetailWrapper = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #000;
    z-index: 100;
    
    &.slider {
        background-color: #90caf9;
    }

    &.slider-enter {
        animation: slideInRight 0.3s forwards;
    }

    &.slider-exit {
        animation: slideOutRight 0.3s forwards;
    }

    @keyframes slideInRight {
        from {
            transform: translate3d(100%, 0, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes slideOutRight {
        from {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }

        to {
            visibility: hidden;
            -webkit-transform: translate3d(100%, 0, 0);
            transform: translate3d(100%, 0, 0);
        }
    }
`;