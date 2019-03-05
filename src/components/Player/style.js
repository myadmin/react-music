import styled from 'styled-components';

export const PlayerWrap = styled.div`
    
    @keyframes rotate{
        0%{
            transform: rotate(0);
        }
        100%{
            transform: rotate(360deg);
        }
    }
`;

export const NormalPlayer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 150;
    background: #222;

    .background{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        opacity: 0.6;
        filter: blur(20px);
    }
    .top{
        position: relative;
        margin-bottom: 25px;
        .back{
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;
            .icon-back{
                display: block;
                padding: 9px;
                font-size: 22px;
                color: #ffcd32;
                transform: rotate(-90deg);
            }
        }
        .title{
            width: 70%;
            margin: 0 auto;
            line-height: 40px;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 18px;
            color: #fff;
        }
        .subtitle{
            line-height: 20px;
            text-align: center;
            font-size: 14px;
            color: #fff;
        }
    }
    .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
        .middle-l{
            display: inline-block;
            vertical-align: top;
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 80%;
            .cd-wrapper{
                position: absolute;
                left: 10%;
                top: 0;
                width: 80%;
                box-sizing: border-box;
                height: 100%;
                .cd{
                    width: 100%;
                    height: 100%;
                    box-sizing: border-box;
                    border: 10px solid rgba(255, 255, 255, .1);
                    border-radius: 50%;
                    &.play{
                        animation: rotate 20s linear infinite;
                    }
                    &.pause{
                        animation-play-state: paused;
                    }
                    .image{
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        box-sizing: border-box;
                        border-radius: 50%;
                        border: 10px solid hsla(0,0%,100%,.1);
                    }
                }
            }
            .playing-lyric-wrapper{
                width: 80%;
                margin: 30px auto 0;
                overflow: hidden;
                text-align: center;
                .playing-lyric{
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: hsla(0,0%,100%,.5);
                }
            }
        }
        .middle-r{
            display: inline-block;
            vertical-align: top;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .lyric-wrapper{
                width: 80%;
                margin: 0 auto;
                overflow: hidden;
                text-align: center
            }
        }
    }
    .bottom{
        position: absolute;
        bottom: 50px;
        width: 100%;
        .dot-wrapper{

        }
        .progress-wrapper{
            display: flex;
            align-items: center;
            width: 80%;
            margin: 0 auto;
            padding: 10px 0;
            .time{
                color: #fff;
                font-size: 12px;
                flex: 0 0 30px;
                line-height: 30px;
                width: 30px;
                &.time-l{
                    text-align: left;
                }
                &.time-r{
                    text-align: right;
                }
            }
            .progress-bar-wrapper{
                flex: 1;
            }
        }
        .operators{
            display: flex;
            align-items: center;
            .icon{
                flex: 1;
                color: #ffcd32;
                i{
                    font-size: 30px;
                }
                &.disable{
                    color: rgba(255,205,49,0.5);
                }
            }
            .i-left{
                text-align: right;
            }
            .i-center{
                padding: 0 20px;
                text-align: center;
                i{
                    font-size: 40px;
                }
            }
            .i-right{
                text-align: left;
            }
        }
    }
`;

export const MiniPlayer = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: #333;
    .icon{
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        padding: 0 10px 0 20px;
        .imgWrapper{
            height: 100%;
            width: 100%;
            img{
                border-radius: 50%;
                &.play{
                    animation: rotate 20s linear infinite;
                }
                &.pause{
                    animation-play-state: paused;
                }
            }
        }
    }
    .text{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name{
            margin-bottom: 2px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 14px;
            color: #fff;
        }
        .desc{
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 12px;
            color: hsla(0,0%,100%,.3);
        }
    }
    .control{
        flex: 0 0 30px;
        width: 30px;
        padding: 0 10px;
        .progress-circle{
            position: relative;
        }
        .icon-mini{
            font-size: 32px !important;
            position: absolute;
            left: 0;
            top: 0;
        }
        .icon-play-mini, .icon-pause-mini{
            font-size: 30px;
            color: rgba(255,205,49,.5);
        }
        .icon-playlist{
            font-size: 30px;
            color: rgba(255,205,49,.5);
        }
    }
`;