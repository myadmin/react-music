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