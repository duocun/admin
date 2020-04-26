import React from 'react';

export const ExceptionTransactionListItem = ({item}) => {
  return (
    <div className="list-item transaction-item" >
      {item.created}
      {item.fromName}
      {item.toName}
      {item.amount}
    </div>
  )
}