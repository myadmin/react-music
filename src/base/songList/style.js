import styled from 'styled-components';

export const SongListWrap = styled.div`
    .item{
        display: flex;
        align-items: center;
        height: 64px;
        font-size: 14px;
        .content{
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #fff;
            }
            .desc{
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                margin-top: 4px;
                color: hsla(0,0%,100%,.3);
            }
        }
    }
`;
