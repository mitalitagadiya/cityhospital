

import { rootReducer } from './reducer/root.reducer'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../saga/root.saga'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist : ['auth']
}

const SagaMiddleware = createSagaMiddleware()


const persistedReducer = persistReducer(persistConfig, rootReducer)
const Middleware = [thunk, SagaMiddleware]

export const store = createStore(
    persistedReducer,
    applyMiddleware(...Middleware)
)

SagaMiddleware.run(rootSaga);

export let persistor = persistStore(store)