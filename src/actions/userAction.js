export const GET_USER_FETCH = 'GET_USER_FETCH';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const HIDE_USER = 'HIDE_USER'

export const getUserFetch = () => ({
    type: GET_USER_FETCH
}); 

export const hideUsers = () => ({
    type: HIDE_USER
})