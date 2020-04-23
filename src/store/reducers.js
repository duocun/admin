import {OrderType} from '../order/OrderModel';
export const deliverDate = (state={}, action) => {
  if(action && action.type === 'SET_DELIVER_DATE'){
    return action.payload;
  }
  return state;
}

export const transactionDate = (state={}, action) => {
  if(action && action.type === 'SET_TRANSACTION_DATE'){
    return action.payload;
  }
  return state;
}

export const orders = (state=[], action) => {
  if(action && action.type === 'LOAD_ORDERS'){
    return action.payload;
  }
  return state;
}

export const order = (state={}, action) => {
  if(action && action.type === 'SELECT_ORDER'){
    return action.payload;
  }
  return state;
}

export const product = (state={}, action) => {
  if(action && action.type === 'SELECT_PRODUCT'){
    return action.payload;
  }
  return state;
}

export const driver = (state={}, action) => {
  if(action && action.type === 'SELECT_DRIVER'){
    return action.payload;
  }
  return state;
}
export const filterOrders = (state={}, action) => {
  if(action && action.type === 'LOAD_FILTER_ORDERS'){
    return action.payload;
  }
  return state;
}

export const accounts = (state=[], action) => {
  if(action && action.type === 'LOAD_ACCOUNTS'){
    return action.payload;
  }
  return state;
}

export const account = (state={}, action) => {
  if(action && action.type === 'SELECT_ACCOUNT'){
    return action.payload;
  }
  return state;
}

export const accountKeyword = (state='', action) => {
  if(action && action.type === 'SET_ACCOUNT_KEYWORD'){
    return action.payload;
  }
  return state;
}

export const transactions = (state=[], action) => {
  if(action && action.type === 'LOAD_TRANSACTIONS'){
    return action.payload;
  }
  return state;
}

export const merchants = (state=[], action) => {
  if(action && action.type === 'LOAD_MERCHANTS'){
    return action.payload;
  }
  return state;
}

export const merchant = (state={}, action) => {
  if(action && action.type === 'SELECT_MERCHANT'){
    return action.payload;
  }
  return state;
}

export const merchantSchedules = (state=[], action) => {
  if(action && action.type === 'LOAD_MERCHANT_SCHEDULES'){
    return action.payload;
  }
  return state;
}

// payload --- object {areaCode, schedules}
export const merchantScheduleGroup = (state={}, action) => {
  if(action && action.type === 'SELECT_MERCHANT_SCHEDULE_GROUP'){
    return action.payload;
  }
  return state;
}

export const accountListDisplay = (state=[], action) => {
  if(action && action.type === 'SET_ACCOUNT_LIST_DISPLAY'){
    return action.payload;

// orders --- orders belong to a driver
// return --- [{productName, quantity} ...]
const groupByProduct = (orders) => {
  const productMap = {};
  const rs = orders.filter(order => order.type === OrderType.GROCERY);
  rs.map(r => {
    r.items.map(it => {
      productMap[it.productId] = { productName: it.product.name, quantity: 0 };
    });
  });
  rs.map(r => {
    r.items.map(it => {
      productMap[it.productId].quantity += it.quantity;
    });
  });

  return Object.keys(productMap).map(pId => productMap[pId]);
}

export const productCountList = (state=[], action) => {
  if(action && action.type === 'GET_PRODUCT_COUNT_BY_DRIVER'){
    const {driverId, orders} = action.payload;
    const filteredOrders = orders.filter(order => order.driverId === driverId);
    return groupByProduct(filteredOrders);
  }
  return state;
}


