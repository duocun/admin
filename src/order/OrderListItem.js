import React from 'react';
import { connect } from 'react-redux';
import { selectOrder } from '../store/actions';

function OrderListItem({ order, selectedOrder, selectOrder }) {
  return (
    <div onClick={ () => selectOrder(order) } 
    className={selectedOrder == order ? "orderRowSelected" : "orderRow"} 
    >
      <div className="col">{order.code}</div>
      <div className="col">{order.note.length > 0 ? (" * " + order.clientName) : order.clientName}</div>
    </div >
  )
}
const mapStateToProps = (state) => ({ selectedOrder: state.order });
export default connect(
  mapStateToProps,
  { selectOrder }
)(OrderListItem);