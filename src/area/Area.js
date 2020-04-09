import React from 'react';
import { AreaApi } from './API';
import { MerchantAPI } from '../merchant/API';

export const MerchantType = {
  GROCERY: 'G'
}

export class Area extends React.Component{
  areaSvc = new AreaApi();
  merchantSvc = new MerchantAPI();
  constructor(props){
    super(props);
  }

  render(){

  }

  componentDidMount(){
    const q = { type: MerchantType.GROCERY };
    this.areaSvc.find(q).then(areas => {

    });
  }
}