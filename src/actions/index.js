import {DEFAULT_ACTION} from './types'


export const defaultAction = (message)=>{
    return (dispatch)=>{
        dispatch({
            type: DEFAULT_ACTION,
            payload: message
        });
    }
}