import React from 'react';
import { AreaAPI } from './API';
// import { MerchantAPI } from '../merchant/API';
import { NavBar, Menu } from '../ui/NavBar';
import { AreaList } from './AreaList';

export const MerchantType = {
  GROCERY: 'G'
}

export class Area extends React.Component {
  areaSvc = new AreaAPI();
  // merchantSvc = new MerchantAPI();
  constructor(props) {
    super(props);
    this.state = {areas:[]};
  }

  render() {
    const areas = this.state.areas;
    return (
      <div>
        <NavBar selected={Menu.Order} />
        {
          areas && areas.length>0 &&
          <AreaList areas={areas}/>
        }
      </div>
    )
  }

  componentDidMount() {
    const q = { appType: MerchantType.GROCERY };
    this.areaSvc.find(q).then(areas => {
      this.setState({areas});
    });
  }
}