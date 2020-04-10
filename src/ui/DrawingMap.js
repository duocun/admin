/* global google */
import React from 'react';
import { Map, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class DrawingMap extends React.Component {

  constructor(props) {
    super(props);
    this.initMap = this.initMap.bind(this);
    this.state = { };
  }

  initMap(mapProps, map) {
    // var self = this;
    const {google} = mapProps;

    const drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: false,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_RIGHT,
        drawingModes: [
          'polygon'
          // google.maps.drawing.OverlayType.MARKER,
          // google.maps.drawing.OverlayType.POLYGON
        ]
      },
      map: map
    });
    // drawingManager.setMap(map);
  /*events and listeners and blah blah*/
  }

  render() {
    return (
      <Map google={this.props.google}
           onReady={this.initMap}
           onClick={this.onMapClicked}
           initialCenter={{lat: 43, lng: -79}}
           zoom={15}
           yesIWantToUseGoogleMapApiInternals >
      {/* <InfoWindow
        visible={this.showingInfoWindow} >
      </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCEd6D6vc9K-YzMH-QtQWRSs5HZkLKSWyk',
  libraries: ['drawing'],
  // LoadingContainer: LoadingContainer
})(DrawingMap);