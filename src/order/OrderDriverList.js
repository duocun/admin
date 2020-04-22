import React from 'react';
import { connect } from 'react-redux'
import { loadOrders,selectDriver } from '../store/actions';
import OrderDriverListItem from './OrderDriverListItem';

// calculate quantities and group by merchants
export const getDriverInfo = (orders) => {
  let driverMap = {};
  for (let i = 0; i < orders.length; i++) {
    const driver = orders[i].driver;
    const did = driver ? driver._id : null;
    if (did !== undefined) {
      if (!driverMap[did]) {
        driverMap[did] = {
          driverId: '',
          totalOrderQuantity: 0,
          totalProductQuantity: 0,
          totalCost: 0,
          driverName: 0,
          pickUpList: {}
        };
      }
      driverMap[did].driverId = did;
      driverMap[did].totalOrderQuantity++;
      driverMap[did].totalProductQuantity += orders[i].items.length;
      driverMap[did].totalCost += orders[i].cost;
      driverMap[did].driverName = driver ? driver.username : 'N/A'; 
      const merchant = orders[i];
      const mid = merchant ? merchant._id : null;
      if (!driverMap[did].pickUpList[mid]) {
        driverMap[did].pickUpList[mid] = {
          merchantId: '',
          merchantName: '',
          merchantProductQuantity: 0
        };
      }
      driverMap[did].pickUpList[mid].merchantId = mid;
      driverMap[did].pickUpList[mid].merchantName = merchant ? merchant.name : 'N/A';
      driverMap[did].pickUpList[mid].merchantProductQuantity += orders[i].items.length;
    }
  }

  const driverArray = [];
  for (let did in driverMap) {
    driverArray.push({
      driverId: driverMap[did].driverId,
      totalOrderQuantity: driverMap[did].totalOrderQuantity,
      totalProductQuantity: driverMap[did].totalProductQuantity,
      totalCost: parseFloat(driverMap[did].totalCost.toFixed(2)),
      driverName: driverMap[did].driverName,
      pickUpList: driverMap[did].pickUpList
    });
  }
  
  return driverArray;
}

function OrderDriverList({orders,selectDriver}) {
  var driverArray = [];
  driverArray = getDriverInfo(orders);
  if(driverArray.length>0){
    selectDriver(driverArray[0])
  }
  
    return (
      <div className="driver-card">
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
  { loadOrders,selectDriver }
)(OrderDriverList);