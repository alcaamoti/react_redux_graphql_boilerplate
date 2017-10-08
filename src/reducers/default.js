import {DEFAULT_ACTION} from '../actions/types';

export default (state = null, action)=>{
    switch(action.type){
        case DEFAULT_ACTION:
            return action.payload ? action.payload : null;
    }

    return state;
}