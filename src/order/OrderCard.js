import React from 'react';
import { connect } from 'react-redux';
import './OrderCard.scss';

function OrderCard({ order }) {
  return (
    <div className="order-card">

      {/* <div className="btn-area">
        <div className="btn">删除</div>
        <div className="btn">改地址</div>
        <div className="btn">改日期</div>
        <div className="btn">历史</div>
      </div> */}
      {
        order &&
        <div className="order-detail-content">
          <div className="detail-row">
            <div className="label-md">客户:</div>
            {
              order.client
                ? <div>{order.client.username}</div>
                : <div>{order._id}:Client Exception</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">订单号:</div>
            <div>{order.code}</div>
          </div>

          <div className="detail-row">
            <div className="label-md">商家:</div>
            {
              order.merchant
                ? <div>{order.merchant.name}</div>
                : <div>{order._id}:Merchant Exception</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">司机:</div>
            {
              order.driver &&
              <div>{order.driver.username}</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">备注:</div>
            <div>{order.note}</div>
          </div>

          <div className="detail-row">
            <div className="label-md">成本:</div>
            <div>{order.cost}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">销售:</div>
            <div>{order.price}</div>
          </div>
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => ({ order: state.order });

export default connect(
  mapStateToProps,
  null
)(OrderCard);
