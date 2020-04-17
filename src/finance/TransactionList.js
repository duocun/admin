import React from 'react';
import {connect} from 'react-redux';

import {TransactionListItem} from './TransactionListItem';

const TransactionList = ({transactions}) => {
  return (
    <div className="list transaction-list">
    {
      transactions && transactions.length > 0 &&
      transactions.map(a => <TransactionListItem key={a._id} item={a}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  transactions: state.transactions
});
export default connect(mapStateToProps)(TransactionList);