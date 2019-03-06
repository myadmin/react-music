import axios from 'axios';

export default class Song {
    constructor({ id, singer, name, album, duration, image, url }) {
        this.id = id;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric);
        }

        return new Promise((resolve, reject) => {
            getSongLyric(this.id).then(res => {
                if (res.status === 200) {
                    this.lyric = res.data.lrc.lyric;
                    resolve(this.lyric)
                } else {
                    reject('no lyric');
                }
            });
        })
    }
}

// 获取歌词
function getSongLyric(id) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.pushemail.xyz/lyric?id=${id}`)
        .then(res => {
            resolve(res);
        }, () => {
            reject();
        });
    });
}

export function createSong(musicData) {
    return new Song({
        id: musicData.id,
        mid: musicData.al.pic_str,
        singer: filterSinger(musicData.ar),
        name: musicData.name,
        album: musicData.al.name,
        duration: parseInt(musicData.dt / 1000, 10),
        image: replaceImage(musicData.al.picUrl),
        url: `https://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    });
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return ''
    }
    singer.forEach(v => {
        ret.push(v.name);
    });
    return ret.join('/');
}

function replaceImage (image) {
    return image ? image.replace(/^http/, 'https') : image;
}