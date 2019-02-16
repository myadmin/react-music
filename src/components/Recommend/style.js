import styled from 'styled-components';

export const RecommendWrap = styled.div`
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
`;

export const RecommendItemWrap = styled.div`
    height: 100%;
    overflow: hidden;
    .wrapper{
        height: 100%;
        overflow: hidden;
    }
`;

export const List = styled.ul`
    padding-top: 20px;
`;

export const Item = styled.li`
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px 20px;
`;

export const Icon = styled.div`
    flex: 0 0 60px;
    width: 60px;
    padding-right: 20px;
    img {
        width: 100%;
    }
`;

export const Text = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    line-height: 20px;
    overflow: hidden;
    font-size: 14px;
    h2 {
        margin-bottom: 10px;
        color: #fff;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
    }
    p {
        color: hsla(0,0%,100%,.3);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
    }
`;