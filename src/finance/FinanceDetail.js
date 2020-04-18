import React from 'react';
import { connect } from 'react-redux';
import AccountSearchBox from '../account/AccountSearchBox';
import AccountList from '../account/AccountList';
import TransactionList from './TransactionList';
import './FinanceDetail.scss';

const FinanceDetail = ({bAccountOptions}) => {
  return (
    <div className="finance-detail">
      <AccountSearchBox />
      {
        bAccountOptions &&
        <AccountList />
      }
      <TransactionList />
    </div>
  )
}

const mapStateToProps = (state) => (
  { bAccountOptions: state.bAccountOptions }
);
export default connect(
  mapStateToProps,
  null,
)(FinanceDetail);
