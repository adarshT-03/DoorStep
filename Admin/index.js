import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Add from 'react-native-vector-icons/FontAwesome';
import Box from 'react-native-vector-icons/Feather';
import Driver from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

class AdminHome extends React.Component {
  render() {
    return (
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AllOrders');
            }}
            style={[styles.card, {backgroundColor: '#27AE61'}]}>
            <Text style={styles.textCard}>All Orders</Text>
            <View style={{marginLeft: 20}}>
              <Box name="box" size={40} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('AllUser');
            }}
            style={[styles.card, {backgroundColor: '#5956D6'}]}>
            <Text style={styles.textCard}>Users</Text>
            <View style={{marginLeft: 20}}>
              <Add name="user" size={40} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Driver');
            }}
            style={[styles.card, {backgroundColor: '#FF3A31'}]}>
            <Text style={styles.textCard}>Drivers</Text>
            <View style={{marginLeft: 20}}>
              <Driver name="taxi" size={40} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
export default AdminHome;
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
