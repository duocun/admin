import React from 'react';
import { connect } from 'react-redux';
import { selectDriver, getProductCountByDriver } from '../store/actions';
import './OrderDriverListItem.scss';

function OrderDriverListItem({ data, orders, selectedDriver, onSelectDriver }) {
// console.log("redux driver  " + selectedDriver.driverName);
// console.log("data driver  " + data)
  return (
    <div onClick={() => onSelectDriver(data, orders)}
      className={selectedDriver.driverId === data.driverId ? "list-item selected" : "list-item" }
    >
      <div className="col">{data.driverName}</div>
      {/* <div className="col">{data.totalCost}</div> */}
      {/* <div className="col">{data.totalOrderQuantity}</div> */}
      <div className="col">{data.totalProductQuantity}</div>

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