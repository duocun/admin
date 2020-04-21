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
  const [startDate, setStartDate] = useState(transactionDate.startDate);
  const [endDate, setEndDate] = useState(transactionDate.endDate);

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
        <div className="label-bg">送货日期:</div>
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
