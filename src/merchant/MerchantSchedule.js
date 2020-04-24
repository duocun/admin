import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { selectMerchantS, getTransactionsAsync } from '../store/actions';
import { MerchantScheduleGroupList } from './MerchantScheduleGroupList';
import MerchantScheduleCard from './MerchantScheduleCard';
import { MerchantAPI, ScheduleAPI } from './API';
import { Footer } from '../ui/Footer';
import { loadMerchantSchedules, loadMerchants } from '../store/actions';
import { OrderType } from '../order/OrderModel';

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
    scheduleMap[areaCode] = { areaId, areaCode, schedules: [] };
  });

  merchantSchedules.forEach(ms => {
    scheduleMap[ms.areaCode].schedules.push(ms);
  });
  return scheduleMap;
}

// component
const MerchantSchedule = ({ merchantSchedules, loadMerchantSchedules, loadMerchants }) => {
  const [scheduleMap, setScheduleMap] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const scheduleSvc = new ScheduleAPI();
    const merchantSvc = new MerchantAPI();
    const q = {};

    if (!loaded) {
      scheduleSvc.find(q).then(mss => {
        const qMerchant = { type: OrderType.GROCERY };
        merchantSvc.find(qMerchant).then(merchants => {
          loadMerchantSchedules(mss);
          loadMerchants(merchants);
          setSchedules(mss);
          const m = groupByArea(mss);
          setScheduleMap(m);
          setLoaded(true);
        });
      });
    }
  });

  return (
    <div className="page-content">
      {
        scheduleMap &&
        <MerchantScheduleCard />
      }
      {
        merchantSchedules && merchantSchedules.length > 0 &&
        <MerchantScheduleGroupList groups={scheduleMap}/>
      }
      <Footer selected={Menu.Area} />
    </div>
  )
}

const mapStateToProps = (state) => ({
  // group: merchantScheduleGroup
  // merchants: state.merchants,
  merchantSchedules: state.merchantSchedules
});

// const mapDispatchToProps = dispatch => ({
//   getMerchantSchedules: () => {
//     dispatch(getMerchantSchedulesAsync());
//     dispatch(getMerchantsAsync());
//   }
// });
export default connect(
  mapStateToProps,
  // mapDispatchToProps,
  {loadMerchantSchedules, loadMerchants}
)(MerchantSchedule);