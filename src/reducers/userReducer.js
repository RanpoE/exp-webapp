import { GET_USER_SUCCESS } from "../actions/userAction";

const initState = { user: [] };

const myReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USER_SUCCESS:
            return { ...state, user: action.user };
        default:
            return state;
    }
}

export default myReducer;