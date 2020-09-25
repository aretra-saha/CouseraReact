import * as ActionTypes from './ActionTypes';

export const Leaders = (state = { isLoading: true,
    errMess: null,
    leaders:[]}, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_LEADERS_ADD:
            return {...state, isLoading: false, errMess: null, leaders: action.payload}

        case ActionTypes.FETCH_LEADERS_LOADING:
            return {...state, isLoading: true, errMess: null, leaders: []}

        case ActionTypes.FETCH_LEADERS_FAILD:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
    }
};