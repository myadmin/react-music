import styled from 'styled-components';

export const SongListWrap = styled.div`
    .item{
        display: flex;
        align-items: center;
        height: 64px;
        font-size: 14px;
        .rank{
            flex: 0 0 25px;
            width: 25px;
            margin-right: 30px;
            text-align: center;
            .icon{
                display: inline-block;
                width: 25px;
                height: 24px;
                background-size: 25px 24px;
                &.icon0{
                    background-image: url(${require('./first@2x.png')});
                }
                &.icon1{
                    background-image: url(${require('./second@2x.png')});
                }
                &.icon2{
                    background-image: url(${require('./third@2x.png')});
                }
            }
            .text{
                color: #ffcd32;
                font-size: 18px;
            }
        }
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
