import React from 'react';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './OrderDetail.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders } from '../store/actions';
// import {OrderStatus } from  './OrderModel';

import OrderHeader from './OrderHeader';
import OrderList from './OrderList';
import OrderCard from './OrderCard';

class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date(), search: '', selectOrder: undefined,filteredOrders:[] };
    // this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
    this.updateFilterArray = this.updateFilterArray.bind(this);

  }

  updateSearch(e) {
    this.setState({ search: e.target.value })
  }
  updateFilterArray(filteredOrders){
    

  }

  render() {

    const filteredOrders = this.props.orders.filter(
      (od) => {

        return od.clientName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.merchantName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.code.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || (od.driverName !== undefined && od.driverName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        ;



      }
    );
    // console.log("FilterOrder:" + filteredOrders.length);
      console.log(this.props.orders);
      console.log("state:" + this.props.deliverDateState);
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

              <div className="selectCard">

                <div className="mobileHide" >订单数: {filteredOrders.length}
                </div>

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
        const q = { deliverDate: '2020-04-10' };
        // const fields = ['id', 'code', 'clientName']; // 'items'
        this.orderSvc.find(q).then(orders => {
          this.setState({ orders, selectOrder: orders[0] });
          this.props.loadOrders(orders);
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

  // handelDeliverDateChange() {
    // const mm = d.getMonth() + 1;
    // const dd = d.getDate();
    // const yy = d.getFullYear();
    // const FormatDeliverDate = yy + '-' + (mm > 9 ? mm : '0' + mm) + '-' + (dd > 9 ? dd : '0' + dd);
  //   const deliverDate = this.props.deliverDateState;
    
  //   this.setState({ deliverDate: new Date(deliverDate) });
  //   // const start = date + 'T00:00:00.000Z';
  //   // const end = date + 'T23:59:59.000Z';
  //   // const time = d.toLocaleTimeString('en-US', { hour12: false });

  //   const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] } };
  //   const fields = ['_id', 'code', 'clientName']; // 'items'
  //   this.orderSvc.find(q, fields).then(orders => {
  //     this.setState({ orders, deliverDate: new Date(deliverDate + 'T00:00:00.000') });
  //     this.props.loadOrders(orders);

      
  //   });
  // }
}


const mapStateToProps = (state) => ({ orders: state.orders,deliverDateState: state.deliverDate});

export default connect(
  mapStateToProps,
  { loadOrders }
)(Order);