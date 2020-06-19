import {createStore} from 'redux';
import  reducer from './reducers/reducer'

// const reducer = combineReducers({...reducers});

export default createStore(reducer);