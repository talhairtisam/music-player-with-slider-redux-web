import { actionType } from "./actionType";

export const forwardAction =() => {
    return {
        type: actionType.FORWARD
    }
}


export const backwardAction =() => {
    return {
        type: actionType.BACKWARD
    }
}

export const toggleAction =() => {
    return {
        type: actionType.TOGGLE
    }
}

export const setCurrentTimeAction = (time) => {
    return {
        type: actionType.SETCURRENTTIME,
        payload: time
    }
}

export const setDurationAction = (duration) => {
    return {
        type: actionType.SETDURATION,
        payload: duration
    }
}


