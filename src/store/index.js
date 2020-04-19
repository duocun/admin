import { createStore, combineReducers, applyMiddleware } from 'redux'
import { orders, order, accounts, account, accountKeyword, transactions, deliverDate } from './reducers'
import thunk from 'redux-thunk';

const appReducers = combineReducers({
  deliverDate,
  orders, 
  order, 
  accounts, 
  account, 
  accountKeyword, 
  transactions
});

const store = createStore(
  appReducers,
  {
    deliverDate: new Date(),
    orders: [],  
    order: {}, 
    accounts: [], 
    account:{}, 
    accountKeyword:'', 
    transactions:[],
},
  applyMiddleware(thunk)
);

export default store; 