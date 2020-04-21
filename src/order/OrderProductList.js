import React from 'react';
import OrderProductListItem from './OrderProductListItem';

function OrderProductList({ orders }) {
  console.log(orders.length)
  return (
    orders.map(m =>
     
      <OrderProductListItem product={m}  key={m.productId} />
    )
  )
}

// const mapStateToProps = (state) => ({ orders: state.orders });

// export default connect(
//   mapStateToProps,
//   { loadOrders }
// )(OrderList);

export default 
(OrderProductList);
