import styled from 'styled-components';

export const SearchBoxWrapper = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    padding: 0 6px;
    height: 40px;
    background: #333;
    border-radius: 6px;
    .icon-search{
        font-size: 24px;
        color: #222;
    }
    .box{
        flex: 1;
        margin: 0 5px;
        line-height: 18px;
        background: #333;
        color: #fff;
        font-size: 14px;
        outline: 0;
        &::placeholder{
            color: rgba(255,255,255,0.3);
        }
    }
    .icon-dismiss{
        font-size: 16px;
        color: #222;
    }
`;