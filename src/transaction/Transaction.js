import React from 'react';
import { OrderAPI } from '../order/API';
import { AccountAPI } from '../account/API';
import { TransactionAPI } from './API';

import './Transaction.scss';

const MerchantType = {
  GROCERY: 'G'
}

export class Transaction extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  transactionSvc = new TransactionAPI();

  constructor(props) {
    super(props);
    this.state = { transactions: [], order: null };
    this.onSearch = this.onSearch.bind(this);
  }

  render() {
    const order = this.state.order;
    const transactions = this.state.transactions;
    return (
      <div>
        <div className="l-label">Order Code:</div>
        <input className="r-col" onChange={this.onSearch} />
        {
          order && order._id &&
          <div>
            <div className="l-label">Order Id:</div>
            <div className="r-col">{order._id}</div>
            <div className="l-label">Payment Id:</div>
            <div className="r-col">{order.paymentId}</div>
            <div className="l-label">Cost:</div>
            <div className="r-col">{order.cost}</div>
            <div className="l-label">Price:</div>
            <div className="r-col">{order.price}</div>
            <div className="l-label">Client Id:</div>
            <div className="r-col">{order.clientId}</div>
            <div className="l-label">Merchant Id:</div>
            <div className="r-col">{order.merchantId}</div>
            <div className="l-label">Deliver Date:</div>
            <div className="r-col">{order.delivered}</div>
            <div className="l-label">Created Date:</div>
            <div className="r-col">{order.created}</div>
          </div>
        }

        {
          transactions.length &&
          transactions.map(t =>
            <div className="row" key={t._id}>
              <div className="col">{t._id}</div>
              <div className="col">{t.fromName}</div>
              <div className="col">{t.actionCode}</div>
              <div className="col">{t.amount}</div>
              <div className="col date">{t.delivered}</div>
              <div className="col date">{t.created}</div>
            </div>
          )
        }
      </div>
    );
  }

  onSearch(e) {
    const code = e.target.value;
    this.orderSvc.find({ code }).then(rs => {
      if (rs && rs.length > 0) {
        const order = rs[0];
        const paymentId = order.paymentId;
        if (paymentId) {
          this.transactionSvc.find({ paymentId }).then(transactions => {
            this.setState({ order, paymentId, transactions });
          });
        }
      }
    });
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        // this.orderSvc.checkWechatpay().then((transactions) => {
        //   this.setState({ transactions });
        // });

        // const qMerchant = { type: MerchantType.GROCERY };
        // const fields = ['_id', 'name', 'rules'];
        // this.merchantSvc.find(qMerchant, fields).then(orders => {
        //   this.scheduleSvc.find({}).then(schedules => {

        //     orders.map(m => {
        //       t.scheudles = schedules.filter(sc => sc.merchantId === t._id);
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