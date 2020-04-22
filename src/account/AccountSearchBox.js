import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getAccountsAsync,
  setAccountKeyword,
  selectAccount,
} from "../store/actions";
import "./AccountSearchBox.scss";

const AccountSearchBox = ({
  account,
  onChangeKeyword,
  selectAccountDispatch,
}) => {
  const handleOnchange = (e) => {
    selectAccountDispatch(e.target.value);
    onChangeKeyword(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        placeholder="查找用户名"
        onChange={handleOnchange}
        value={account}
      />
      {/* <div onChange={getAccountsByKeyword}/> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeKeyword: (property) => {
    dispatch(setAccountKeyword(property));
    setTimeout(() => {
      dispatch(getAccountsAsync(property));
    }, 500);
  },
  selectAccountDispatch: (value) => {
    dispatch(selectAccount(value));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountSearchBox);
