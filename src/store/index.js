import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  orders,
  order,
  driver,
  product,
  accounts,
  account,
  accountKeyword,
  transactions,
  deliverDate,
  transactionDate
} from "./reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

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
  transactionDate
});

const store = createStore(
  appReducers,
  {
    deliverDate: new Date(),
    //transaction start time needs to be set to midnight of today, and end time is the time now
    transactionDate: {
      startDate: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        0,
        0,
        0
      ),
      endDate: new Date(),
    },
    orders: [],
    order: {},
    driver: {},
    product: {},
    accounts: [],
    account: {},
    accountKeyword: "",
    transactions: [],
  },
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
);

export default store;
