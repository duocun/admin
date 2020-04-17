import React from 'react';
import { connect } from 'react-redux';
import { getAccountsAsync, setAccountKeyword } from '../store/actions';
import './AccountSearchBox.scss';

const AccountSearchBox = ({onChangeKeyword}) => {
  return (
    <div className="search-box">
      <input placeholder="查找用户名" onChange={(e) => onChangeKeyword(e.target.value)}/>
      {/* <div onChange={getAccountsByKeyword}/> */}
    </div>
  )
}

// const stateMap = (state) = { accounts };
const mapDispatchToProps = dispatch => ({
  onChangeKeyword: property => {
    dispatch(setAccountKeyword(property));
    setTimeout(() => {
      dispatch(getAccountsAsync(property));
    }, 500);
  }
});
export default connect(
  null,
  mapDispatchToProps
)(AccountSearchBox);