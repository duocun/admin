import React from 'react';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './OrderDetail.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders, selectOrder } from '../store/actions';
import {OrderStatus } from  './OrderModel';
import OrderHeader from './OrderHeader';
import OrderList from './OrderList';
import OrderCard from './OrderCard';


class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: props.orders, deliverDate: new Date(), search: '', selectedOrder: undefined };
    // this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
  }

  updateSearch(e) {
    this.setState({ search: e.target.value })
  }

  render() {

    const filteredOrders = this.props.orders.filter(
      (od) => {

        return od.client.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.merchant.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.code.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || (od.driverName !== undefined && od.driverName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        ;
      }
    );
    // console.log("FilterOrder:" + filteredOrders.length);

    // const Menu = Menu;
    return (
      <div className="page">

        <div className="nav-menu-bar">
          <NavBar selected={Menu.Order} />
        </div>

        <div className="page-content">

          <OrderHeader />

          <div className="page-body">

            <div className="left">

              <div className="search-bar">
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="查订单号，客户，客户电话，商家或司机" />
              </div>

                <OrderCard />
            </div>

            <div className="right">

              <div className="list order-list">

                {/* <div className="mobileHide" >订单数: {filteredOrders.length}
                </div> */}

                <div className="title">
                  <span className="mobileHide">订单号</span>
                  <span>客户姓名</span>
                </div>

                <div>
                  {
                    filteredOrders && filteredOrders.length > 0 &&
                    <OrderList orders={filteredOrders} />
                  }
                </div>

              </div>

            </div>
          </div>
        </div>
        <div className="footer">
          <Footer selected={Menu.Order} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const deliverDate = this.state.deliverDate.toISOString().split('T')[0];
        const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] }  };
        this.orderSvc.find(q).then(orders => {
          this.props.loadOrders(orders);
          if(orders && orders.length>0){
            this.props.selectOrder(orders[0]);
          }
          this.setState({ orders, selectedOrder: orders[0] });
        });
        // this.orderSvc.reqMissingWechatPayments().then((payments) => {
        // this.orderSvc.checkStripePay().then((payments) => {
        // this.orderSvc.checkWechatpay().then((payments) => {
        // });

        // const qMerchant = { type: MerchantType.GROCERY };
        // const fields = ['_id', 'name', 'rules'];
        // this.merchantSvc.find(qMerchant, fields).then(orders => {
        //   this.scheduleSvc.find({}).then(schedules => {

        //     orders.map(m => {
        //       m.scheudles = schedules.filter(sc => sc.merchantId === m._id);
        //     })
        //     this.setState({orders});
        //   });
        // });
      } else {
        this.props.history.push('/login');
      }
    })
  }

}


const mapStateToProps = (state) => ({ orders: state.orders,deliverDateState: state.deliverDate});
// const mapDispatchToProps = dispatch => ({
//   onLoadOrders: property => {
//     dispatch(loadOrders(property));
//     dispatch(getOrdersAsync(property));
//   }
// });
export default connect(
  mapStateToProps,
  { loadOrders, selectOrder }
)(Order);