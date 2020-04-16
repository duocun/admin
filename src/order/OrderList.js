import React from 'react';
import { connect } from 'react-redux';
import OrderListItem from './OrderListItem';
import { loadOrders } from '../store/actions';

function OrderList({ orders }) {
  return (
    orders.map(m =>
      // <div className={selectedOrder == m ? "orderRowSelected" : "orderRow"} key={m._id}>
        <OrderListItem key={m._id} order={m} />
      // </div>
    )
  )
}

const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderList);