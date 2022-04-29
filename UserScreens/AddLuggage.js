import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput, Modal, Button} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';
import MapView from 'react-native-maps';
import {Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';

class AddLuggage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      dateText: 'Date of Pickup',
      date: new Date(),
      nameoforder: '',
      source: '',
      destination: '',
      weight: '',
      numberofitems: '',
      price: '',
      visible: false,
      latitude: '',
      longitude: '',
      sla: '',
      slo: '',
      dla: '',
      dlo: '',
      modVisible: false,
      distance: 'Distance',
    };
    this.onDismiss1 = this.onDismiss1.bind(this);
    this.onDismiss2 = this.onDismiss2.bind(this);
  }

  userData = this.props.route.params.userData;
  componentDidMount() {
    // const hasLocationPermission = async () => {

    //   const hasPermission = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );

    //   if (hasPermission === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('lagi req permission');
    //     return true;
    //   }

    //   const status = await PermissionsAndroid.check(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );

    //   if (status) {
    //     console.log('permission diberikan');
    //     return true;
    //   }

    //   if (status === PermissionsAndroid.RESULTS.DENIED) {
    //     ToastAndroid.show(
    //       'Location permission denied by user.',
    //       ToastAndroid.LONG,
    //     );
    //   } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    //     ToastAndroid.show(
    //       'Location permission revoked by user.',
    //       ToastAndroid.LONG,
    //     );
    //   }
    //   return false;
    // };
    // hasLocationPermission();
    Geolocation.getCurrentPosition(info =>
      this.setState({
        longitude: info.coords.longitude,
        latitude: info.coords.latitude,
        latitude2: info.coords.latitude,
        longitude2: info.coords.longitude,
        show: true,
      }),
    );
    console.log(this.userData, 'userAddLuggage');
  }
  distance() {
    var pdis = getPreciseDistance(
      {latitude: this.state.sla, longitude: this.state.slo},
      {latitude: this.state.dla, longitude: this.state.dlo},
    );
    // alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
    this.setState({
      distance: pdis / 1000,
    });
  }
  async submitOrder() {
    if (
      this.state.date == '' ||
      this.state.nameoforder == '' ||
      this.state.numberofitems == '' ||
      this.state.weight == '' ||
      this.state.price == '' ||
      this.state.sla == '' ||
      this.state.dla == ''
    ) {
      alert('Please fill all the fields!!');
    } else if (
      this.state.dateText == 'Date of Pickup' ||
      this.state.dateText == ''
    ) {
      alert('Please Select pickup date!!');
    } else {
      await fetch('https://doorstep-server-api.herokuapp.com/add-order', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          nameO: this.state.nameoforder,
          source: {
            latitude: this.state.sla,
            longitude: this.state.slo,
          },
          destination: {
            latitude: this.state.dla,
            longitude: this.state.dlo,
          },
          weight: this.state.weight,
          date: this.state.date.toLocaleDateString(),
          noofitems: this.state.numberofitems,
          price: Math.round(this.state.price),
          distance: this.state.distance,
          placedBy: {
            userid: this.userData._id,
            name: this.userData.name,
          },
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.status == 'ok') {
            alert(
              'Order Placed Successfully!!. You can see your orders in Order Pending!!',
            );
            this.props.navigation.navigate('UserHomeScreen');
          } else {
            alert(data.error);
          }
        });
    }
  }
  saveSource() {
    this.setState(
      {
        visible: false,
        sla: this.state.latitude,
        slo: this.state.longitude,
        showSlat: true,
      },
      function () {
        console.log(this.state.sla, this.state.slo);
      },
    );
  }
  showModal() {
    ToastAndroid.show(
      'Please Turn On Your Location!!',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
    ToastAndroid.show(
      'Hold the marker and drag it to your source!!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );

    this.setState({
      visible: true,
    });
  }
  onDismiss1() {
    this.setState({
      visible: false,
    });
  }
  savedestination() {
    if (this.state.sla == '') {
      this.setState({
        modVisible: false,
      });
      return alert('Please Choose Source');
    }
    this.setState(
      {
        modVisible: false,
        dla: this.state.latitude2,
        dlo: this.state.longitude2,
        showlat: true,
      },
      function () {
        console.log(this.state.dla, this.state.dlo);
        this.distance();
      },
    );
  }
  onDismiss2() {
    this.setState({
      modVisible: false,
    });
  }
  showModal2() {
    ToastAndroid.show(
      'Hold the marker and drag it to your Destination!!',
      ToastAndroid.LONG,
      ToastAndroid.TOP,
    );

    this.setState({
      modVisible: true,
    });
  }

  calculatePrice(e) {
    if (this.state.sla == '' || this.state.dla == '') {
      return alert('First Select Source and Destination');
    }
    const weight = e.nativeEvent.text;
    this.setState({
      weight: e.nativeEvent.text,
    });
    console.log(weight / 5);
    if (weight / 5 == 1) {
      this.setState({
        price: 20 * this.state.distance,
      });
    } else {
      const weight2 = weight / 5;
      // console.log( * 10 * Number(weight2), 'weight');
      this.setState(
        {
          price: this.state.distance * 10 * Number(weight2),
        },
        function () {
          console.log(this.state.price);
        },
      );
    }
  }
  render() {
    return (
      <>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{flex: 1, backgroundColor: 'white'}}>
          <View>
            <DatePicker
              modal
              mode="date"
              theme="dark"
              open={this.state.open}
              date={this.state.date}
              onConfirm={date => {
                this.setState(
                  {
                    open: false,
                    date: date,
                    dateText: date.toLocaleDateString(),
                  },
                  function () {
                    console.log(this.state.date.toLocaleDateString(), 'date');
                  },
                );
              }}
              onCancel={() => {
                this.setState({open: false});
              }}
            />
            <TextInput
              label="Name of order"
              value={this.state.nameoforder}
              onChange={e =>
                this.setState({
                  nameoforder: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
            {/* <TextInput
              label="Source"
              value={this.state.source}
              onChange={e =>
                this.setState({
                  source: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            /> */}
            {/* <TextInput
              label="Destination"
              value={this.state.destination}
              onChange={e =>
                this.setState({
                  destination: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            /> */}
            <TouchableOpacity
              onPress={() => {
                this.showModal();
              }}
              style={{
                borderColor: '#0163d2',
                borderWidth: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                paddingVertical: 15,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {this.state.showSlat ? (
                <Text
                  style={{
                    color: 'green',
                    fontSize: 16,
                  }}>
                  Source Picked
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                  }}>
                  Choose Source
                </Text>
              )}

              <Feather
                name="map-marker-radius"
                size={30}
                color={this.state.showlat ? 'green' : 'black'}
              />
            </TouchableOpacity>
            {this.state.showSlat ? (
              <View style={{marginLeft: 18}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  {`Latitude: ${this.state.sla}`}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  {`Longitude: ${this.state.slo} `}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                this.showModal2();
              }}
              style={{
                borderColor: '#0163d2',
                borderWidth: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                paddingVertical: 15,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {this.state.showlat ? (
                <Text
                  style={{
                    color: 'green',
                    fontSize: 16,
                  }}>
                  Destination Picked
                </Text>
              ) : (
                <Text
                  style={{
                    color: 'grey',
                    fontSize: 16,
                  }}>
                  Choose Destination
                </Text>
              )}
              <Feather
                name="map-marker-radius"
                size={30}
                color={this.state.showlat ? 'green' : 'black'}
              />
            </TouchableOpacity>
            {this.state.showlat ? (
              <View style={{marginLeft: 18}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  {`Latitude: ${this.state.dla}`}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 13,
                    fontWeight: '600',
                  }}>
                  {`Longitude: ${this.state.dlo} `}
                </Text>
              </View>
            ) : null}

            <TouchableOpacity
              activeOpacity={1}
              style={{
                borderColor: '#0163d2',
                borderWidth: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                paddingVertical: 15,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                }}>
                {`${this.state.distance} Km`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({open: true})}
              style={{
                borderColor: '#0163d2',
                borderWidth: 1,
                marginHorizontal: 15,
                marginVertical: 10,
                paddingVertical: 18,
                paddingHorizontal: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                }}>
                {this.state.dateText}
              </Text>
              <Feather name="calendar" size={25} color="black" />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                marginHorizontal: 15,
              }}>
              <TextInput
                label="Weight"
                value={this.state.weight}
                onChange={e => this.calculatePrice(e)}
                keyboardType="number-pad"
                clearButtonMode="always"
                mode="outlined"
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  width: '45%',
                  marginRight: 10,
                }}
                activeOutlineColor="#0163D2"
                outlineColor={'#0163D2'}
              />
              <TextInput
                label="Number of Items"
                value={this.state.numberofitems}
                keyboardType="number-pad"
                onChange={e =>
                  this.setState({
                    numberofitems: e.nativeEvent.text,
                  })
                }
                clearButtonMode="always"
                mode="outlined"
                style={{
                  marginVertical: 10,
                  backgroundColor: 'white',
                  width: '45%',
                }}
                activeOutlineColor="#0163D2"
                outlineColor={'#0163D2'}
              />
            </View>

            <TextInput
              disabled
              defaultValue={Math.round(this.state.price).toString()}
              label="Price in ₹"
              keyboardType="number-pad"
              value={Math.round(this.state.price).toString()}
              onChange={e =>
                this.setState({
                  price: e.nativeEvent.text,
                })
              }
              clearButtonMode="always"
              mode="outlined"
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
                backgroundColor: 'white',
              }}
              activeOutlineColor="#0163D2"
              outlineColor={'#0163D2'}
            />
          </View>

          {/* <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin: 15,
              position: 'relative',
              height: 130,
              borderRadius: 5,
            }}>
            <View style={{position: 'absolute', top: -40, marginLeft: 10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin: 15,
              position: 'relative',
              height: 130,
              borderRadius: 5,
            }}>
            <View style={{position: 'absolute', top: -40, marginLeft: 10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin: 15,
              position: 'relative',
              height: 130,
              borderRadius: 5,
            }}>
            <View style={{position: 'absolute', top: -40, marginLeft: 10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin: 15,
              position: 'relative',
              height: 130,
              borderRadius: 5,
            }}>
            <View style={{position: 'absolute', top: -40, marginLeft: 10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                }}
                source={require('../assets/orders.png')}
              />
            </View>
          </View>
          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 1,
              margin: 15,
              position: 'relative',
              height: 130,
              borderRadius: 5,
            }}>
            <View style={{position: 'absolute', top: -40, marginLeft: 10}}>
              <Image
                style={{
                  height: 180,
                  width: 130,
                  marginTop: 0,
                }}
                source={require('../assets/orders.png')}
              />
            </View> */}
          {/* </View> */}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            this.submitOrder();
          }}>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              height: 55,

              backgroundColor: '#0163D2',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                fontWeight: '600',
              }}>
              Place Order
            </Text>
          </View>
        </TouchableOpacity>
        {this.state.show ? (
          <Modal
            visible={this.state.visible}
            onDismiss={this.onDismiss1}
            contentContainerStyle={{
              backgroundColor: 'white',
              flex: 1,
              margin: 20,
              marginTop: -10,
            }}>
            <MapView
              style={styles.mapStyle}
              showsUserLocation={true}
              zoomEnabled={true}
              zoomControlEnabled={true}
              initialRegion={{
                latitude: Number(this.state.latitude),
                longitude: Number(this.state.longitude),
                latitudeDelta: 0.0032,
                longitudeDelta: 0.003,
              }}>
              <Marker
                title="Current Location"
                draggable
                coordinate={{
                  latitude: Number(this.state.latitude),
                  longitude: Number(this.state.longitude),
                }}
                onDragEnd={e => {
                  this.setState(
                    {
                      longitude: e.nativeEvent.coordinate.longitude,
                      latitude: e.nativeEvent.coordinate.latitude,
                    },
                    function () {
                      console.log(this.state.longitude, this.state.latitude);
                    },
                  );
                }}
              />
              {/* <Polyline
                coordinates={[
                  {
                    latitude: 19.2123584,
                    longitude: 72.8571709,
                  },
                  {
                    latitude: 19.216317817184322,
                    longitude: 72.85853493958712,
                  },
                ]}
                strokeColor="red"
                strokeColors={['#7F0000']}
                strokeWidth={5}
              /> */}
            </MapView>
            <View
              style={{
                bottom: 0,
                position: 'absolute',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Button
                color="white"
                onPress={() => {
                  this.saveSource();
                }}
                style={{
                  width: '60%',
                  backgroundColor: '#0163d2',
                }}>
                Save Starting Point
              </Button>
            </View>
          </Modal>
        ) : null}

        <Modal
          visible={this.state.modVisible}
          onDismiss={this.onDismiss2}
          contentContainerStyle={{
            backgroundColor: 'white',
            flex: 1,
            margin: 20,
            marginTop: -10,
          }}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={{
              latitude: Number(this.state.latitude2),
              longitude: Number(this.state.longitude2),
              latitudeDelta: 0.0032,
              longitudeDelta: 0.003,
            }}>
            <Marker
              title="Source "
              coordinate={{
                latitude: Number(this.state.sla),
                longitude: Number(this.state.slo),
              }}
              pinColor="orange"
            />
            <Marker
              title="Destination"
              draggable
              coordinate={{
                latitude: Number(this.state.latitude2),
                longitude: Number(this.state.longitude2),
              }}
              onDragEnd={e => {
                this.setState(
                  {
                    longitude2: e.nativeEvent.coordinate.longitude,
                    latitude2: e.nativeEvent.coordinate.latitude,
                  },
                  function () {
                    console.log(this.state.longitude2, this.state.latitude2);
                  },
                );
              }}
            />
          </MapView>
          <View
            style={{
              bottom: 0,
              position: 'absolute',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <Button
              color="white"
              onPress={() => {
                this.savedestination();
              }}
              style={{
                width: '60%',
                backgroundColor: '#0163d2',
              }}>
              Save Destination Point
            </Button>
          </View>
        </Modal>
      </>
    );
  }
}

export default AddLuggage;
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
