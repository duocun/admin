import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTransactionsAsync } from "../store/actions";

import { ExceptionAccountListItem } from "./ExceptionAccountListItem";

const ExceptionAccountList = ({ accounts,transactionDate, getTransactionsAsyncDispatch }) => {
  //initialize with first account
  const firstAccount = accounts[0];
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    setSelectedAccount(firstAccount);
  }, [accounts]);

  useEffect(() => {
    //avoiding "" or undefined send out a request
    if (selectedAccount && selectedAccount.name !== "" && selectedAccount.name !== undefined) {
      getTransactionsAsyncDispatch(selectedAccount, transactionDate);
    }
  }, [selectedAccount]);

  return (
    <div className="list account-list">
      <div
      className="list-item account-item"
    >
      用户名
    </div>
      {accounts &&
        accounts.length > 0 &&
        accounts.map((account, index) => (
          <ExceptionAccountListItem
            key={index}
            account={account}
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
          />
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  transactionDate: state.transactionDate,
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionsAsyncDispatch: (account, transactionDate) =>
    dispatch(getTransactionsAsync(account, transactionDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExceptionAccountList);
