import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './LoginRegister/login';
import FirstScreenNavigator, {
  LoginScreenNavigator,
} from './Navigation/stackNavigation';
// import TabNavigator from './Navigation/tabNavigation';
// import UserHomeScreen from './UserScreens/UserHomeSceen';

const App = () => {
  const [isLogged, setIsLogged] = useState('');
  const _retrieveData = async key => {
    try {
      const data = await AsyncStorage.getItem('token');
      const logged = await AsyncStorage.getItem('isLogged');
      console.log(logged, 'token at tabNavigation');
      setIsLogged(logged);
      console.log(isLogged == true, 'aaa');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    _retrieveData();
  }, []);
  return (
    <>
      <StatusBar backgroundColor="#0163d2" barStyle="light-content" />
      <NavigationContainer>
        {/* <LoginScreenNavigator/> */}

        {isLogged == 'true' ? (
          <FirstScreenNavigator />
        ) : (
          <LoginScreenNavigator />
        )}
      </NavigationContainer>
    </>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
