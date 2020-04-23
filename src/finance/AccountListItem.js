import React from "react";

import "./AccountListItem.scss";

export const AccountListItem = ({
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
