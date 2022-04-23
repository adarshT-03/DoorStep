import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/FontAwesome';

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
    };
  }
  userData = this.props.route.params.userData;
  componentDidMount() {
    console.log(this.userData, 'userAddLuggage');
  }
  async submitOrder() {
    if (
      this.state.date == '' ||
      this.state.destination == '' ||
      this.state.nameoforder == '' ||
      this.state.numberofitems == '' ||
      this.state.weight == '' ||
      this.state.price == '' ||
      this.state.source == ''
    ) {
      alert('Please fill all the fields!!');
    } else if (
      this.state.dateText == 'Date of Pickup' ||
      this.state.dateText == ''
    ) {
      alert('Please Select pickup date!!');
    } else {
      await fetch('http://192.168.180.35:4000/add-order', {
        method: 'POST',
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          nameO: this.state.nameoforder,
          source: this.state.source,
          destination: this.state.destination,
          weight: this.state.weight,
          date: this.state.date.toLocaleDateString(),
          noofitems: this.state.numberofitems,
          price: this.state.price,
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
            <TextInput
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
            />
            <TextInput
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
            />
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
                onChange={e =>
                  this.setState({
                    weight: e.nativeEvent.text,
                  })
                }
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
              label="Price in ₹"
              keyboardType="number-pad"
              value={this.state.price}
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
      </>
    );
  }
}
export default AddLuggage;
