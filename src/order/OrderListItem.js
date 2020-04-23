import React from 'react';
import { connect } from 'react-redux';
import { selectOrder } from '../store/actions';
import './OrderListItem.scss';
function OrderListItem({ order, selectedOrder, selectOrder }) { 
  //order from props, selectedOrder from redux state, selecOrder dispatch to redux
  return (
    <div onClick={ () => selectOrder(order) } className={selectedOrder === order ? "list-item selected" : "list-item"}>
      <div className="col-code">{order.code}</div>
      <div className="col-name">{order.note.length > 0 ? (" * " + order.client.username) : order.client.username}</div>
    </div >
  )
}
const mapStateToProps = (state) => ({ selectedOrder: state.order });
export default connect(
  mapStateToProps,
  { selectOrder }
)(OrderListItem);