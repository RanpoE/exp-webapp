import { GET_USER_SUCCESS, HIDE_USER } from "../actions/userAction";

const initState = { user: [], loading: false };

const myReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USER_SUCCESS:
            return { ...state, user: action.user };
        case HIDE_USER:
            return {...state, user: []};
        default:
            return state;
    }
}

export default myReducer;