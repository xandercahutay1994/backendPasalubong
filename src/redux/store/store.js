import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import user from '../reducers/user'
import product from '../reducers/product'
import route from '../reducers/route'
import seller from '../reducers/seller'
import buyer from '../reducers/buyer'
import cart from '../reducers/cart'

import sagas from '../sagas/sagas'
import { loadFromStorage } from '../storage'

const sagaMiddleware = createSagaMiddleware()
const reducers = combineReducers({
    user,
    product,
    route,
    seller,
    buyer,
    cart
})
const persistedState = loadFromStorage()

const store = createStore(
    reducers,
    persistedState,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(sagas)

export default store