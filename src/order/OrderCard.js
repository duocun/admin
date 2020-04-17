import React from 'react';
import { connect } from 'react-redux';

function OrderCard({ order }) {
  return (
    <div className="detailCard">
      <div className="detailContent">
        <div className="detailRow">
        <div className="detailTitle">客户:</div>
        <div>{order.clientName}</div>
        </div>

        <div className="detailRow">
        <div className="detailTitle">订单号:</div>
        <div>{order.code}</div>
        </div>

        <div className="detailRow">
        <div className="detailTitle">商家:</div>
        <div>{order.merchantName}</div>
        </div>

        <div className="detailRow">
        <div className="detailTitle">司机:</div>
        <div>{order.driverName}</div>
        </div>

        <div className="detailRow">
        <div className="detailTitle">备注:</div>
        <div>{order.note}</div>
        </div>

        <div className="detailRow">
        <div className="detailTitle">总计:</div>
        <div>{order.cost}</div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ order: state.order });

export default connect(
  mapStateToProps,
  null
)(OrderCard);
