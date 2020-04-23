import React from 'react';
import { connect } from 'react-redux';
import { selectDriver, getProductCountByDriver } from '../store/actions';


function OrderDriverListItem({ data, orders, selectedDriver, onSelectDriver }) {
console.log("redux driver  " + selectedDriver.driverName);
console.log("data driver  " + data.driverName)
  return (
    <div onClick={() => onSelectDriver(data, orders)}
      className={selectedDriver.driverId === data.driverId ? "list-item order-row-selected" : "order-row"}
    >
      <div className="col">{data.driverName}</div>
      <div className="col">{data.totalCost}</div>
      <div className="col">{data.totalQuantity}</div>
      <div className="col">{data.totalCost}</div>

    </div>
  )
}



const mapStateToProps = (state) => ({ selectedDriver: state.driver, orders: state.orders });
const mapDispatchToProps = dispatch => ({
  onSelectDriver: (property, orders) => {
    dispatch(selectDriver(property));
    dispatch(getProductCountByDriver({ driverId: property.driverId, orders }));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // { selectDriver }
)(OrderDriverListItem);