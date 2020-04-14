
export const orderReducer = (state=[], action) => {
  if(action.type === 'LOAD_ORDERS'){
    return action.payload;
  }
  return state;
}

export function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}