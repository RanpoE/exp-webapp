// ...
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import mySaga from './sagas'
import userReducer from '../reducers/userReducer'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = configureStore({
      reducer: {
        user: userReducer
      }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// then run the saga
sagaMiddleware.run(mySaga)

export default store;
// const action = type => store.dispatch({ type })
// render the application