import React from 'react';

export const TransactionListItem = ({item}) => {
  return (
    <div className="list-item transaction-item" >
      {item.created}
      {item.fromName}
      {item.toName}
      {item.amount}
    </div>
  )
}