import React from 'react';




function OrderMerchantListItem({data}) {
  return(

  <div className="order-row" key={data.merchantId}>
  <div className="col">{data.details[3]}</div>
  <div className="col">{data.details[2].reduce(function(a, b){
      var num =a+b;  
      return parseFloat(num.toFixed(2)) }, 0)}
  </div>
  <div className="col">{data.details[0]}</div>
  <div className="col">{data.details[1]}</div>
  

</div>
  )
}
export default 
OrderMerchantListItem;