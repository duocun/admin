import React from 'react';
import { connect } from 'react-redux';
import { loadOrders } from '../store/actions';

import OrderMerchantListItem from './OrderMerchantListItem';

function OrderMerchantList({ orders }) {
  
  let merchantMap = {};
  for(var i=0;i<orders.length;i++){
      var mid = orders[i].merchant._id;
      if(!merchantMap[mid]){
          merchantMap[mid]=[0,0,[],[]]; //idx 0 for orderNum, idx 1 for productNum, idx 2 for cost
      }
      merchantMap[mid][0]++;
       merchantMap[mid][1]+= orders[i].items.length;

      merchantMap[mid][2].push(orders[i].cost);
      if(merchantMap[mid][3].length===0||!merchantMap[mid][3].includes(orders[i].merchant.name)){
      merchantMap[mid][3].push(orders[i].merchant.name)}
  }
  var merchantArray = [];
  for (mid in merchantMap) {
      merchantArray.push({merchantId: mid, details: merchantMap[mid]});
    }

  return (
    <div className="merchant-card">
    <div className="title">
    <span>厂家名称</span>
    <span>花费总额</span>
    <span>订单总数</span>
    <span>产品总数</span>
    </div>
    
        {
        merchantArray&&merchantArray.length>0&&
        merchantArray.map(m=>
            <OrderMerchantListItem data={m} key={m.merchant._id} />
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