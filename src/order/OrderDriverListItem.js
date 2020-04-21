import React from 'react';
import { connect } from 'react-redux';
import { selectDriver, getProductCountByDriver } from '../store/actions';


function OrderDriverListItem({ data, orders, selectedDriver, onSelectDriver }) {

  return (


    <div onClick={() => onSelectDriver(data, orders)}
      className={selectedDriver.driverId === data.driverId ? "order-row-selected" : "order-row"}
    >
      <div className="col">{data.details[3]}</div>
      <div className="col">{data.details[2].reduce(function (a, b) {
        var num = a + b;
        return parseFloat(num.toFixed(2))
      }, 0)}
      </div>
      <div className="col">{data.details[0]}</div>
      <div className="col">{data.details[1]}</div>

    </div>
  )
}



const mapStateToProps = (state) => ({ selectedDriver: state.driver, orders: state.orders });
const mapDispatchToProps = dispatch => ({
  onSelectDriver: (property, orders) => {
    dispatch(selectDriver(property));
    dispatch(getProductCountByDriver({driverId: property.driverId, orders}));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  // { selectDriver }
)(OrderDriverListItem);