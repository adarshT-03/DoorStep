import React from 'react';
import {View, Text, Image} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Loading from '../UserScreens/loading';

class Driver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      loading: true,
    };
    this.renderItems = this.renderItems.bind(this);
  }
  getData() {
    fetch('https://doorstep-server-api.herokuapp.com/get-user-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        userType: 'driver',
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          userData: data.data,
          loading: false,
        });
      });
  }
  componentDidMount() {
    this.getData();
  }
  setStatus(item) {
    fetch('https://doorstep-server-api.herokuapp.com/update-user-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        id: item._id,
        status: item.status == 0 ? 1 : 0,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data, 'ddddd');
        this.getData();
        // this.setState({
        //   userData: data.data,
        //   loading: false,
        // });
      });
  }
  renderItems({item}) {
    // console.log(e, 'e');
    return (
      <View
        style={{
          borderColor: '#ccc',
          borderWidth: 1,
          marginHorizontal: 15,
          paddingHorizontal: 8,
          paddingVertical: 8,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 15,
          marginVertical: 15,
        }}>
        <View style={{width: '18%'}}>
          <Image
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKG1jFoWTApe-hE6ZBYu2lkiS8q8fAkBULrw&usqp=CAU',
            }}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 10,
            width: '82%',
            justifyContent: 'space-between',
            paddingRight: 20,
          }}>
          <View>
            <View style={{flexDirection: 'row', width: '100%'}}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  Name
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  Taxi Number
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.taxiNumber}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  Email
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.email}
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  Aadhar Number
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.aadhar}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  Account Number
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.accountNumber}
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  IFSC
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.ifsc}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  License Id
                </Text>
                <Text
                  style={{color: 'black', fontSize: 16, fontWeight: '600'}}
                  numberOfLines={1}>
                  {item.licenseId}
                </Text>
              </View>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#707070',
                  }}>
                  User Status
                </Text>
                {item.status == 0 ? (
                  <Text
                    style={{color: 'red', fontSize: 16, fontWeight: '600'}}
                    numberOfLines={1}>
                    Unverified
                  </Text>
                ) : (
                  <Text
                    style={{color: 'green', fontSize: 16, fontWeight: '600'}}
                    numberOfLines={1}>
                    Verified
                  </Text>
                )}
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TouchableOpacity
                onPress={() => {
                  this.setStatus(item);
                }}
                style={{
                  borderColor: '#0163d2',
                  borderWidth: 1,
                  paddingVertical: 6,
                  backgroundColor: '#0163d2',
                  alignItems: 'center',
                  borderRadius: 10,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    color: 'white',

                    fontSize: 16,
                  }}>
                  {item.status == 0 ? 'Verify' : 'Unverify'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <View>
        <FlatList data={this.state.userData} renderItem={this.renderItems} />
      </View>
    );
  }
}
export default Driver;
