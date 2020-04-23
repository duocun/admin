import React from 'react';
import { connect } from 'react-redux';
// import { selectMerchantS, getTransactionsAsync } from '../store/actions';
import {MerchantScheduleGroupList} from './MerchantScheduleGroupList';
import MerchantScheduleCard from './MerchantScheduleCard';
import {Footer} from '../ui/Footer';
import {getMerchantsAsync, getMerchantSchedulesAsync} from '../store/actions';

const Menu = {
  Order: 'O',
  Area: 'A',
}
// helper function
const groupByArea = (merchantSchedules) => {
  const scheduleMap = {};

  // init map
  merchantSchedules.forEach(ms => {
    const areaId = ms.areaId;
    const areaCode = ms.areaCode;
    scheduleMap[areaCode] = {areaId, areaCode, schedules: []};
  });

  merchantSchedules.forEach(ms => {
    scheduleMap[ms.areaCode].schedules.push(ms);
  });
  return scheduleMap;
}

// component
const MerchantSchedule = ({merchantSchedules, getMerchantSchedules}) => {
  const scheduleMap = groupByArea(merchantSchedules);
  return (
    <div className="page-content">
      <div onClick={() => getMerchantSchedules()}>加载</div>
      <MerchantScheduleCard />
      {
        merchantSchedules && merchantSchedules.length > 0 &&
        <MerchantScheduleGroupList groups={scheduleMap}/>
      }
      <Footer selected={Menu.Area} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  merchants: state.merchants,
  merchantSchedules: state.merchantSchedules
});

const mapDispatchToProps = dispatch => ({
  getMerchantSchedules: () => {
    dispatch(getMerchantSchedulesAsync());
    dispatch(getMerchantsAsync());
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantSchedule);