import React from 'react';
// import { AreaAPI } from './API';
// // import { MerchantAPI } from '../merchant/API';
// import { NavBar, Menu } from '../ui/NavBar';
// import { AreaList } from './AreaList';

// export const MerchantType = {
//   GROCERY: 'G'
// }

export class AreaList extends React.Component {
  // areaSvc = new AreaAPI();
  // merchantSvc = new MerchantAPI();
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {
          this.props.areas.map(area => 
            <div key={area._id}>{area.code}</div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    // const q = { type: MerchantType.GROCERY };
    // this.areaSvc.find(q).then(areas => {

    // });
  }
}