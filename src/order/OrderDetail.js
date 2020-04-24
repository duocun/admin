import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './OrderDetail.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders, selectOrder } from '../store/actions';
import { OrderStatus } from './OrderModel';
import OrderHeader from './OrderHeader';
import OrderList from './OrderList';
import OrderCard from './OrderCard';


const OrderDetail = ({ orders, order, loadOrders, selectOrder }) => {

  const [keyword, setSearchKeyword] = useState('');
  const [date, setDeliverDate] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = e => {
    setSearchKeyword(e.target.value);
  };
  useEffect(() => {
    const accountSvc = new AccountAPI();
    const orderSvc = new OrderAPI();
    accountSvc.getCurrentAccount().then(account => {
      if (account) {
        const deliverDate = date.toISOString().split('T')[0];
        const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] } };
        orderSvc.find(q).then(orders => {
          loadOrders(orders);
          if (orders && orders.length > 0 && !order) {
            selectOrder(orders[0]);
          }
          const results = filterByKeyword(orders, keyword);
          setSearchResults(results);
        });
      } else {
        this.props.history.push('/login');
      }
    });
  }, [keyword]);


  // constructor(props) {
  //   super(props);
  //   this.state = { orders: props.orders, deliverDate: new Date(), search: '', selectedOrder: undefined };
  //   // this.handelDeliverDateChange = this.handelDeliverDateChange.bind(this);
  // }

  // updateSearch(e) {
  //   this.setState({ search: e.target.value })
  // }

  // render() {
  // const orders = this.props.orders;



  // console.log("FilterOrder:" + filteredOrders.length);

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
              <input type="text" value={keyword} onChange={handleSearch} placeholder="查订单号，客户，客户电话，商家或司机" />
            </div>

            <OrderCard />
          </div>

          <div className="right">

            <div className="list order-list">

              {/* <div className="mobileHide" >订单数: {searchResults.length}
                </div> */}

              <div className="title">
                <span className="col-code">订单号</span>
                <span className="col-name">客户姓名</span>
              </div>

              <div>
                {
                  searchResults && searchResults.length > 0 &&
                  <OrderList orders={searchResults} />
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
  // }
}

const filterByKeyword = (orders, keyword) => {
  if (keyword) {
    return orders ? orders.filter(
      (od) => od.client.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          || od.merchant.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          || od.code.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
          || (od.driverName !== undefined && od.driverName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1)
    ) : [];
  } else {
    return orders;
  }
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  order: state.order,
  deliverDateState: state.deliverDate
});
// const mapDispatchToProps = dispatch => ({
//   onLoadOrders: property => {
//     dispatch(loadOrders(property));
//     dispatch(getOrdersAsync(property));
//   }
// });
export default connect(
  mapStateToProps,
  { loadOrders, selectOrder }
)(OrderDetail);