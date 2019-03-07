import React, { Component } from 'react'

const PlaylistMixin = (WrapperComponent) => {
    return class extends Component {
        constructor() {
            super(...arguments);

            this.handlePlaylist = this.handlePlaylist.bind(this);
        }

        render () {
            const props = {
                ...this.props,
            };

            props.ref = (el)=>{
                this.props.getInstance && this.props.getInstance(el);
                this.props.ref && this.props.ref(el);
            }

            return <WrapperComponent {...props} />
        }

        componentDidMount () {
            console.log('高阶组件');
        }

        componentDidUpdate() {
            if (this.props.playlist.size) {
                this.handlePlaylist(this.props.playlist);
            }
        }

        handlePlaylist(playlist) {
            console.log(playlist, this.ref)
            // const bottom = playlist.length > 0 ? '60px' : '';
            // this.refs.list.refs.wrapper.style.bottom = bottom;
            // this.refs.list.refresh();
        }
    }
}

export default PlaylistMixin;
