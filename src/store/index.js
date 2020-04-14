import { createStore, combineReducers } from 'redux'
import { orderReducer } from './reducers'

const appReducers = combineReducers({orders: orderReducer});

const store = createStore(appReducers, {orders: []});

export default store; 