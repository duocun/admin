import React from "react";
import { connect } from "react-redux";

import AccountListItem from "./AccountListItem";

import "./AccountList.scss";

export const AccountList = ({ accounts, account, accountListDisplay }) => {
  return (
    <div
      className={
        accounts && accounts.length >= 5
          ? accountListDisplay
            ? "list account-list account-list-scroll"
            : "list account-list account-list-scroll hide"
          : (accountListDisplay
            ? "list account-list account-list"
            : "list account-list account-list hide")
      }
    >
      {accounts &&
        accounts.length > 0 &&
        !account &&
        accounts.map((a) => <AccountListItem key={a._id} item={a} />)}
    </div>
  );
};

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  account: state.account,
  accountListDisplay: state.accountListDisplay,
});
export default connect(mapStateToProps)(AccountList);
