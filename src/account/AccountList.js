import React from 'react';
import {connect} from 'react-redux';

import AccountListItem from './AccountListItem';

import "./AccountList.scss";

export const AccountList = ({accounts, account}) => {
  return (
    <div className={(accounts&& accounts.length >=5) ? "list account-list account-list-scroll" : "list account-list"}>
    {
      accounts && accounts.length > 0 && !account &&
      accounts.map(a => <AccountListItem key={a._id} item={a}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  accounts: state.accounts,
  account: state.account
});
export default connect(mapStateToProps)(AccountList);