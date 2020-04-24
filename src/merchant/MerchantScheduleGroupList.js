import React from 'react';
import {connect} from 'react-redux';

import MerchantScheduleGroup from './MerchantScheduleGroup';

export const MerchantScheduleGroupList = ({groups}) => {
  const areas = Object.keys(groups);
  return (
    <div className="list schedule-list">
    {
      areas && areas.length > 0 &&
      <div className="title">区域</div>
    }
    {
      areas && areas.length > 0 &&
      areas.map(a => <MerchantScheduleGroup key={a} group={groups[a]}/>)
    }
    </div>
  )
}

// const mapStateToProps = (state) => ({
//   merchantSchedules: state.merchantSchedules
// });

// export default connect(
//   mapStateToProps
// )(MerchantScheduleList);