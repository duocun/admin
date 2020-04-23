import React from 'react';
import { connect } from 'react-redux';
import { selectAccount, setAccountKeyword, getTransactionsAsync } from '../store/actions';

const AccountListItem = ({item, onSelectAccount}) => {
  return (
    <div className="list-item account-item" onClick={() => {onSelectAccount(item)}}>
      {item.username}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onSelectAccount: item => {
    dispatch(selectAccount(item));
    dispatch(setAccountKeyword(item.username));
    setTimeout(() => {
      dispatch(getTransactionsAsync(item));
    }, 500);
  }
});
export default connect(
  null,
  mapDispatchToProps
)(AccountListItem);