import React from 'react';
import { connect } from 'react-redux'
import { selectDriver } from '../store/actions';

function OrderDriverCard({ driver }) {


  const pickUpList = [];
  for(var mid in driver.pickList){
    pickUpList.push({id:driver.pickList[mid][2],merchant:driver.pickList[mid][0],amount:driver.pickList[mid][1]})
  }


  return (
    <div className="driver-info-card">
      <div>司机取货查询助手</div>
    <div className="title">
    <span>商家名称</span>
    <span>应取商品数</span>

    </div>
   <div> {
    pickUpList&&pickUpList.length>0&&pickUpList.map(m=>
      <div className="pickUpList" key={m.merchant+m.amount}>
    <div className="col">{m.merchant}</div>
    <div className="col">{m.amount}</div>
    </div>
)} 
    </div>

  <div>{
    }</div>
    
    <div>{} </div>
    </div>
  )

      }

      const mapStateToProps = (state) => ({ driver: state.driver });

export default connect(
        mapStateToProps,
        {selectDriver}
      )(OrderDriverCard);
      
      