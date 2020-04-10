import React from 'react';
// import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './Order.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';

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
  BAD:     'B',          // client return, compansate
  DELETED: 'D',          // cancellation
  TEMP:    'T',             // generate a temp order for electronic order
  NEW:     'N',
  LOADED:  'L',           // The driver took the food from Merchant
  DONE:    'F',             // Finish delivery
  MERCHANT_CHECKED: 'MC'  // VIEWED BY MERCHANT
};

export class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date() };
    this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
  }

  render() {
    const orders = this.state.orders;
    // const Menu = Menu;
    return (
      <div>
        <NavBar selected={Menu.Order} />
        <DatePicker selected={this.state.deliverDate}
        onChange={this.handelDeliverDateChange}
        />
        <div>订单数: x{orders.length}</div>
        {
          orders && orders.length > 0 &&
          orders.map(m =>
            <div className="row" key={m._id}>
              <div className="col">{m.clientName}</div>
              {/* <div className={m.status==='valid' ? 'status valid' : 'status invalid'}>{m.status}</div> */}
              {/* <div className="col date">{m.date}</div> */}
              <div className="col">{m.code}</div>
            </div>
          )
        }
        <Footer selected={Menu.Order}/>
      </div>
    );
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const q = {deliverDate: '2020-04-10'};
        const fields = ['id', 'code', 'clientName']; // 'items'
        this.orderSvc.find(q, fields).then(orders => {
          this.setState({ orders });
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

  handelDeliverDateChange(d){
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear();
    const deliverDate = yy + '-' + (mm>9? mm : '0'+mm) + '-' + (dd>9? dd : '0'+dd);
    // const start = date + 'T00:00:00.000Z';
    // const end = date + 'T23:59:59.000Z';
    // const time = d.toLocaleTimeString('en-US', { hour12: false });

    const q = {deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] }};
    const fields = ['_id', 'code', 'clientName']; // 'items'
    this.orderSvc.find(q, fields).then(orders => {
      this.setState({ orders });
    });
  }
}