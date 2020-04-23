import React, {useState} from 'react';
import { connect } from 'react-redux';
import './MerchantScheduleCard.scss';
import { updateMerchantSchedulesAsync } from '../store/actions';

const getDowString = (schedule) => {
  // const schedule = group.schedules[0];
  const dows = [];
  schedule.rules.forEach(r => {
    if(r && r.pickup){
      dows.push(r.pickup.dow);
    }
  });
  return dows.join(',');
}

const getPickupTime = (schedule) => {
  const r = schedule.rules[0];
  if(r && r.pickup){
    return r.pickup.time;
  }else{
    return '10:00';
  }
}

const loadDatas = (merchants, group) => {
  if (merchants && group && group.schedules) {
    return merchants.map(m => {
      const schedule = group.schedules.find(s => s.merchantId === m._id);
      let dow = '';
      let time = '';
      if (schedule) {
        dow = getDowString(schedule);
        time = getPickupTime(schedule);
      }
      return { _id: m._id, name: m.name, dow, time };
    });
  } else {
    return [];
  }
}

function MerchantScheduleCard({ merchants, group }) {
  const areaId = group.areaId;
  const areaCode = group.areaCode;
  const datas = loadDatas(merchants, group);
  const merchantIds = merchants.map(m => m._id);
  const [weeks, setWeeks] = useState('');

  return (
    <div className="schedule-card">
      <div className="label">星期</div>
      <input onChange={(e) => setWeeks(e.target.value)}/>
      <div>{weeks}</div>
      <div onClick={() => updateMerchantSchedulesAsync({areaId, areaCode, merchantIds, weeks})}>保存</div>
      <div className="merchant-list">
        {
          datas && datas.length > 0 &&
          datas.map(m => <div key={m._id}>
            <div className="col-name">{m.name}</div>
            <div className="col-dow">{m.dow}</div>
            <div className="col-time">{m.time}</div>
          </div>)
        }
      </div>
      <div className="area-code">{group.areaCode}</div>
      {/* {
        group.schedules && group.schedules.length > 0 &&
        group.schedules.map(s => <div key={s._id}>
          {s.merchantId}
        </div>)
      } */}
      {/* {
        merchantSchedule &&
        <div className="cart-content">
          <div className="detail-row">
            <div className="label-md">客户:</div>
            {
              merchantSchedule.client
                ? <div>{merchantSchedule.client.username}</div>
                : <div>{merchantSchedule._id}:Client Exception</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">订单号:</div>
            <div>{merchantSchedule.code}</div>
          </div>

          <div className="detail-row">
            <div className="label-md">商家:</div>
            {
              merchantSchedule.merchant
                ? <div>{merchantSchedule.merchant.name}</div>
                : <div>{merchantSchedule._id}:Merchant Exception</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">司机:</div>
            {
              merchantSchedule.driver &&
              <div>{merchantSchedule.driver.username}</div>
            }
          </div>

          <div className="detail-row">
            <div className="label-md">备注:</div>
            <div>{merchantSchedule.note}</div>
          </div>

          <div className="detail-row">
            <div className="label-md">成本:</div>
            <div>{merchantSchedule.cost}</div>
          </div>
          <div className="detail-row">
            <div className="label-md">销售:</div>
            <div>{merchantSchedule.price}</div>
          </div>
        </div>
      } */}
    </div>
  )
}

const mapStateToProps = (state) => (
  {
    merchants: state.merchants,
    group: state.merchantScheduleGroup
  }
);
const mapDispatchToProps = dispatch => ({
  onSelectGroup: property => {
    setTimeout(() => {
      dispatch(updateMerchantSchedulesAsync(property));
    }, 500);
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MerchantScheduleCard);
