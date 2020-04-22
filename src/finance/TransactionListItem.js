import React from 'react';

import "./TransactionListItem.scss";

export const TransactionListItem = ({item}) => {

  const mapDateToDisplay = (dateString) =>{
    if(!dateString){
      return "-";
    }
    let date = new Date(dateString);
    let weekdays = ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"];
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let weekday = date.getDay();
    return month + "月" + day + "日" + " " + weekdays[weekday];
  }

  return (
    <div className="list-item transaction-item" >
      <span>{mapDateToDisplay(item.created)}</span>
      <span>{mapDateToDisplay(item.delivered)}</span>
      <span className="transaction-item-hide-mobile">描述</span>
      <span className="transaction-item-hide-mobile">消费</span>
      <span className="transaction-item-hide-mobile">付款</span>
      <span>{item.amount}</span>
      <span>{item.toBalance}</span>
    </div>
  )
}