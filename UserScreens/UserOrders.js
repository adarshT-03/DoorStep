import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Error from 'react-native-vector-icons/MaterialIcons';
import Add from 'react-native-vector-icons/Ionicons';

class UserOrders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderData: '',
    };
    this.renderItems = this.renderItems.bind(this);
  }
  userData = this.props.route.params.userData;
  componentDidMount() {
    console.log(this.userData, 'od');
    fetch('http://192.168.180.35:4000/get-user-orders', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        orderId: this.userData.orderPlaced,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'data at UserHomeScreen');
        this.setState(
          {
            orderData: data.data.reverse(),
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
export default UserOrders;
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
