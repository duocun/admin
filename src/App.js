import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Merchant } from './merchant/Merchant';
// import { Transaction } from './transaction/Transaction';
import OrderDetail from './order/OrderDetail';
import { Login } from './account/Login';
import { Area } from './area/Area';
import OrderSummary from './order/OrderSummary';
import OrderSearch from './order/OrderSearch';
import { FinanceDetail } from './finance/FinanceDetail';

function App() {
  return (
    <div className="App">
      {/* <Merchant /> */}
      <BrowserRouter>
        {/* <Route path="/food-delivery" component={() => {
              window.location.href = "http://localhost:5000"; // "https://duocun.ca";
              return null;
            }} /> */}

        <Route exact path="/admin2/" component={Login} />
        <Route path="/login" component={Login} />
        <Route exact path="/merchant/" component={Merchant} />
        <Route exact path="/order/" component={OrderDetail} />
        <Route exact path="/order/detail" component={OrderDetail} />
        <Route exact path="/order/summary" component={OrderSummary} />
        <Route exact path="/order/search" component={OrderSearch} />
        <Route exact path="/area/" component={Area} />
        <Route exact path="/finance/" component={FinanceDetail} />
        {/* <Route path="/merchant/:id" component={Merchant} />
            <Route path="/order" component={Order} />
            <Route path="/delivery/:id" component={Delivery} />
            <Route path="/history/:accountId" component={OrderHistory} />
            <Route path="/account" component={Account} />
            <Route path="/balance" component={Balance} /> */}
        {/* <Route path="/history" component={() => {
              window.location.href = "http://localhost:3001/history";// "https://duocun.ca";
              return null;
            }} />
            <Route path="/account" component={() => {
              window.location.href = "http://localhost:3001/account";// "https://duocun.ca";
              return null;
            }} /> */}

      </BrowserRouter>
    </div>
  );
}

export default App;
