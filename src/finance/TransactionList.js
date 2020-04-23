import React from 'react';
import {connect} from 'react-redux';

import {TransactionListItem} from './TransactionListItem';

const TransactionList = ({transactionsByAccount}) => {
  return (
    <div className="list transaction-list">
      <div className="list-item transaction-item" >
      日期
      来自
      去往
      金额
    </div>
    {
      transactionsByAccount && transactionsByAccount.length > 0 &&
      transactionsByAccount.map(a => <TransactionListItem key={a._id} item={a}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  transactionsByAccount: state.transactionsByAccount
});
export default connect(mapStateToProps)(TransactionList);