// import React, { Component } from 'react';
// import { StyleSheet } from 'react-native';
// import MapView from 'react-native-maps'
// export default class Map extends Component {
//   render() {
//     return (
//       <MapView style={{ ...StyleSheet.absoluteFillObject }}>
//       </MapView>
//     );
//   }
// }
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {getDistance, getPreciseDistance} from 'geolib';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: '',
      latitude: '',
    };
  }
  source = this.props.route.params.source;
  destination = this.props.route.params.destination;
  componentDidMount() {
    console.log(this.source, this.destination);
    Geolocation.getCurrentPosition(info =>
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
        show: true,
      }),
    );
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        {this.state.show ? (
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: Number(this.state.latitude),
              longitude: Number(this.state.longitude),
              latitudeDelta: 0.0932,
              longitudeDelta: 0.0043,
            }}>
            <Marker
              title="Source"
              pinColor="orange"
              coordinate={{
                latitude: Number(this.source.latitude),
                longitude: Number(this.source.longitude),
              }}
            />
            <Polyline
              coordinates={[
                {
                  latitude: this.source.latitude,
                  longitude: this.source.longitude,
                },
                {
                  latitude: this.destination.latitude,
                  longitude: this.destination.longitude,
                },
              ]}
              strokeColor="red"
              strokeColors={['#7F0000']}
              strokeWidth={5}
            />
            <Marker
              title="Destination"
              pinColor="red"
              coordinate={{
                latitude: Number(this.destination.latitude),
                longitude: Number(this.destination.longitude),
              }}
            />

            {/* <Marker  
           coordinate={{ latitude: 28.579660, longitude: 77.321110 }}  
           title={"JavaTpoint"}  
           description={"Java Training Institute"}  
         />   */}
          </MapView>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
