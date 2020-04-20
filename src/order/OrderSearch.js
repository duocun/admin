import React from 'react';
import { connect } from 'react-redux';

function OrderCard({ order }) {
  return (
    <div className="order-card">

      <div className="btn-area">
        <div className="btn">删除</div>
        <div className="btn">改地址</div>
        <div className="btn">改日期</div>
        <div className="btn">历史</div>
      </div>

      <div className="order-detail-content">
        <div className="detail-row">
        <div className="label-md">客户:</div>
        <div>{order.clientName}</div>
        </div>

        <div className="detail-row">
        <div className="label-md">订单号:</div>
        <div>{order.code}</div>
        </div>

        <div className="detail-row">
        <div className="label-md">商家:</div>
        <div>{order.merchantName}</div>
        </div>

        <div className="detail-row">
        <div className="label-md">司机:</div>
        <div>{order.driverName}</div>
        </div>

        <div className="detail-row">
        <div className="label-md">备注:</div>
        <div>{order.note}</div>
        </div>

        <div className="detail-row">
        <div className="label-md">总计:</div>
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
