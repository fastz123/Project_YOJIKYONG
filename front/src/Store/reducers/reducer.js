import {SET_DATA} from '../constants'
import { combineReducers} from 'redux';


const initialState = {
    stores : [
        
    ]
}

const stores =(state = initialState, action) => {
    console.log(action.type)
    switch(action.type){
        case SET_DATA:
           
            return{...state, stores: action.stores};
        default:
            return state;
    }
}

const reducer = combineReducers({stores});

export default reducer