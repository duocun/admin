import React, {useEffect} from "react";
import AccountSearchBox from "../account/AccountSearchBox";
import AccountList from "../account/AccountList";
import TransactionList from "./TransactionList";
import FinanceHeader from "./FinanceHeader";
import { NavBar, Menu } from "../ui/NavBar";
import {TransactionAPI} from "../transaction/API";

import "./FinanceDetail.scss";

//only for users
const FinanceDetail = () => {

  useEffect(() => {
    const trSvc = new TransactionAPI();
    trSvc.find({fromId:'5cae0a7d9687ac4a075e2f56'}).then(r => {
      const k = r;
    });
  }, []);

  return (
    <div className="page">
      <div className="nav-menu-bar">
        <NavBar selected={Menu.Order} />
      </div>
      <div className="page-content finance-page">
        <FinanceHeader />
        <div className="finance-detail">
          {/* <AccountSearchBox />
          <AccountList /> */}



          <TransactionList />
        </div>
      </div>
    </div>
  );
};

export default FinanceDetail;

