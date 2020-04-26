import React from "react";
import AccountSearchBox from "../account/AccountSearchBox";
import AccountList from "../account/AccountList";
import TransactionList from "./TransactionList";
import FinanceHeader from "./FinanceHeader";
import { NavBar, Menu } from "../ui/NavBar";

import "./FinanceDetail.scss";

//only for users
const FinanceDetail = () => {
  return (
    <div className="page">
      <div className="nav-menu-bar">
        <NavBar selected={Menu.Order} />
      </div>
      <div className="page-content finance-page">
        <FinanceHeader />
        <div className="finance-detail">
          <AccountSearchBox />
          <AccountList />
          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default FinanceDetail;
