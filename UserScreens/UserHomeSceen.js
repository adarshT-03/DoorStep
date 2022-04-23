import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-paper';
import Add from 'react-native-vector-icons/Ionicons';
import Error from 'react-native-vector-icons/MaterialIcons';
import Check from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DriverHomeScreen from '../DriverScreens/deriveHomeScreen';
import {FlatList} from 'react-native-gesture-handler';

class UserHomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      orderData: '',
    };
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
    fetch('http://192.168.180.35:4000/user-details', {
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
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this._retrieveData();
      fetch('http://192.168.180.35:4000/get-order-details', {
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
          // console.log(data, 'data at UserHomeScreen');
          this.setState(
            {
              orderData: data.data.reverse(),
            },
            function () {
              console.log(this.state.orderData);
            },
          );
        });
    });
    this._retrieveData();
    fetch('http://192.168.180.35:4000/get-order-details', {
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
        // console.log(data, 'data at UserHomeScreen');
        this.setState(
          {
            orderData: data.data.reverse().slice(0, 3),
          },
          function () {
            console.log(this.state.orderData);
          },
        );
      });
  }
  renderItems({item}) {
    console.log(item);
    return (
      <View
        style={{
          borderColor: '#ccc',
          borderWidth: 1,

          width: Dimensions.get('screen').width * 0.95,
          height: 170,
          borderRadius: 5,
          marginTop: 40,
          flexDirection: 'row',
          marginHorizontal: 10,
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
              <Text style={styles.cardBigText}>Source </Text>
              <Text style={styles.cardSmallText} numberOfLines={1}>
                {item.source}
              </Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Destination</Text>
              <Text style={styles.cardSmallText}>{item.destination}</Text>
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
        </View>
      </View>
    );
  }
  render() {
    return (
      <View
        style={{
          // alignItems: 'center',
          // justifyContent: 'center',
          flex: 1,
        }}>
        {this.state.userData.userType == 'user' ? (
          <>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.card}
              onPress={() => {
                this.props.navigation.navigate('AddLuggage', {
                  userData: this.state.userData,
                });
              }}>
              <Text style={styles.textCard}>Add Luggage</Text>
              <View style={{marginLeft: 20}}>
                <Add name="add-circle-sharp" size={40} color="white" />
              </View>
            </TouchableOpacity>
            <View style={[styles.card, {backgroundColor: '#27AE61'}]}>
              <Text style={styles.textCard}>Orders Approved</Text>
              <View style={{marginLeft: 20}}>
                <Add name="checkmark-circle" size={40} color="white" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('UserOrders', {
                  userData: this.state.userData,
                });
              }}
              style={[styles.card, {backgroundColor: '#FF3A31'}]}>
              <Text style={styles.textCard}>Orders Pending</Text>
              <View style={{marginLeft: 20}}>
                <Error name="error" size={40} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('token', '');
                AsyncStorage.setItem('isLogged', 'false');
                this.props.navigation.navigate('Login');
              }}
              style={[styles.card, {backgroundColor: '#5956D6'}]}>
              <Text style={styles.textCard}>Log Out</Text>
              <View style={{marginLeft: 20}}>
                <Add name="log-out" size={40} color="white" />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <View style={{marginTop: 40}}>
            <View style={{marginBottom: 60}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                }}>
                <Text style={{color: 'black', fontSize: 22, fontWeight: '700'}}>
                  New Orders
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('AllOrder', {
                      orderData: this.state.orderData,
                    });
                  }}>
                  <Text
                    style={{
                      color: '#707070',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    See All
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 30}}>
                <FlatList
                  horizontal
                  data={this.state.orderData.slice(0, 3)}
                  renderItem={this.renderItems}
                  numColumns={1}
                  showsHorizontalScrollIndicator={true}
                />
              </View>
            </View>
            <View style={[styles.card, {backgroundColor: '#27AE61'}]}>
              <Text style={styles.textCard}>Accepted Orders</Text>
              <View style={{marginLeft: 20}}>
                <Add name="checkmark-circle" size={40} color="white" />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                AsyncStorage.setItem('token', '');
                AsyncStorage.setItem('isLogged', 'false');
                this.props.navigation.navigate('Login');
              }}
              style={[styles.card, {backgroundColor: '#5956D6'}]}>
              <Text style={styles.textCard}>Log Out</Text>
              <View style={{marginLeft: 20}}>
                <Add name="log-out" size={40} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default UserHomeScreen;
const styles = StyleSheet.create({
  card: {
    elevation: 6,
    height: 130,
    margin: 20,
    borderRadius: 30,
    backgroundColor: '#FF9601',
    justifyContent: 'center',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textCard: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
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
