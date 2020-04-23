import React from 'react';
import { connect } from 'react-redux';
import { loadOrders } from '../store/actions';
import './OrderMerchantList.scss';
import OrderMerchantListItem from './OrderMerchantListItem';

//
const getMerchantInfoList = (orders) => {
  let merchantMap = {};
  for (let i = 0; i < orders.length; i++) {
    const merchant = orders[i].merchant;
    const mid = merchant ? merchant._id : null;
    if (!merchantMap[mid]) {
      merchantMap[mid] = [0, 0, [], []]; //idx 0 for orderNum, idx 1 for productNum, idx 2 for cost
    }
    merchantMap[mid][0]++;
    merchantMap[mid][1] += orders[i].items.length;

    merchantMap[mid][2].push(orders[i].cost);
    if (merchantMap[mid][3].length === 0 || !merchantMap[mid][3].includes(merchant.name)) {
      merchantMap[mid][3].push(merchant.name)
    }
  }
  const merchantArray = [];
  for (let mid in merchantMap) {
    merchantArray.push({ merchantId: mid, details: merchantMap[mid] });
  }
  return merchantArray;
}

function OrderMerchantList({ orders }) {
  const merchantArray = getMerchantInfoList(orders);
  return (
    <div className="list merchant-list">
      <div className="title">
        <span>厂家名称</span>
        <span>花费总额</span>
        <span>订单总数</span>
        <span>产品总数</span>
      </div>

      {
        merchantArray && merchantArray.length > 0 &&
        merchantArray.map(m =>
          <OrderMerchantListItem data={m} key={m.merchantId} />
        )
      }
    </div>
  )
}

const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderMerchantList);