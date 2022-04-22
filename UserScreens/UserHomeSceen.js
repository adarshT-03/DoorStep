import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import Add from 'react-native-vector-icons/Ionicons';
import Error from 'react-native-vector-icons/MaterialIcons';
import Check from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserHomeScreen extends React.Component {
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
        // this.setState(
        //   {
        //     userData: data.data,
        //   },
        //   function () {
        //     console.log(token);
        //     console.log(this.state.userData, 'user');
        //   },
        // );
      });
  };
  componentDidMount() {
    this._retrieveData();
  }
  render() {
    return (
      <View
        style={{
          // alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.card}
          onPress={() => {
            this.props.navigation.navigate('AddLuggage');
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

        <View style={[styles.card, {backgroundColor: '#FF3A31'}]}>
          <Text style={styles.textCard}>Orders Pending</Text>
          <View style={{marginLeft: 20}}>
            <Error name="error" size={40} color="white" />
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
        {/* <View
          style={{
            elevation: 6,
            height: 100,
            margin: 20,
            borderRadius: 30,
            backgroundColor: '#27AE61',
          }}>
          <Add name="add-circle-sharp" size={20} color="black" />
        </View>
        <View
          style={{
            elevation: 6,
            height: 100,
            margin: 20,
            borderRadius: 30,
            backgroundColor: '#FF3A31',
          }}>
          <Add name="add-circle-sharp" size={20} color="black" />
        </View> */}
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
});
