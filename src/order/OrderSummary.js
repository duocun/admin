import React, { useEffect, useState } from 'react';
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
import { OrderStatus } from './OrderModel';
import './OrderSummary.scss';

export const MerchantType = {
  GROCERY: 'G'
}

const OrderSummary = ({ orders, deliverDate }) => {

  const [quantity, setItemQuantity] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // const accountSvc = new AccountAPI();
    const orderSvc = new OrderAPI();

    if (!loaded) {
      const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] } };
      orderSvc.find(q).then(orders => {
        loadOrders(orders);

        const productArray = orders.map(function (od) { return od.items });
        //get total item
        const totalItems = 0;
        for (let i = 0; i < productArray.length; i++) {
          for (let j = 0; j < productArray[i].length; j++) {
            totalItems++;
          }
        }
        setItemQuantity(totalItems);
        setLoaded(true);
      });
    }
  }, []);



  return (
    <div className="page">
      <div className="nav-menu-bar">
        <NavBar selected={Menu.Order} />
      </div>

      <div className="page-content">
        <OrderHeader />

        <div className="page-body">
          <div className="info-area">
            <div className="summary-upper-area">
              <div className="list summary-area" >
                <div className="title">统计</div>
                <div>商品总数: {quantity}</div>
                <div>订单总数: {orders.length}</div>

              </div>

              <div className="merchants-area">

                <OrderMerchantList />
              </div>


            </div>


            <div className="drivers-area">
              <OrderDriverCard />
              <OrderDriverList />
            </div>
          </div>
        </div>
      </div>

      <Footer selected={Menu.Order} />
    </div>
  )
}

// componentDidMount() {
//   this.accountSvc.getCurrentAccount().then(account => {
//     if (account) {
//       const deliverDate = this.state.deliverDate.toISOString().split('T')[0];
//       const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] } };
//       this.orderSvc.find(q).then(orders => {
//         this.setState({ orders, selectOrder: orders[0] });
//         this.props.loadOrders(orders);
//       });
//     } else {
//       this.props.history.push('/login');
//     }
//   })
// }

const mapStateToProps = (state) => ({
  orders: state.orders,
  deliverDate: state.deliverDate
});

export default connect(
  mapStateToProps,
  { loadOrders, selectDriver }
)(OrderSummary);