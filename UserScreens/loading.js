import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white'
      }}>
      <ActivityIndicator color="#0163d2" size="large" />
    </View>
  );
};
export default Loading;
