import { createStore, combineReducers, applyMiddleware } from 'redux'
import { orders, order,driver,product, accounts, account, accountKeyword, 
  transactions, deliverDate, productCountList,
  merchants, merchant, merchantSchedules, merchantScheduleGroup
 } from './reducers';

import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const appReducers = combineReducers({
  deliverDate,
  orders, 
  order, 
  driver,
  product,
  accounts, 
  account, 
  accountKeyword, 
  transactions,
  productCountList,
  merchants,
  merchant,
  merchantSchedules,
  merchantScheduleGroup
});

const store = createStore(
  appReducers,
  {
    deliverDate: new Date(),
    orders: [],  
    order: {}, 
    driver:{},
    product:{},
    accounts: [], 
    account:{}, 
    accountKeyword:'', 
    transactions:[],
    productCountList:[],
    merchants:[],
    merchant:{},
    merchantSchedules:[],
    merchantScheduleGroup: {}
},composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));
  

export default store; 