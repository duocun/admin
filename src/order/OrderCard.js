import React from 'react';
import { connect } from 'react-redux';
import { PaymentMethod } from './OrderModel';
import './OrderCard.scss';

function OrderCard({ order }) {
  const getPaymentMethodString = (pm) => {
    switch(pm){
      case PaymentMethod.WECHAT:
        return '微信支付';
      case PaymentMethod.CREDIT_CARD:
        return '信用卡支付';
      case PaymentMethod.CASH:
        return '现金支付';
      case PaymentMethod.PREPAY:
        return '余额支付';
      default:
        return '现金支付';
    }
  }

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
            <div className="label-md">订单号:</div>
            <div className="col-text">{order.code}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">客户:</div>
            <div className="col-text">{order.client.username}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">客户电话:</div>
            <div className="col-text">{order.client.phone}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">付款方式:</div>
            <div className="col-text">{getPaymentMethodString(order.paymentMethod)}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">送货地址:</div>
            <div className="col-text">{order.address}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">客户备注:</div>
            <div className="col-text">{order.note}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">商家:</div>
            <div className="col-text">{order.merchant.name}</div>
          </div>

          <div className="detail-row">
            <div className="label-md">司机:</div>
            {
              order.driver &&
              <div className="col-text">{order.driver.username}</div>
            }
          </div>
          <div className="detail-row">
            <div className="label-md">司机电话:</div>
            {
              order.driver &&
              <div className="col-text">{order.driver.phone}</div>
            }
          </div>
          {/* <div className="detail-row">
            <div className="label-md">成本:</div>
            <div className="col-text">{order.cost}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">销售:</div>
            <div className="col-text">{order.price}</div>
          </div> */}

          <div className="product-list">
          {
            order.items.map(it => <div className="row product-row">
              <div className="col-product">{it.productName}</div>
              <div className="col-quantity">x{it.quantity}</div>
              <div className="col-price">${it.price}</div>
            </div>
            )
          }
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
