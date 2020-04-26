import React from "react";

const AccountListItem = ({
  item,
  onSelectAccount,
}) => {

  return (
    <div
      className="list-item account-item"
      onClick={() => {
        onSelectAccount(item);
      }}
    >
      {item.username}
    </div>
  );
};
export default AccountListItem;
