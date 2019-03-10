import styled from 'styled-components';

export const RankWrapper = styled.div`
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .toplist{
        height: 100%;
        overflow: hidden;
        .item{
            display: flex;
            margin: 0 20px;
            padding-top: 20px;
            height: 100px;
            &:last-child{
                padding-bottom: 20px;
            }
            .icon{
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
            }
            .songlist{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 0 20px;
                height: 100px;
                overflow: hidden;
                background: #333;
                color: hsla(0,0%,100%,.3);
                font-size: 12px;
                .song{
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    line-height: 26px;
                    span{
                        display: inline-block;
                        margin-right: 6px;
                    }
                }
            }
        }
    }
`;
