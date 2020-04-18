import { createStore, combineReducers, applyMiddleware } from 'redux'
import { orders, order, accounts, account, accountKeyword, bAccountOptions, transactions } from './reducers'
import thunk from 'redux-thunk';

const appReducers = combineReducers({orders, order, accounts, account, accountKeyword, bAccountOptions, transactions});

const store = createStore(
  appReducers,
  {orders: [],  order: {}, accounts: [], account:{}, accountKeyword:'', bAccountOptions:false, transactions:[]},
  applyMiddleware(thunk)
);

export default store; 