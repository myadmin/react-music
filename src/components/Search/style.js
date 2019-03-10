import styled from 'styled-components';

export const SearchWrapper = styled.div`
    .search-box-wrapper{
        margin: 20px;
    }
    .shortcut-wrapper{
        position: fixed;
        top: 178px;
        bottom: 0;
        width: 100%;
        .shortcut{
            height: 100%;
            overflow: hidden;
            .hot-key{
                margin: 0 20px 20px 20px;
                .title{
                    margin-bottom: 20px;
                    font-size: 14px;
                    color: hsla(0,0%,100%,.5);
                }
                .item{
                    display: inline-block;
                    padding: 5px 10px;
                    margin: 0 12px 10px 0;
                    border-radius: 6px;
                    background: #333;
                    font-size: 14px;
                    color: hsla(0,0%,100%,.3);
                }
            }
            .search-history{
                position: relative;
                margin: 0 20px;
                .title{
                    display: flex;
                    align-items: center;
                    height: 40px;
                    font-size: 14px;
                    color: hsla(0,0%,100%,.5);
                    .text{
                        flex: 1;
                    }
                    .clear{
                        position: relative;
                        &:before{
                            content: "";
                            position: absolute;
                            top: -10px;
                            left: -10px;
                            right: -10px;
                            bottom: -10px;
                        }
                        .icon-clear{
                            font-size: 14px;
                            color: hsla(0,0%,100%,.3);
                        }
                    }
                }
                .search-list{
                    .search-item{
                        display: flex;
                        align-items: center;
                        height: 40px;
                        overflow: hidden;
                        .text{
                            flex: 1;
                            color: hsla(0,0%,100%,.5);
                        }
                        .icon{
                            position: relative;
                            &:before{
                                content: "";
                                position: absolute;
                                top: -10px;
                                left: -10px;
                                right: -10px;
                                bottom: -10px;
                            }
                            .icon-delete{
                                font-size: 12px;
                                color: hsla(0,0%,100%,.3);
                            }
                        }
                    }
                }
            }
        }
    }
`;