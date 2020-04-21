import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FinanceHeader from "./FinanceHeader";
import { NavBar, Menu } from "../ui/NavBar";
import AccountList from "./AccountList";

import {
  getTransactionsByDateRangeAsync,
  loadAccounts,
} from "../store/actions";

const FinanceException = ({
  transactionDate,
  transactions,
  // accounts,
  getTransactionAsyncDispatch,
}) => {
  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    getTransactionAsyncDispatch(transactionDate);
  }, [transactionDate.startDate, transactionDate.endDate]);

  useEffect(() => {
    if (transactions.length > 0) {
      //get accounts from all of these transactions by alphabet
      let accounts = filterAccountsFromTransactions(transactions);
      setAccountsList(accounts)
    }
  }, [transactions]);

  //put this somewhere else
  /**
   *
   * @param {Array<object>} transactions
   *
   * **/

  const filterAccountsFromTransactions = (transactions) => {
    //make a hash table for account name
    let accountHash = {},
    accounts = [];
    //loop through transactions array to look for account name which is new
    for (let transaction of transactions) {
      let accountName = transaction.fromName;
      //if account hash does not have the account name yet
      if (accountHash[accountName] == undefined) {
        //put the new name into accountHash
        //give it value 1 indicating it has the account name now
        accountHash[accountName] = 1;
      }
    }
    //sort the accountHash into an array which is the account array
    accounts = Object.keys(accountHash).sort();
    //return the account array
    return accounts;
  };

  return (
    <div className="page">
      <div className="nav-menu-bar">
        <NavBar selected={Menu.Order} />
      </div>
      <div className="page-content">
        <FinanceHeader />
        <div className="page-body">
          <div className="left"></div>
          <div className="right">
            <AccountList accounts = {accountsList}/>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transactionDate: state.transactionDate,
  transactions: state.transactions,
  accounts: state.accounts,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionAsyncDispatch: (transactionDate) =>
    dispatch(getTransactionsByDateRangeAsync(transactionDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceException);
