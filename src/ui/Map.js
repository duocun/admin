import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.select = this.select.bind(this);
  }

  render() {
    // const selected = this.props.selected;
    return (
      <div>
      <Map google={this.props.google} zoom={14}/>
      <Marker onClick={this.onMarkerClick} name={'Current location'} />
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCEd6D6vc9K-YzMH-QtQWRSs5HZkLKSWyk')
})(MapContainer)