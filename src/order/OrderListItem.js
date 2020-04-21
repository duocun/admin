import React from 'react';
import { connect } from 'react-redux';
import { selectOrder } from '../store/actions';

function OrderListItem({ order, selectedOrder, selectOrder }) { 
  //order from props, selectedOrder from redux state, selecOrder dispatch to redux
  return (
    <div onClick={ () => selectOrder(order) } 
    className={selectedOrder === order ? "order-row-selected" : "order-row"} 
    >
      <div className="col-code">{order.code}</div>
      <div className="col-name">{order.note.length > 0 ? (" * " + order.clientName) : order.clientName}</div>
    </div >
  )
}
const mapStateToProps = (state) => ({ selectedOrder: state.order });
export default connect(
  mapStateToProps,
  { selectOrder }
)(OrderListItem);