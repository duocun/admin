import React, { useEffect } from "react";
import { connect } from "react-redux";
import FinanceHeader from "./FinanceHeader";
import { NavBar, Menu } from "../ui/NavBar";

import { getTransactionsByDateRangeAsync } from "../store/actions";

const FinanceException = ({transactionDate, getTransactionAsyncDispatch}) => {
  useEffect(() => {
    getTransactionAsyncDispatch(transactionDate)
  }, [transactionDate]);
  return (
    <div className="page">
      <div className="nav-menu-bar">
        <NavBar selected={Menu.Order} />
      </div>
      <div className="page-content">
        <FinanceHeader />
        <div className="finance-detail">testtest</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ transactionDate: state.transactionDate });
const mapDispatchToProps = (dispatch) => ({
  getTransactionAsyncDispatch: (transactionDate) =>
    dispatch(getTransactionsByDateRangeAsync(transactionDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceException);
