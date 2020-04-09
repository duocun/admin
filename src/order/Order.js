import React from 'react';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './Order.scss';
import { NavBar, Menu } from '../ui/NavBar';

export const MerchantType = {
  GROCERY: 'G'
}

export class Order extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { payments: [] };
  }

  render() {
    const payments = this.state.payments;
    // const Menu = Menu;
    return (
      <div>
        <NavBar selected={Menu.Order} />
        {/* {
          payments.length &&
          payments.map(m =>
            <div className="row" key={m.paymentId}>
              <div className="col">{m.paymentId}</div>
              <div className={m.status==='valid' ? 'status valid' : 'status invalid'}>{m.status}</div>
              <div className="col date">{m.date}</div>
              <div className="col client">{m.client}</div>
            </div>
          )
        } */}
      </div>
    );
  }



  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        this.orderSvc.reqMissingWechatPayments().then((payments) => {
        // this.orderSvc.checkStripePay().then((payments) => {
        // this.orderSvc.checkWechatpay().then((payments) => {
          this.setState({ payments });
        });

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