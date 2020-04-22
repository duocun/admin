import React, { useState } from "react";
import { connect } from "react-redux";
import {
  getAccountsAsync,
  setAccountKeyword,
  setAccountListDisplay,
} from "../store/actions";
import "./AccountSearchBox.scss";

const AccountSearchBox = ({
  accountKeyword,
  onChangeKeyword,
  accountListDisplay,
  setAccountListDisplayDispatch,
}) => {
  const handleOnchange = (e) => {
    onChangeKeyword(e.target.value);
  };

  const handleOnFocus = (e) => {
    setAccountListDisplayDispatch(true);
    onChangeKeyword(e.target.value);
  };

  return (
    <div className="search-box">
      <input
        placeholder="查找用户名"
        onChange={handleOnchange}
        value={accountKeyword}
        onFocus={handleOnFocus}
        onBlur={() => setAccountListDisplayDispatch(false)}
      />
      {/* <div onChange={getAccountsByKeyword}/> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  accountKeyword: state.accountKeyword,
  accountListDisplay: state.accountListDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeKeyword: (property) => {
    dispatch(setAccountKeyword(property));
    setTimeout(() => {
      dispatch(getAccountsAsync(property));
    }, 500);
  },
  setAccountListDisplayDispatch: (boolean) => {
    setTimeout(() => {
      dispatch(setAccountListDisplay(boolean));
    }, 500);
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(AccountSearchBox);
