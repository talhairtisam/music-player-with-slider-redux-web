import React,{ useRef, useEffect } from 'react';
import { SongDetail } from './SongDetail';
import PlayerControl from './PlayerControl';
import { connect } from 'react-redux';
import { setDurationAction,setCurrentTimeAction,forwardAction } from '../redux/action';


const Player = ({currentSong,nextSong,isPlaying,duration,setDuration,currentTime,setCurrentTime,forward}) =>{

    const audioEl = useRef();
    const progressBar = useRef();
    const animationRef = useRef();


    const calculateTime = (secs) => {
        const min = Math.floor(secs / 60);
        const retMin = min < 10 ? `0${min}` : `${min}`;
        const sec = Math.floor(secs % 60);
        const retSec = sec < 10 ? `0${sec}` : `${sec}`;
        return `${retMin}:${retSec}`;
    }


    const playing = ()=>{
        progressBar.current.value=audioEl.current.currentTime;
        setCurrentTime(audioEl.current.currentTime)
        animationRef.current = requestAnimationFrame(playing);
    }
    useEffect(()=>{
        if(isPlaying){
            audioEl.current.play();
            animationRef.current = requestAnimationFrame(playing);  
        }else{
            audioEl.current.pause(); 
            cancelAnimationFrame(animationRef.current);
        }
    });


    useEffect(()=>{
        const secDuration = Math.floor(audioEl.current.duration)
        setDuration(secDuration);
        progressBar.current.max = secDuration;
    },[audioEl?.current?.loadmetadata,audioEl?.current?.readyState]);

    const changeRange =()=>{
        audioEl.current.currentTime = progressBar.current.value;
        setCurrentTime(progressBar.current.value);
        if(currentTime === duration){
            forward();
        }
    }

    return(
        <div className="Player">
            <h2>Now Playing</h2>
            <audio 
            src={currentSong.src} 
            ref={audioEl}
            preload="metadata"
            ></audio>
            <SongDetail song={currentSong}/>
            <div className="slider">
                <p>{calculateTime(currentTime)}</p>
                <input type="range" defaultValue="0" 
                ref={progressBar}
                onChange={changeRange}
                />
                <p>{calculateTime(duration)}</p>
                 
            </div>
            <PlayerControl />
            <p><strong>Next up:</strong> {nextSong.title} by {nextSong.artist}</p>
        </div>
    );
}
// (duration && isNaN(duration)) &&
const mapDispatchToProps = (dispatch) => {
    return {
        setDuration: (event) => dispatch(setDurationAction(event)),
        setCurrentTime: (event) => dispatch(setCurrentTimeAction(event)),
        forward: () => dispatch(forwardAction())
    }
}
const mapStateToProps = (state) => {
    return {
        currentSong: state.currentSong,
        nextSong: state.nextSong,
        isPlaying: state.isPlaying,
        duration: state.duration,
        currentTime: state.currentTime
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Player);