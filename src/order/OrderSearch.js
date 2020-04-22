import React from 'react';
import { connect } from 'react-redux';

import 'react-datepicker/dist/react-datepicker.css';
import { OrderAPI } from './API';
import { AccountAPI } from '../account/API';
import './OrderDetail.scss';
import { NavBar, Menu } from '../ui/NavBar';
import { Footer } from '../ui/Footer';
import { loadOrders } from '../store/actions';
import {OrderStatus} from './OrderModel';
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

              <div className="order-list">

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
        const deliverDate = this.state.deliverDate.toISOString().split('T')[0];
        const q = { deliverDate, status: { $nin: [OrderStatus.BAD, OrderStatus.DELETED, OrderStatus.TEMP] }  };
        this.orderSvc.find(q).then(orders => {
          this.setState({ orders, selectOrder: orders[0] });
          this.props.loadOrders(orders);
        });

      } else {
        this.props.history.push('/login');
      }
    })
  }

}


const mapStateToProps = (state) => ({ orders: state.orders,deliverDateState: state.deliverDate});

export default connect(
  mapStateToProps,
  { loadOrders }
)(OrderSearch);