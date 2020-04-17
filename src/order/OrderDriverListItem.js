import React from 'react';
import { connect } from 'react-redux';
import { selectDriver } from '../store/actions';


function OrderDriverListItem({data,selectedDriver,selectDriver}) {
  return(
    <div onClick={ () => selectDriver(data) } 
    className={selectedDriver.driverId === data.driverId ? "orderRowSelected" : "orderRow"} 
    >
    <div className="col">{data.details[3]}</div>
    <div className="col">{data.details[2].reduce(function(a, b){
        var num =a+b;  
        return parseFloat(num.toFixed(2)) }, 0)}
    </div>
    <div className="col">{data.details[0]}</div>
    <div className="col">{data.details[1]}</div>

</div>
  )
}

const mapStateToProps = (state) => ({ selectedDriver: state.driver });

export default connect(
  mapStateToProps,
  { selectDriver }
)(OrderDriverListItem);