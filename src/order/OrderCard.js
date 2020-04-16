import React from 'react';
import { connect } from 'react-redux';

function OrderCard({ order }) {
  return (
    <div className="detailCard">
      <div className="detailContent">
        <div className="detailRow">客户:</div>
        <div>{order.clientName}</div>
        <div className="detailRow">订单号:</div>
        <div className="detailRow">商家:</div>
        <div className="detailRow">司机:</div>
        <div className="detailRow">备注:</div>
        <div className="detailRow">总计:</div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ order: state.order });

export default connect(
  mapStateToProps,
  null
)(OrderCard);
