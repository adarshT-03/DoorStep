import React from 'react';
import {View, Text, Image} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Loading from '../UserScreens/loading';

class AllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      loading: true,
    };
  }
  componentDidMount() {
    fetch('https://doorstep-server-api.herokuapp.com/get-user-details', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        userType: 'user',
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
            justifyContent: 'space-between',
            width: '82%',
            paddingRight: 20,
          }}>
          <View>
            <View>
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
            <View>
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
          </View>
          <View style={{alignItems: 'center', right: 0}}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '600',
                color: '#707070',
              }}>
              User Type
            </Text>
            <Text style={{color: 'black', fontSize: 16, fontWeight: '600'}}>
              {item.userType}
            </Text>
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
export default AllUser;
