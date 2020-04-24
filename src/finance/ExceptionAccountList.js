import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { getTransactionsByNameAsync } from "../store/actions";

import { ExceptionAccountListItem } from "./ExceptionAccountListItem";

//for finance exception use

const ExceptionAccountList = ({ accounts, getTransactionsByNameAsyncDispatch }) => {
  //initialize with first account
  const firstAccount = accounts[0];
  const [selectedAccount, setSelectedAccount] = useState("");

  useEffect(() => {
    setSelectedAccount(firstAccount);
  }, [accounts]);

  useEffect(() => {
    //avoiding "" or undefined send out a request
    if (selectedAccount !== "" && selectedAccount !== undefined) {
      getTransactionsByNameAsyncDispatch(selectedAccount);
    }
  }, [selectedAccount]);

  return (
    <div className="list account-list">
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  getTransactionsByNameAsyncDispatch: (account) =>
    dispatch(getTransactionsByNameAsync(account)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExceptionAccountList);
