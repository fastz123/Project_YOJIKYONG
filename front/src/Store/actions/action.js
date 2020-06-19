import {SET_DATA} from '../constants'

export function setData(data){
    return {
        type :SET_DATA,
        data:data
    }
}