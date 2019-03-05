import styled from 'styled-components';

export const ProgressCircleWrapper = styled.div`
    position: relative;
    circle{
        stroke-width: 8px;
        transform-origin: center;
        &.progress-background{
            transform: scale(0.9);
            stroke: rgba(255,205,49,.5);
        }
        &.progress-bar{
            transform: scale(0.9) rotate(-90deg);
            stroke: #ffcd32;
        }
    }
`;