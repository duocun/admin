import React from 'react';
import { connect } from 'react-redux';
import { NavBar, Menu } from '../ui/NavBar';
import OrderHeader from './OrderHeader';

function OrderCard({ order }) {
  return (
    <div className="page">
    <div className="nav-menu-bar">
       <NavBar selected={Menu.Order} />
    </div>

    <div className="page-content">
 
          <OrderHeader/>
 
          <div className="page-body"></div>
    </div>
  </div>
  )
}

const mapStateToProps = (state) => ({ order: state.order });

export default connect(
  mapStateToProps,
  null
)(OrderCard);
