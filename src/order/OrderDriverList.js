import React from 'react';
import { connect } from 'react-redux'
import { loadOrders } from '../store/actions';

import OrderDriverListItem from './OrderDriverListItem';



function OrderDriverList({orders}) {

  //reformating driver detail array 
let driverMap = {};
for(var i=0;i<orders.length;i++){
    var did = orders[i].driverId;
    if(did!==undefined){
        if(!driverMap[did]){
            driverMap[did]=[0,0,[],[],{}]; 
        }
        driverMap[did][0]++;
        driverMap[did][1]+= orders[i].items.length;
        driverMap[did][2].push(orders[i].cost);
        driverMap[did][3] = orders[i].driverName;
        var mid = orders[i].merchantId;
        if(!driverMap[did][4][mid]){
          driverMap[did][4][mid]=["",0];
        }
        driverMap[did][4][mid][0]=orders[i].merchantName;
        driverMap[did][4][mid][1]+=orders[i].items.length;


        
       

}
}
var driverArray = [];
for (did in driverMap) {
    driverArray.push({driverId: did, details: driverMap[did],driverName:driverMap[did][3],pickList:driverMap[did][4]});
  }
console.log(driverArray)

    return (
      <div className="summaryCard">
      <div className="title">
      <span>司机名称</span>
      <span>花费总额</span>
      <span>订单总数</span>
      <span>产品总数</span>
      </div>
          {
          driverArray&&driverArray.length>0&&
          driverArray.map(m=>
             
             <OrderDriverListItem data={m} key={m.driverId} />

                  )
          }
      </div>
     

)}



const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderDriverList);