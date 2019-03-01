import styled from 'styled-components';

export const ListViewWrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #222;
    .wrapper{
        height: 100%;
        overflow: hidden;
    }
    .list-group{
        padding-bottom: 30px;
        touch-action: none;
        .list-group-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            color: rgba(255, 255, 255, .5);
            background: #333;
        }
        .list-group-item{
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;
            .avatar{
                width: 50px;
                height: 50px;
                border-radius: 50%
            }
            .name{
                margin-left: 20px;
                color: hsla(0,0%,100%,.5);
                font-size: 14px;
            }
        }
    }
    .list-shortcut{
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 26px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: rgba(0,0,0,.3);
        font-family: Helvetica;
        .item{
            padding: 3px;
            line-height: 1;
            color: hsla(0,0%,100%,.5);
            font-size: 12px;
            &.current{
                color: #ffcd32;
            }
        }
    }
    .list-fixed{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        .fixed-title{
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: 12px;
            color: hsla(0,0%,100%,.5);
            background: #333;
        }
    }
`;