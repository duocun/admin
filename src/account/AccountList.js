import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { selectAccount, setAccountKeyword, getTransactionsAsync } from "../store/actions";

import AccountListItem from "./AccountListItem";

import "./AccountList.scss";

//for finance page use

export const AccountList = ({
  accounts,
  accountListDisplay,
  transactionDate,
  onSelectAccountDispatch,
  getTransactionsByNameAsyncDispatch
}) => {
  const [account, setAccount] = useState({});

  const onSelectAccount = (account) => {
    onSelectAccountDispatch(account);
    setAccount(account);
  };

  useEffect(() => {
    if(Object.keys(account).length !== 0 && account.constructor === Object){
      getTransactionsByNameAsyncDispatch(account, transactionDate);
    }
  }, [JSON.stringify(account), JSON.stringify(transactionDate)]);

  return (
    <div
      className={
        accounts && accounts.length >= 5
          ? accountListDisplay
            ? "list account-list account-list-scroll"
            : "list account-list account-list-scroll hide"
          : accountListDisplay
          ? "list account-list account-list"
          : "list account-list account-list hide"
      }
    >
      {accounts &&
        accounts.length > 0 &&
        accounts.map((a) => (
          <AccountListItem
            key={a._id}
            item={a}
            onSelectAccount={onSelectAccount}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  accountListDisplay: state.accountListDisplay,
  transactionDate: state.transactionDate,
});

const mapDispatchToProps = (dispatch) => ({
  onSelectAccountDispatch: (account) => {
    dispatch(selectAccount(account.username));
    dispatch(setAccountKeyword(account.username));
  },
  getTransactionsByNameAsyncDispatch: (account, transactionDate) =>{
    dispatch(getTransactionsAsync(account, transactionDate));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountList);
