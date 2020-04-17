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
import OrderMerchantList from './OrderMerchantList';
import OrderDriverList from './OrderDriverList';
import OrderDriverCard from './OrderDriverCard';

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


class OrderSummary extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date() };
    this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
   
  }




  render() {
   
    const orders = this.state.orders;

  
    const productArray = orders.map(function(od){ return od.items });
    //get total item
    var totalItems = 0;
    for(var i =0;i<productArray.length;i++){
        for(var j=0;j<productArray[i].length;j++){
            totalItems++;
        }
    }

    return (
      <div>
      <div className="naviBar">
      <NavBar selected={Menu.Order} />
      </div>

      <div className="summaryPage">
        
        <h3>送货日期 <DatePicker selected={this.state.deliverDate}
        onChange={this.handelDeliverDateChange}
        /></h3>
        
      

        <div className="summaryCard" >
            <h3>统计</h3>
            <div>商品总数: {totalItems}</div>
            <div>订单总数: {orders.length}</div>
      
        </div>

        <OrderMerchantList />
        <OrderDriverList />
        <OrderDriverCard />
      </div>
     

     
       <div>
      <Footer selected={Menu.Order}/>
      </div>
      </div>
     
    );
  }

  componentDidMount() {
    this.accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const q = {deliverDate: '2020-04-10'};
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

  handelDeliverDateChange(d){
    const mm = d.getMonth() + 1;
    const dd = d.getDate();
    const yy = d.getFullYear();
    const deliverDate = yy + '-' + (mm>9? mm : '0'+mm) + '-' + (dd>9? dd : '0'+dd);
    this.setState({ deliverDate: new Date(deliverDate) });
    // const start = date + 'T00:00:00.000Z';
    // const end = date + 'T23:59:59.000Z';
    // const time = d.toLocaleTimeString('en-US', { hour12: false });

    const q = {deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] }};
    const fields = ['_id', 'code', 'clientName']; // 'items'
    this.orderSvc.find(q, fields).then(orders => {
      this.setState({ orders, deliverDate: new Date(deliverDate + 'T00:00:00.000') });
    }); 
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}
export default connect(
  mapStateToProps,
  {loadOrders}
)(OrderSummary);