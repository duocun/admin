import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import { Merchant } from './merchant/Merchant';
import { Transaction } from './transaction/Transaction';
import { Order } from './order/Order';
import { Login } from './account/Login';

function App() {
  return (
    <div className="App">
      {/* <Merchant /> */}
      <BrowserRouter>
            {/* <Route path="/food-delivery" component={() => {
              window.location.href = "http://localhost:5000"; // "https://duocun.ca";
              return null;
            }} /> */}
            
            <Route path="/login" component={Login} />
            <Route exact path="/merchant/" component={Merchant} />
            <Route exact path="/admin2/" component={Order} />
            <Route exact path="/transaction/" component={Transaction} />
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
