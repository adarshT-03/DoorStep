import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../UserScreens/UserHomeSceen';
import UserOrders from '../UserScreens/UserOrders';
import Login from '../LoginRegister/login';
import Register from '../LoginRegister/register';
import TabNavigator from './tabNavigation';

const Stack = createStackNavigator();
const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="UserOrders" component={UserOrders} />
    </Stack.Navigator>
  );
};
export const LoginScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Home" component={FirstScreenNavigator} />
    </Stack.Navigator>
  );
};
export {FirstScreenNavigator};
