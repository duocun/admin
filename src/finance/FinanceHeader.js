import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import FinanceNav from "./FinanceNav";

import { setTransactionDate } from "../store/actions";
// import OrderNav from "./OrderNav";

import DatePicker from "react-datepicker";

function FinanceHeader({
  transactionDate,
  setTransactionDateDispatch,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    let {startDate, endDate} = transactionDate;
    setStartDate(startDate);
    setEndDate(endDate);
  }, [])

  useEffect(() => {
    let transactionDate = {
      startDate,
      endDate
    }
    setTransactionDateDispatch(transactionDate)
  }, [startDate, endDate])

  return (
    <div className="header-area">
      <div className="select-date-area">
        <div className="label-bg">选择日期:</div>
        <DatePicker
          className="date-picker"
          name="transactionStartDate"
          selected={startDate}
          onChange={setStartDate}
        />
        <DatePicker
          className="date-picker"
          name="transactionEndDate"
          selected={endDate}
          onChange={setEndDate}
        />
      </div>
      <FinanceNav />
    </div>
  );
}

const mapStateToProps = (state) => ({
  transactionDate: state.transactionDate,
});
const mapDispatchToProps = (dispatch) => ({
  setTransactionDateDispatch: (transactionDate) =>
    dispatch(setTransactionDate(transactionDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinanceHeader);
