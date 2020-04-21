import React from 'react';
import {connect} from 'react-redux';
// import {OrderStatus } from  './OrderModel';

import {setDeliverDate, getOrdersAsync} from '../store/actions';
import OrderNav from './OrderNav';

import './OrderHeader.scss';
// import * as moment from 'moment';
import DatePicker from 'react-datepicker';

function OrderHeader({deliverDate, onSelectDeliverDate}) {

  return (
  <div className="header-area">
    <div className="select-date-area">
      <div className="label-bg">选择日期:</div>
      <DatePicker className="date-picker" selected={deliverDate}
        onChange={onSelectDeliverDate}
      />
    </div>
    <OrderNav />
  </div>
  )
}

const mapStateToProps = (state) => ({deliverDate: state.deliverDate});
const mapDispatchToProps = dispatch => ({
  onSelectDeliverDate: date => {
    dispatch(setDeliverDate(date));
    dispatch(getOrdersAsync(date));
  }
});
export default connect(
  mapStateToProps,
  // {setDeliverDate}
  mapDispatchToProps
)(OrderHeader);