
import React from 'react';
import { connect } from 'react-redux';
import { selectMerchantScheduleGroup } from '../store/actions';

const MerchantScheduleGroup = ({group, onSelectGroup}) => {
  return (
    <div className="list-item schedule-item" onClick={() => onSelectGroup(group)}>
      {group.areaCode}
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  onSelectGroup: item => {
    dispatch(selectMerchantScheduleGroup(item));
    // setTimeout(() => {
    //   dispatch(getTransactionsAsync(item));
    // }, 500);
  }
});
export default connect(
  null,
  mapDispatchToProps
)(MerchantScheduleGroup);