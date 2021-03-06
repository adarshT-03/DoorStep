import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Error from 'react-native-vector-icons/MaterialIcons';
import Add from 'react-native-vector-icons/Ionicons';

import Map from 'react-native-vector-icons/FontAwesome5';
import Loading from '../UserScreens/loading';

class AllOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: '',
      loading: true,
    };
    this.renderItems = this.renderItems.bind(this);
  }

  //   userData = this.props.route.params.userData;
  //   order = this.props.route.params.order;
  componentDidMount() {
    console.log(this.userData, 'od');
    fetch('https://doorstep-server-api.herokuapp.com/get-order-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        status: 'all',
      }),
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data, 'data at UserHomeScreen');
        const array = data.data;
        // const final = array.filter(x => {
        //   // console.log(x.status);
        //   if (this.order == 'pending') {
        //     return x.status == '0';
        //   } else {
        //     return x.status == '1';
        //   }
        // });
        // console.log(final);
        this.setState(
          {
            orderData: array.reverse(),
            loading: false,
          },
          function () {},
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
          margin: 15,

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
                {item.placedBy.name}
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
                <Text style={{color: 'black', fontSize: 12}}>
                  {item.acceptedBy.name}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{width: '62%'}}>
          <View
            style={{
              flexDirection: 'row',

              justifyContent: 'flex-end',
              marginHorizontal: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginHorizontal: 10,
              }}>
              <Text style={{color: '#707070', fontSize: 12}}>Date</Text>
              <Text style={[styles.cardSmallText, {marginLeft: 5}]}>
                {item.date}
              </Text>
            </View>
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
          </View>

          <View style={styles.cardView}>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Distance </Text>
              <Text style={styles.cardSmallText}>{item.distance} Km</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Number of Items</Text>
              <Text style={styles.cardSmallText} numberOfLines={1}>
                {item.noofitems}
              </Text>
            </View>
          </View>
          {/* <View style={styles.cardView}>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Source </Text> */}
          {/* <Text style={styles.cardSmallText} numberOfLines={1}>
                {item.source}
              </Text> */}
          {/* </View>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Destination</Text> */}
          {/* <Text style={styles.cardSmallText}>{item.destination}</Text> */}
          {/* </View>
          </View> */}
          <View style={styles.cardView}>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Weight </Text>
              <Text
                style={styles.cardSmallText}
                numberOfLines={1}>{`${item.weight} Kg`}</Text>
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardBigText}>Price</Text>
              <Text
                style={styles.cardSmallText}
                numberOfLines={1}>{`${item.price} ???`}</Text>
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
    );
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <View
        style={{
          flex: 1,
        }}>
        {this.state.orderData == '' ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: -150,
              backgroundColor: 'white',
            }}>
            <Image
              style={{
                height: 300,
                width: '100%',
                marginTop: 0,
              }}
              source={require('../assets/vocab-empty.jpg')}
            />
            <Text style={{color: 'grey'}}>No Order Found!!!</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.orderData}
            renderItem={this.renderItems}
            contentContainerStyle={{paddingBottom: 50}}
          />
        )}
      </View>
    );
  }
}
export default AllOrders;
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
