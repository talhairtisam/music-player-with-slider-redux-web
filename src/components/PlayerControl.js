import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { forwardAction, backwardAction, toggleAction } from '../redux/action';
import { connect } from 'react-redux';

const PlayerControl = ({backward,forward,toggle,isPlaying}) => {
    
    
    return (
        <div className='playerControl'>
                
            <button 
            className='skipBtn'
            onClick={()=>backward()}
            >
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className='centerBtn' 
            onClick={()=> toggle()}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button 
            className='skipBtn'
            onClick={()=>forward()}
            >
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
        
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        forward: () => dispatch(forwardAction()),
        backward: () => dispatch(backwardAction()),
        toggle: () => dispatch(toggleAction())
    }
}

const mapStateToProps = (state) => {
    return {
        isPlaying: state.isPlaying
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PlayerControl);
