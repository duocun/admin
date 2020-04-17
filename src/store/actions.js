import {AccountAPI} from '../account/API';
import {TransactionAPI} from '../transaction/API';

export const loadOrders = payload => {
  return {
    type: 'LOAD_ORDERS',
    payload
  }
}

// payload --- order object
export const selectOrder = payload => ({
  type: 'SELECT_ORDER',
  payload
})

// payload --- order object
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

// async actions
export const getAccountsAsync = keyword => {
  const accountSvc = new AccountAPI();
  return (dispatch) => {
    return accountSvc.find(null, keyword).then(
      (accounts) => dispatch(loadAccounts(accounts))
    );
  }
} 

export const getTransactionsAsync = account => {
  const transactionSvc = new TransactionAPI();
  return (dispatch) => {
    const q = {$or: [
      { fromId: account._id },
      { toId: account._id }
    ]};
    return transactionSvc.find(q).then(
      (accounts) => dispatch(loadTransactions(accounts))
    );
  }
} 