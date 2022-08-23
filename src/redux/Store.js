

import { rootReducer } from './reducer/root.reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../saga/root.saga'
import thunk from 'redux-thunk'


const SagaMiddleware = createSagaMiddleware()

const Middleware = [thunk , SagaMiddleware]

export const store = createStore(
     rootReducer,
    applyMiddleware(...Middleware)
)

SagaMiddleware.run(rootSaga);
