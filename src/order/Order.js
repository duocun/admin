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
    this.state = { orders: [] };
  }

  render() {
    const orders = this.state.orders;
    // const Menu = Menu;
    return (
      <div>
        <NavBar selected={Menu.Order} />
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
}