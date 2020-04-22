import React from 'react';
import { connect } from 'react-redux';
// import * as moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders } from '../store/actions';
import { selectDriver } from '../store/actions';
import OrderMerchantList from './OrderMerchantList';
import OrderDriverList from './OrderDriverList';
import OrderDriverCard from './OrderDriverCard';
import OrderHeader from './OrderHeader';
import {OrderStatus} from './OrderModel';
import './OrderSummary.scss';

export const MerchantType = {
  GROCERY: 'G'
}


class OrderSummary extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date() };
    // this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);

  }




  render() {

    const orders = this.state.orders;


    const productArray = orders.map(function (od) { return od.items });
    //get total item
    var totalItems = 0;
    for (var i = 0; i < productArray.length; i++) {
      for (var j = 0; j < productArray[i].length; j++) {
        totalItems++;
      }
    }

    return (
      <div className="page">
        <div className="nav-menu-bar">
          <NavBar selected={Menu.Order} />
        </div>

        <div className="page-content">
          <OrderHeader />

          <div className="page-body">
            {/* <div className="summary-card" >
              <div>统计</div>
              <div>商品总数: {totalItems}</div>
              <div>订单总数: {orders.length}</div>

              <OrderMerchantList />
            </div> */}

            {/* <div className="summary-lower"> */}
              <OrderDriverCard />
              <OrderDriverList />
            {/* </div> */}
          </div>
        </div>
      
        <Footer selected={Menu.Order} />
      </div>
    )
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const deliverDate = this.state.deliverDate.toISOString().split('T')[0];
        const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] }  };

        this.orderSvc.find(q).then(orders => {
          this.setState({ orders, selectOrder: orders[0] });
          this.props.loadOrders(orders);

        });
        
      } else {
        this.props.history.push('/login');
      }
    })
  }


}




const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}
export default connect(
  mapStateToProps,
  { loadOrders, selectDriver }
)(OrderSummary);