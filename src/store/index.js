import { createStore, combineReducers, applyMiddleware } from 'redux'
import { orders, order,driver, accounts, account, accountKeyword, transactions, deliverDate } from './reducers'
import thunk from 'redux-thunk';

const appReducers = combineReducers({
  deliverDate,
  orders, 
  order, 
  driver,
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
    driver:{},
    accounts: [], 
    account:{}, 
    accountKeyword:'', 
    transactions:[],
},
  applyMiddleware(thunk)
);

export default store; 