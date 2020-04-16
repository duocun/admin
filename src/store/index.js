import { createStore, combineReducers } from 'redux'
import { orders, order } from './reducers'

const appReducers = combineReducers({orders, order});

const store = createStore(appReducers, {orders: []});

export default store; 