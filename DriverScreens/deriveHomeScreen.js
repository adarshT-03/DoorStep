import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Error from 'react-native-vector-icons/MaterialIcons';
import Add from 'react-native-vector-icons/Ionicons';
import Check from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../UserScreens/loading';
import Map from 'react-native-vector-icons/FontAwesome5';

class DriverHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      orderData: '',
      loading: true,
    };
    this.renderItems = this.renderItems.bind(this);
  }
  _retrieveData = async key => {
    try {
      const data = await AsyncStorage.getItem('token');
      console.log(data, 'token at tabNavigation');
      this.getData(data);
    } catch (error) {
      console.log(error);
    }
  };
  getData = token => {
    console.log(token, 'tok');
    fetch('http://192.168.227.35:4000/user-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data at UserHomeScreen');
        this.setState(
          {
            userData: data.data,
          },
          function () {},
        );
      });
  };
  acceptOrder(orderId) {
    fetch('http://192.168.227.35:4000/accept-order', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 1,
        orderId: orderId,
        acceptedBy: {
          driverId: this.state.userData._id,
          name: this.state.userData.name,
        },
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'order Accepted');
        if (data.status == 'ok') {
          this.getOrderDetails();
        }
        // this.setState(
        //   {
        //     orderData: data.data.reverse(),
        //   },
        //   function () {
        //     console.log(this.state.orderData);
        //   },
        // );
      });
  }
  getOrderDetails() {
    fetch('http://192.168.227.35:4000/get-order-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 0,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data at UserHomeScreen');
        this.setState(
          {
            orderData: data.data.reverse(),
            loading: false,
          },
          function () {
            console.log(this.state.orderData);
          },
        );
      });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._retrieveData();
      this.getOrderDetails();
    });

    this._retrieveData();
    this.getOrderDetails();
  }
  renderItems({item}) {
    console.log(item);
    return (
      <View style={{margin: 15}}>
        <View
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,

            height: 170,
            borderRadius: 5,
            marginTop: 40,
            flexDirection: 'row',
          }}>
          <View
            style={{
              top: -40,
              paddingLeft: 10,
              width: '38%',
              // borderColor: '#ccc',
              // borderWidth: 1,
              // flexDirection:'column'
            }}>
            <Image
              style={{
                height: 180,
                width: 130,
                marginTop: 0,
              }}
              source={require('../assets/orders.png')}
            />
            <View style={{marginTop: -10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.cardBigText}>Order By </Text>
                <Text style={{color: 'black', fontSize: 12}}>
                  {item.placedBy == undefined ? '' : item.placedBy.name}
                </Text>
              </View>
              {item.status == '1' ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.cardBigText}>Accepted By </Text>
                  <Text style={{color: 'black', fontSize: 12}}>Adarsh</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={{width: '62%'}}>
            {item.status == '0' ? (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                }}>
                <Error name="error" color="red" size={16} />
                <Text style={{color: 'red', fontSize: 12, marginLeft: 5}}>
                  Pending
                </Text>
              </View>
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  justifyContent: 'flex-end',
                  marginHorizontal: 10,
                }}>
                <Add name="checkmark-circle" color="green" size={16} />
                <Text style={{color: 'green', fontSize: 12, marginLeft: 5}}>
                  Accepted
                </Text>
              </View>
            )}

            <View style={styles.cardView}>
              <View style={styles.cardText}>
                <Text style={styles.cardBigText}>Date </Text>
                <Text style={styles.cardSmallText}>{item.date}</Text>
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardBigText}>Number of Items</Text>
                <Text style={styles.cardSmallText}>{item.noofitems}</Text>
              </View>
            </View>
           
            <View style={styles.cardView}>
              <View style={styles.cardText}>
                <Text style={styles.cardBigText}>Weight </Text>
                <Text style={styles.cardSmallText}>{`${item.weight} Kg`}</Text>
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardBigText}>Price</Text>
                <Text style={styles.cardSmallText}>{`${item.price} ₹`}</Text>
              </View>
            </View>
            <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Map', {
                source: item.source,
                destination: item.destination,
              });
            }}
            style={[
              styles.cardView,
              {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
              },
            ]}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.cardBigText}>Source & Destination </Text>
              <Text style={styles.cardSmallText}>View on Map</Text>
            </View>
            <Map
              name="map-marked-alt"
              size={25}
              color="black"
              style={{marginLeft: 10}}
            />
          </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => this.acceptOrder(item._id)}
          style={{
            // width: Dimensions.get('screen').width * 0.95,
            backgroundColor: 'green',
            height: 50,

            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
          }}>
          <Check name="check" size={16} color="white" />
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: '600',
              marginLeft: 8,
            }}>
            Accept
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <View>
        <FlatList
          data={this.state.orderData}
          renderItem={this.renderItems}
          contentContainerStyle={{paddingBottom: 50}}
        />
      </View>
    );
  }
}
export default DriverHomeScreen;
const styles = StyleSheet.create({
  cardView: {
    flexDirection: 'row',
    width: '100%',
    // borderColor: 'red',
    // borderWidth: 1,
  },
  cardText: {
    width: '50%',
    paddingTop: 10,
    paddingHorizontal: 10,
    // marginHorizontal: 10,
    // marginVertical:3,

    alignItems: 'center',
  },
  cardBigText: {
    color: '#707070',
    fontWeight: '600',
    fontSize: 12,
  },
  cardSmallText: {
    fontSize: 15,
    color: 'black',
    fontWeight: '600',
  },
});
