import React from 'react';
import {connect} from 'react-redux';

import {AccountListItem} from './AccountListItem';

const AccountList = ({accounts}) => {
  return (
    <div className="list transaction-list">
    {
      accounts && accounts.length > 0 &&
      accounts.map((account, index) => <AccountListItem key={index} account={account}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(AccountList);