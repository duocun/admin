import React from 'react';
import { connect } from 'react-redux';

function OrderCard({ product }) {
  return (
    <div className="order-card">


      <div className="order-detail-content">
        <div className="detail-row">
        <div className="label-md">产品名称:</div>
        <div>{product.productName}</div>
        </div>


        <div className="detail-row">
        <div className="label-md">商家:</div>
        {/* <div>{product.details.merchantName}</div> */}
        </div>

        <div className="detail-row">
        <div className="label-md">售价:</div>
        {/* <div>{product.details.price}</div> */}
        </div>

        <div className="detail-row">
        <div className="label-md">进价:</div>
        {/* <div>{product.details.cost}</div> */}
        </div>

        <div className="detail-row">
        <div className="label-md">销售额:</div>
        {/* <div>{product.details.totalIncome}</div> */}
        </div>

        <div className="detail-row">
        <div className="label-md">总成本:</div>
        {/* <div>{product.details.totalCost}</div> */}
       

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({ product: state.product });

export default connect(
  mapStateToProps,
  null
)(OrderCard);
