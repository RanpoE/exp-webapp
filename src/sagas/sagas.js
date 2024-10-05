import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_USER_FETCH, GET_USER_SUCCESS } from '../actions/userAction'

function userFetch() {
    return fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
}

function* workerGetUserFetch() {
    const user = yield call(userFetch);
    yield put({ type: GET_USER_SUCCESS, user });
}

function* mySaga() {
    yield takeEvery(GET_USER_FETCH, workerGetUserFetch);
}

export default mySaga;