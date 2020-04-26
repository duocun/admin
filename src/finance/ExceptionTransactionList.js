import React from 'react';
import {connect} from 'react-redux';

import {ExceptionTransactionListItem} from './ExceptionTransactionListItem';

const ExceptionTransactionList = ({transactionsByAccount}) => {
  return (
    <div className="list transaction-exception-list">
      <div className="list-item transaction-exception-item transaction-item-header" >
      日期
      来自
      去往
      金额
    </div>
    {
      transactionsByAccount && transactionsByAccount.length > 0 &&
      transactionsByAccount.map(a => <ExceptionTransactionListItem key={a._id} item={a}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  transactionsByAccount: state.transactionsByAccount
});
export default connect(mapStateToProps)(ExceptionTransactionList);