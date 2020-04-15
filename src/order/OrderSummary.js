import React from 'react';
import { connect } from 'react-redux';
// import * as moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './Order.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders } from '../store/actions';
import { Link } from 'react-router-dom';

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
    this.state = { orders: [], deliverDate: new Date(), };
    this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
  }

  


  render() {
   
    const order = this.state.orders;
//reformating merchant detail array 
    let merchantMap = {};
    for(var i=0;i<order.length;i++){
        var mid = order[i].merchantId;
        if(!merchantMap[mid]){
            merchantMap[mid]=[0,0,[],[]]; //idx 0 for orderNum, idx 1 for productNum, idx 2 for cost
        }
        merchantMap[mid][0]++;
        for(var item in order[i].items){
            merchantMap[mid][1]++;
        }
        merchantMap[mid][2].push(order[i].cost);
        if(merchantMap[mid][3].length==0||!merchantMap[mid][3].includes(order[i].merchantName)){
        merchantMap[mid][3].push(order[i].merchantName)}
    }
    var merchantArray = [];
    for (var mid in merchantMap) {
        merchantArray.push({merchantId: mid, details: merchantMap[mid]});
      }
//reformating driver detail array 
let driverMap = {};
for(var i=0;i<order.length;i++){
    var did = order[i].driverId;
    if(did!=undefined){
        if(!driverMap[did]){
            driverMap[did]=[0,0,[],[]]; //idx 0 for orderNum, idx 1 for productNum, idx 2 for cost
        }
        driverMap[did][0]++;
        for(var item in order[i].items){
            driverMap[did][1]++;
        }
        driverMap[did][2].push(order[i].cost);
        driverMap[did][3] = order[i].driverName;

}
var driverArray = [];
for (var did in driverMap) {
    driverArray.push({driverId: did, details: driverMap[did]});
  }
}



  
    const productArray = order.map(function(od){ return od.items });
    //get total item
    var totalItems = 0;
    for(var i =0;i<productArray.length;i++){
        for(var j=0;j<productArray[i].length;j++){
            totalItems++;
        }
    }

    return (
      <div>
        <NavBar selected={Menu.Order} />
        <h3>送货日期 <DatePicker selected={this.state.deliverDate}
        onChange={this.handelDeliverDateChange}
        /></h3>
        {console.log(driverArray)}
      

        <div className="summaryCard" >
            <h3>统计</h3>
            <div>商品总数: {totalItems}</div>
            <div>订单总数: {order.length}</div>
      
        </div>

        <div className="summaryCard">
        <div className="title">
        <span>厂家名称</span>
        <span>花费总额</span>
        <span>订单总数</span>
        <span>产品总数</span>
        </div>
            {
            merchantArray&&merchantArray.length>0&&
            merchantArray.map(m=>
                <div className="orderRow" key={m.merchantId}>
                    <div className="col">{m.details[3]}</div>
                    <div className="col">{m.details[2].reduce(function(a, b){
                        var num =a+b;  
                        return parseFloat(num.toFixed(2)) }, 0)}
                    </div>
                    <div className="col">{m.details[0]}</div>
                    <div className="col">{m.details[1]}</div>
                    
                 
                </div>
                    )
            }
        </div>
        
        

        <div className="summaryCard">
        <div className="title">
        <span>司机名称</span>
        <span>花费总额</span>
        <span>订单总数</span>
        <span>产品总数</span>
        </div>
            {
            driverArray&&driverArray.length>0&&
            driverArray.map(m=>
                <div className="orderRow" key={m.driverId}>
                    <div className="col">{m.details[3]}</div>
                    <div className="col">{m.details[2].reduce(function(a, b){
                        var num =a+b;  
                        return parseFloat(num.toFixed(2)) }, 0)}
                    </div>
                    <div className="col">{m.details[0]}</div>
                    <div className="col">{m.details[1]}</div>
                    
                 
                </div>
                    )
            }
        </div>
       

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