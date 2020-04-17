import React from 'react';
import AccountSearchBox from '../account/AccountSearchBox';
import AccountList from '../account/AccountList';
import TransactionList from './TransactionList';
import './FinanceDetail.scss';

export const FinanceDetail = () => {
  return (
    <div className="finance-detail">
      <AccountSearchBox />
      <AccountList />
      <TransactionList />
    </div>
  )
}
