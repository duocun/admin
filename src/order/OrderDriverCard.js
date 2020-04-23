import React from 'react';
import { connect } from 'react-redux'
import { selectDriver } from '../store/actions';
import ProductCountList from './ProductCountList';
import './OrderDriverCard.scss';
function OrderDriverCard({ driver }) {

  const pickUpList = [];
  for (let mid in driver.pickUpList) {
    pickUpList.push({ id: driver.pickUpList[mid].merchantId, merchantName: driver.pickUpList[mid].merchantName, quantity: driver.pickUpList[mid].merchantProductQuantity })
  }

  return (
    <div className="list order-driver-card">
            <ProductCountList />
      <div>
      <div className="title">
        <span>商家名称</span>
        <span>应取商品数</span>
      </div>
      <div> {
        pickUpList && pickUpList.length > 0 && pickUpList.map(m =>
          <div className="row pick-up-list" key={m.merchantId+m.merchantName}>
            <div className="col-merchant">{m.merchantName}</div>
            <div className="col-quantity">{m.quantity}</div>
          </div>
        )}
      </div>
        </div>

    </div>
  )

}

const mapStateToProps = (state) => ({ driver: state.driver });

export default connect(
  mapStateToProps,
  { selectDriver }
)(OrderDriverCard);

