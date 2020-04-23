import React from 'react';
import {connect} from 'react-redux';

import {TransactionListItem} from './TransactionListItem';

import "./TransactionList.scss";

const TransactionList = ({transactions}) => {
  return (
    <div className="list transaction-list">
    <div className="list-item transaction-item transaction-item-header" >
      <span>创建日期</span>
      <span>送货日期</span>
      <span className="transaction-item-hide-mobile">描述</span>
      <span className="transaction-item-hide-mobile">消费</span>
      <span className="transaction-item-hide-mobile">付款</span>
      <span>金额</span>
      <span>余额</span>
    </div>
    {
      transactions && transactions.length > 0 &&
      transactions.map(transaction => <TransactionListItem key={transaction._id} transaction={transaction}/>)
    }
    </div>
  )
}

const mapStateToProps = (state) => ({
  transactions: state.transactions
});
export default connect(mapStateToProps)(TransactionList);