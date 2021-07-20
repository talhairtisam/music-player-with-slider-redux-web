import React from 'react';

export const SongDetail = (props) => {
    return (
        <div className="songDetail">
            <div className="song-img">
                <img src={props.song.img_src} alt="song thumbnail" />
            </div>
            <h3>{props.song.title}</h3>
            <h4>{props.song.artist}</h4>
        </div>
    )
}
