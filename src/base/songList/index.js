import React, { PureComponent } from 'react';
import { SongListWrap } from './style'; 

class SongList extends PureComponent {
    render () {
        const { songs } = this.props;
        
        return (
            <SongListWrap>
                <ul>
                    {
                        songs.map(v => {
                            return (
                                <li key={v.id} className="item">
                                    <div className="content">
                                        <h2 className="name">{v.name}</h2>
                                        <p className="desc">{v.singer}·{v.album}</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </SongListWrap>
        )
    }
}

export default SongList;