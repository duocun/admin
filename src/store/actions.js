import {
  AccountAPI
} from '../account/API';
import {
  TransactionAPI
} from '../transaction/API';
import {OrderAPI} from '../order/API';
import {OrderStatus} from '../order/OrderModel';


export const loadOrders = payload => {
  return {
    type: 'LOAD_ORDERS',
    payload
  }
}
export const loadFilterOrders = payload => {
  return {
    type: 'LOAD_FILTER_ORDERS',
    payload
  }
}

// payload --- deliverDate string
export const setDeliverDate = payload => ({
  type: 'SET_DELIVER_DATE',
  payload
})

// payload --- order object
export const selectOrder = payload => ({
  type: 'SELECT_ORDER',
  payload
})

// payload --- product object
export const selectProduct= payload => ({
  type: 'SELECT_PRODUCT',
  payload
})

// payload --- driver object
export const selectDriver = payload => ({
  type: 'SELECT_DRIVER',
  payload
})


// payload --- keyword string
export const setAccountKeyword = (payload) => ({
  type: 'SET_ACCOUNT_KEYWORD',
  payload
});

export const loadAccounts = (payload) => ({
  type: 'LOAD_ACCOUNTS',
  payload
});

// payload --- account object
export const selectAccount = payload => ({
  type: 'SELECT_ACCOUNT',
  payload
})

export const loadTransactions = (payload) => ({
  type: 'LOAD_TRANSACTIONS',
  payload
});

export const loadTransactionsByAccount = (payload) => ({
  type: 'LOAD_TRANSACTIONS_BY_ACCOUNT',
  payload
});

//finance exception
export const setTransactionDate = payload => ({
  type: 'SET_TRANSACTION_DATE',
  payload
});

export const setAccountListDisplay = (payload) => ({
  type: 'SET_ACCOUNT_LIST_DISPLAY',
  payload
})

// payload {driverId, orders}
export const getProductCountByDriver = (payload) => ({
  type: 'GET_PRODUCT_COUNT_BY_DRIVER',
  payload
});

// async actions
export const getAccountsAsync = keyword => {
  const accountSvc = new AccountAPI();
  return (dispatch) => {
    return accountSvc.find(null, keyword).then(
      (accounts) => dispatch(loadAccounts(accounts))
    );
  }
}

export const getOrdersAsync = d => {
  const orderSvc = new OrderAPI();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const yy = d.getFullYear();
  const deliverDate = yy + '-' + (mm > 9 ? mm : '0' + mm) + '-' + (dd > 9 ? dd : '0' + dd);
  return (dispatch) => {
    const q = {
      deliverDate, // 'YYYY-MM-DD' {deliverDate: {$gte: 'YYYY-MM-DD', $lte: '<Today>YYYY-MM-DD' }}
      status: {
        $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP]
      }
    };
    return orderSvc.find(q).then(
       orders => dispatch(loadOrders(orders)),
    );
  }
}

export const getTransactionsAsync = (account, transactionDate) => {
  const transactionSvc = new TransactionAPI();
  let {startDate,endDate} = transactionDate;
  return (dispatch) => {
    const q = {
      $or: [{
          fromId: account._id
        },
        {
          toId: account._id
        }
      ],
      created: {$gte: startDate, $lte: endDate}
    };
    return transactionSvc.find(q).then(
      (accounts) => dispatch(loadTransactionsByAccount(accounts))
    );
  }
}

export const getTransactionsByDateRangeAsync = (transactionDate) => {
  const transactionSvc = new TransactionAPI();
  let {startDate,endDate} = transactionDate;
  startDate = transferDateToQueryForm(startDate);
  endDate = transferDateToQueryForm(endDate);
  return (dispatch) => {
    const q = {
        created: {$gte: startDate, $lte: endDate}
    };
    return transactionSvc.find(q).then(
      (accounts) => dispatch(loadTransactions(accounts))
    );
  }
}

/**
 * @param {Date} date The date, which is a new Date() UTC format
 */

//this function transfer date to the format that works for query
//this should be put somewhere else
const transferDateToQueryForm = (date) =>{
  // const mm = utcTime.getMonth() + 1;
  // const dd = utcTime.getDate();
  // const yy = utcTime.getFullYear();
  // const hour = utcTime.getHours();
  // const min = utcTime.getMinutes();
  // const sec = utcTime.getSeconds();
  // return yy + '-' + (mm > 9 ? mm : '0' + mm) + '-' + (dd > 9 ? dd : '0' + dd) + 'T' + hour + ":" + min + ":" + sec;
  return date.toISOString();
}