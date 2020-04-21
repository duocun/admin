import React from 'react';
import { connect } from 'react-redux'
import { loadOrders,selectDriver } from '../store/actions';
import OrderDriverListItem from './OrderDriverListItem';
import {getDriverInfo} from './getDriverInfo';


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