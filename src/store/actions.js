import {
  AccountAPI
} from '../account/API';
import {OrderType} from '../order/OrderModel';

import {
  TransactionAPI
} from '../transaction/API';
import {OrderAPI} from '../order/API';
import {MerchantAPI, ScheduleAPI} from '../merchant/API';
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

// payload {driverId, orders}
export const getProductCountByDriver = (payload) => ({
  type: 'GET_PRODUCT_COUNT_BY_DRIVER',
  payload
});


export const loadMerchants = (payload) => ({
  type: 'LOAD_MERCHANTS',
  payload
});

export const loadMerchantSchedules = payload => {
  return {
    type: 'LOAD_MERCHANT_SCHEDULES',
    payload
  }
}

// payload --- merchantSchedule object
export const selectMerchantScheduleGroup = payload => ({
  type: 'SELECT_MERCHANT_SCHEDULE_GROUP',
  payload
})

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

export const getTransactionsAsync = account => {
  const transactionSvc = new TransactionAPI();
  return (dispatch) => {
    const q = {
      $or: [{
          fromId: account._id
        },
        {
          toId: account._id
        }
      ]
    };
    return transactionSvc.find(q).then(
      (accounts) => dispatch(loadTransactions(accounts))
    );
  }
}

export const getMerchantsAsync = d => {
  const merchantSvc = new MerchantAPI();
  return (dispatch) => {
    const q = {type: OrderType.GROCERY};
    return merchantSvc.find(q).then(
       merchants => dispatch(loadMerchants(merchants)),
    );
  }
}

export const getMerchantSchedulesAsync = () => {
  const scheduleSvc = new ScheduleAPI();
  return (dispatch) => {
    const q = {};
    return scheduleSvc.find(q).then(
       schedules => dispatch(loadMerchantSchedules(schedules)),
    );
  }
}

export const updateMerchantSchedulesAsync = (d) => {
  const scheduleSvc = new ScheduleAPI();
  
  return (dispatch) => {
    return scheduleSvc.createOrUpdateMechantSchedules(d).then(
      schedules => dispatch(loadMerchantSchedules(schedules))
    );
  }
}
