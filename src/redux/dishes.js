import { DISHES } from '../shared/dishes';

import * as ActionTypes from '../redux/ActionTypes';
export const Dishes=(state={
    isloading:true,
    errmess:null,
    dishes:[]
},action)=>{
    switch(action.type){
        case ActionTypes.ADD_DISHES:
            return {...state,isloading:false,errmess:null,dishes:action.payload}
            
        case ActionTypes.DISHES_LOADING:
            return {...state,isloading:true,errmess:null,dishes:[]}

        case ActionTypes.DISHES_FAILED:
            return {...state,isloading:false,errmess:action.payload}

        default:
            return state;
    }
};