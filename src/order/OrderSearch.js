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
import OrderProductList from './OrderProductList';
import OrderProductDetail from './OrderProductDetail';
import {getProductInfo} from './getProductInfo';

class OrderSearch extends React.Component {
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props) {
    super(props);
    this.state = { orders: [], deliverDate: new Date(), search: '', selectOrder: undefined,filteredOrders:[] };

  }

  updateSearch(e) {
    this.setState({ search: e.target.value })
  }
  


  render() {
    let prodcutArray = [];
    prodcutArray = getProductInfo(this.props.orders);

    

    const filteredOrders = prodcutArray.filter(
      (od) => {
        
        return od.productName.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
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
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="请输入商品信息以查询" />
              </div>

                <OrderProductDetail />

            </div>

            <div className="right">

              <div className="selectCard">

                <div className="mobileHide" >产品数: {filteredOrders.length}
                </div>

                <div className="title">
                  
                  <span>产品名称</span>
                </div>

                <div>
                  {
                    filteredOrders && filteredOrders.length > 0 &&
                    filteredOrders.map(m =>
                      <OrderProductList orders={filteredOrders} />
                
                    )
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
)(OrderSearch);