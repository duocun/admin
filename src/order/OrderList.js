import React from 'react';
import { connect } from 'react-redux';
import OrderListItem from './OrderListItem';
import { loadOrders } from '../store/actions';

function OrderList({ orders }) {
  return (
    orders.map(m =>
      <OrderListItem key={m._id} order={m} />
    )
  )
}

const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderList);