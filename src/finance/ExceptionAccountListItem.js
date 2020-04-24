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
          ? "list-item account-exception-item-selected"
          : "list-item account-exception-item"
      }
      onClick={()=>setSelectedAccount(account)}
    >
      {account.name}
    </div>
  );
};
