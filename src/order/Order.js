import React from 'react';
import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './Order.scss';

export const MerchantType = {
  GROCERY: 'G'
}

export class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { payments: [], orders:[], deliverDate: new Date() };
    this.handleDeliverDateChange = this.handleDeliverDateChange.bind(this);
  }

  render() {
    const orders = this.state.orders
    // const payments = this.state.payments;
    return (
      <div>
        <DatePicker selected={this.state.deliverDate} onChange={this.handleDeliverDateChange} />
        {
          orders && orders.length>0 &&
          <div className="n-orders">
            订单数: {orders.length}
            <div className="detail">详情</div>
          </div>
        }

        {
          orders.map(order => 
          <div key={order._id}>
            <div>订单号:{order.code}</div>
            <div>客户:{order.clientName}</div>
            {/* <div>客户电话:{order.clientPhone}</div> */}
          </div>
          )
        }
          {/* // payments.length &&
          // payments.map(m =>
          //   <div className="row" key={m.paymentId}>
          //     <div className="col">{m.paymentId}</div>
          //     <div className={m.status==='valid' ? 'status valid' : 'status invalid'}>{m.status}</div>
          //     <div className="col date">{m.date}</div>
          //     <div className="col client">{m.client}</div>
          //   </div>
          // ) */}
      </div>
    );
  }



  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const qOrder = {};
        const fields = ['_id', 'code', 'clientName'];
        this.orderSvc.find(qOrder, fields).then(orders => {
          this.setState({orders});
        });
        // this.orderSvc.reqMissingWechatPayments().then((payments) => {
        // this.orderSvc.checkStripePay().then((payments) => {
        // this.orderSvc.checkWechatpay().then((payments) => {
          // this.setState({ payments });
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

  handleDeliverDateChange(deliverDate){
    this.setState({deliverDate})
  }
}