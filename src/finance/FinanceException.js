import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FinanceHeader from "./FinanceHeader";
import { NavBar, Menu } from "../ui/NavBar";
import AccountList from "./AccountList";
import TransactionList from "./TransactionList";

import {
  getTransactionsByDateRangeAsync,
} from "../store/actions";

import './FinanceException.scss';

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
   * filter out the accounts for all the user appear in the transactions
   * **/

  const filterAccountsFromTransactions = (transactions) => {
    //make a hash table for account name
    let accountHash = {},
    tem = [],
    accounts = [];
    //loop through transactions array to look for account name which is new
    for (let transaction of transactions) {
      let fromName = transaction.fromName;
      let toName = transaction.toName;
      let fromId = transaction.fromId;
      let toId = transaction.toId;
      //if account hash does not have the from name yet
      if (accountHash[fromName] == undefined) {
        //put the new name into accountHash
        //give it the object contains the all the value indicating it has the account name now
        accountHash[fromName] = {name: fromName, _id: fromId};
      }
      //if account hash does not have the to name yet
      if(accountHash[toName] == undefined){
        accountHash[toName] = {name: toName, _id: toId};
      }
    }
    //sort the accountHash into an array which is the account array
    tem = Object.keys(accountHash).sort();
    //make new array from the object in account hash
    tem.map(name=>{
      accounts.push(accountHash[name])
    })
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
        <div className="page-body finance-exception-body">
          <div className="finance-exception-body-left">
            <TransactionList />
          </div>
          <div className="finance-exception-body-right">
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
