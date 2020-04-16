export const loadOrders = payload => {
  return {
    type: 'LOAD_ORDERS',
    payload
  }
}

export const selectOrder = payload => ({
  type: 'SELECT_ORDER',
  payload
})