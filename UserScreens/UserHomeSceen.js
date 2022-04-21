import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

class UserHomeScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={{color: 'red'}}>UserHomeScreen</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('UserOrders');
          }}>
          HIii
        </Button>
      </View>
    );
  }
}
export default UserHomeScreen;
