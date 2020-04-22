import React from 'react';
import { connect } from 'react-redux'
import { loadOrders } from '../store/actions';
import OrderDriverListItem from './OrderDriverListItem';
import { getDriverInfo } from './getDriverInfo';

import './OrderDriverList.scss';

function OrderDriverList({ orders }) {
  var driverArray = [];
  driverArray = getDriverInfo(orders);

  return (
    <div className="list driver-list">
      <div className="title">
        <span className="col-driver">司机</span>
        <span className="col-orders">订单数</span>
        <span className="col-products">产品数</span>
      </div>
      {
        driverArray && driverArray.length > 0 &&
        driverArray.map(m =>
          <OrderDriverListItem data={m} key={m.driverId} />
        )
      }
    </div>
  )
}



const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderDriverList);