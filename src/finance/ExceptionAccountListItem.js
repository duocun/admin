import React from "react";

import "./ExceptionAccountListItem.scss";

export const ExceptionAccountListItem = ({
  account,
  selectedAccount,
  setSelectedAccount,
}) => {
  return (
    <div
      className={
        selectedAccount === account
          ? "list-item account-item-selected"
          : "list-item account-item"
      }
      onClick={()=>setSelectedAccount(account)}
    >
      {account.name}
    </div>
  );
};
