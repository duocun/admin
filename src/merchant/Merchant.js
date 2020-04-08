import React from 'react';
import { MerchantAPI, ScheduleAPI } from './API';
import { AccountAPI } from '../account/API';
import { OrderAPI } from '../order/API';
export const MerchantType = {
  GROCERY: 'G'
}

export class Merchant extends React.Component{
  merchantSvc = new MerchantAPI();
  scheduleSvc = new ScheduleAPI();
  accountSvc = new AccountAPI();
  orderSvc = new OrderAPI();
  constructor(props){
    super(props);
    this.state = {merchants:[]};
  }

  render(){
    const merchants = this.state.merchants;
    return (
      <div>
      {
        merchants.map(m => 
        <div>
          <div>{m.name}</div>
          {
            m.rules && m.rules.length > 0 &&
            m.rules.map(r => <div>订单截止: 周{r.orderEnd.dow + ' ' + r.orderEnd.time}</div>)
          }

          {
            m.schedules && m.schedules.length >0 &&
            m.schedules.map(schedule => 
              <div>
                <div>{schedule.areaCode}</div>
                <div>配送时间:</div>
                {
                  schedule.rules.map(r => <div>周{r.deliver.dow + ' ' + r.deliver.time}</div>)
                }
              </div>
            )
          }
        </div>
        )
      }
      </div>
    )
  }

  componentDidMount(){

    this.accountSvc.getCurrentAccount().then(account => {
      if(account){

        // this.orderSvc.checkWechatpay().then((r) => {
        //   const rt = r;
        // });

        const qMerchant = { type: MerchantType.GROCERY };
        const fields = ['_id', 'name', 'rules'];
        this.merchantSvc.find(qMerchant, fields).then(merchants => {
          this.scheduleSvc.find({}).then(schedules => {
            
            merchants.map(m => {
              m.scheudles = schedules.filter(sc => sc.merchantId === m._id);
            })
            this.setState({merchants});
          });
        });
      }else{
        this.props.history.push('/login');
      }
    })
  }
}