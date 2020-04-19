import React from 'react';
import {connect} from 'react-redux';
import {setDeliverDate} from '../store/actions';
import OrderNav from './OrderNav';

import './OrderHeader.scss';
// import * as moment from 'moment';
import DatePicker from 'react-datepicker';

function OrderHeader({deliverDate, setDeliverDate}) {
  return (
  <div className="header-area">
    <div className="select-date-area">
      <div className="label-bg">送货日期:</div>
      <DatePicker className="date-picker" selected={deliverDate}
        onChange={setDeliverDate}
      />
    </div>
    <OrderNav />
  </div>
  )
}

const mapStateToProps = (state) => ({deliverDate: state.deliverDate});
// const mapDispatchToProps = dispatch => ({
//   onSelectDeliverDate: date => {
//     dispatch(setDeliverDate(date));
//   }
// });
export default connect(
  mapStateToProps,
  {setDeliverDate}
)(OrderHeader);