import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTransactionsAsync } from "../store/actions";

import { ExceptionAccountListItem } from "./ExceptionAccountListItem";

//for finance exception use

const ExceptionAccountList = ({ accounts,transactionDate, getTransactionsAsyncDispatch }) => {
  //initialize with first account
  const firstAccount = accounts[0];
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    setSelectedAccount(firstAccount);
  }, [accounts]);

  useEffect(() => {
    //avoiding "" or undefined send out a request
    if (selectedAccount !== "" && selectedAccount !== undefined) {
      getTransactionsAsyncDispatch(selectedAccount, transactionDate);
    }
  }, [JSON.stringify(selectedAccount), JSON.stringify(transactionDate)]);

  return (
    <div className="list account-exception-list">
      {accounts &&
        accounts.length >= 0 &&
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
  transactionDate: state.transactionDate
});

const mapDispatchToProps = (dispatch) => ({
  getTransactionsAsyncDispatch: (account, transactionDate) =>
    dispatch(getTransactionsAsync(account, transactionDate, true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExceptionAccountList);
