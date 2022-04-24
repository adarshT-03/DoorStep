import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import UserHomeScreen from '../UserScreens/UserHomeSceen';
import UserOrders from '../UserScreens/UserOrders';
import Login from '../LoginRegister/login';
import Register from '../LoginRegister/register';
// import TabNavigator from './tabNavigation';
import Logout from '../UserScreens/logout';
import AddLuggage from '../UserScreens/AddLuggage';
import DriverHomeScreen from '../DriverScreens/deriveHomeScreen';
import AcceptedOrders from '../DriverScreens/acceptedOrder';

const Stack = createStackNavigator();
const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0163d2',
          height: 60,
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerTitle: 'Home',

        headerTitleStyle: {
          fontSize: 24,
        },
      }}>
      <Stack.Screen
        options={{
          headerTitle: 'Home',
          headerLeft: null,
        }}
        name="UserHomeScreen"
        component={UserHomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Orders',
        }}
        name="UserOrders"
        component={UserOrders}
      />
      <Stack.Screen
        options={{
          headerTitle: 'All Orders',
        }}
        name="AllOrder"
        component={DriverHomeScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Accepted Orders',
        }}
        name="AcceptedOrders"
        component={AcceptedOrders}
      />
      <Stack.Screen
        options={{
          headerTitle: 'Add Luggage',
        }}
        name="AddLuggage"
        component={AddLuggage}
      />
      <Stack.Screen name="Logout" component={Logout} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginScreenNavigator}
      />
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

export default FirstScreenNavigator;
