import React from 'react';
import { connect } from 'react-redux';
// import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './OrderDetail.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders } from '../store/actions';


import OrderList from './OrderList';
import OrderCard from './OrderCard';
import OrderNav from './OrderNav';

export const MerchantType = {
  GROCERY: 'G'
}

export const OrderType = {
  FOOD_DELIVERY: 'F',
  MOBILE_PLAN_SETUP: 'MS',
  MOBILE_PLAN_MONTHLY: 'MM',
  GROCERY: 'G'
};

export const OrderStatus = {
  BAD: 'B',          // client return, compansate
  DELETED: 'D',          // cancellation
  TEMP: 'T',             // generate a temp order for electronic order
  NEW: 'N',
  LOADED: 'L',           // The driver took the food from Merchant
  DONE: 'F',             // Finish delivery
  MERCHANT_CHECKED: 'MC'  // VIEWED BY MERCHANT
};

class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date(), search: '', selectOrder: undefined };
    this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
   
  }

  updateSearch(e) {
    this.setState({ search: e.target.value })
  }


  render() {
   
    const filteredOrders = this.state.orders.filter(
      (od) => {

        return od.clientName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.merchantName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || od.code.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
          || (od.driverName !== undefined && od.driverName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1);
        ;



      }
    );
    // const Menu = Menu;
    return (
      <div>

        <div className="naviBar">
          <NavBar selected={Menu.Order} />
        </div>

        <div className="orderPage">
          <div className="detailAll">
            <div>
              选择日期： <DatePicker className="datePick" selected={this.state.deliverDate}
                onChange={this.handelDeliverDateChange}
              />
            </div>

            <div className="searchBar">
              <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="查订单号，客户，客户电话，商家或司机" />
            </div>



            <div className="operationButtons">
              <button className="button">删除订单</button>
              <button className="button">修改地址</button>
              <button className="button">修改日期</button>
              <button className="button">历史记录</button>
            </div>


            <OrderCard />
          </div>



          <div className="detailAll">


        <OrderNav />


            <div className="selectCard">
              <div >订单数: {filteredOrders.length}
              </div>
              <div className="title">
                <span>订单号</span>
                <span>客户姓名</span>

              </div>
              <div>
                {
                  filteredOrders && filteredOrders.length > 0 &&
                  <OrderList />
                }
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

  handelDeliverDateChange(d) {
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear();
    const deliverDate = yy + '-' + (mm > 9 ? mm : '0' + mm) + '-' + (dd > 9 ? dd : '0' + dd);
    this.setState({ deliverDate: new Date(deliverDate) });
    // const start = date + 'T00:00:00.000Z';
    // const end = date + 'T23:59:59.000Z';
    // const time = d.toLocaleTimeString('en-US', { hour12: false });

    const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] } };
    const fields = ['_id', 'code', 'clientName']; // 'items'
    this.orderSvc.find(q, fields).then(orders => {
      this.setState({ orders, deliverDate: new Date(deliverDate + 'T00:00:00.000') });
    });
  }
}


const mapStateToProps = (state) => ({ orders: state.orders });

export default connect(
  mapStateToProps,
  { loadOrders }
)(Order);