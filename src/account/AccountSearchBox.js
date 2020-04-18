import React from 'react';
import { connect } from 'react-redux';
import { getAccountsAsync, setAccountKeyword, showAccountOptions, selectAccount } from '../store/actions';
import './AccountSearchBox.scss';

const AccountSearchBox = ({account, keyword, onChangeKeyword, onKeyDown}) => {
  return (
    <div className="search-box">
      <input placeholder="查找用户名" 
      value={keyword} 
      onKeyDown={(e) => onKeyDown(e.keyCode, e.target.value)}
      onChange={(e) => onChangeKeyword(e.target.value)}
      />
      {/* <div onChange={getAccountsByKeyword}/> */}
    </div>
  )
}

const mapStateToProps = (state) => ({ 
  account: state.account,
  keyword: state.accountKeyword
});

const mapDispatchToProps = dispatch => ({
  onChangeKeyword: property => {
    dispatch(selectAccount(null));
    dispatch(setAccountKeyword(property));
    dispatch(showAccountOptions(true));
    setTimeout(() => {
      dispatch(getAccountsAsync(property));
    }, 500);
  },
  onKeyDown: (keyCode, val) => {
    if (keyCode === 13) { // return key
      dispatch(setAccountKeyword(val));
      dispatch(showAccountOptions(true));
      setTimeout(() => {
        dispatch(getAccountsAsync(val));
      }, 500);
    } else if (keyCode === 38) { // up arrow
      dispatch(selectAccount(null));
      // if (activeOption === 0) {
      //   return;
      // }
      // this.setState({ activeOption: activeOption - 1 });
    } else if (keyCode === 40) { // down arrow
      dispatch(selectAccount(null));
      // if (activeOption - 1 === filteredOptions.length) {
      //   return;
      // }
    } else {
      dispatch(selectAccount(null));
    }
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSearchBox);