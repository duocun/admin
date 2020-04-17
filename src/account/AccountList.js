import React from 'react';
import {connect} from 'react-redux';

import AccountListItem from './AccountListItem';

export const AccountList = ({accounts}) => {
  return (
    <div className="list account-list">
    {
      accounts && accounts.length > 0 &&
      accounts.map(a => <AccountListItem key={a._id} item={a}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  accounts: state.accounts
});
export default connect(mapStateToProps)(AccountList);