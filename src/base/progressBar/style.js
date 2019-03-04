import styled from 'styled-components';

export const ProgressBarWrapper = styled.div`
    height: 30px;
`;

export const BarInner = styled.div`
    position: relative;
    top: 13px;
    height: 4px;
    background: rgba(0,0,0,.3);
`;

export const Progress = styled.div`
    position: absolute;
    height: 100%;
    background: #ffcd32;
`;

export const ProgressBtnWrapper = styled.div`
    position: absolute;
    left: -8px;
    top: -13px;
    width: 30px;
    height: 30px;
`;

export const ProgressBtn = styled.div`
    position: relative;
    top: 7px;
    left: 7px;
    box-sizing: border-box;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
    border-radius: 50%;
    background: #ffcd32;
`;
