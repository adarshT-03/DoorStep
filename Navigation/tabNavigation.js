import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserHomeScreen from '../UserScreens/UserHomeSceen';
import UserOrders from '../UserScreens/UserOrders';
import FirstScreenNavigator from './stackNavigation';
import Entypo from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#0163d2',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarItemStyle: {
          padding: 8,
        },
      }}
      tabBarOptions={{
        labelStyle: {fontSize: 18},
        activeTintColor: 'yellow',
        inactiveTintColor: 'white',
      }}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: tabinfo => {
            return (
              <Entypo
                name="home"
                size={18}
                color={tabinfo.focused ? 'yellow' : 'white'}
              />
            );
          },
        }}
        component={UserHomeScreen} // Replaced Screen 1
      />
      <Tab.Screen
        name="Orders"
        component={UserOrders}
        options={{
          tabBarIcon: tabinfo => {
            return (
              <Entypo
                name="shopping-cart"
                size={20}
                color={tabinfo.focused ? 'yellow' : 'white'}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Log Out"
        component={UserOrders}
        options={{
          tabBarIcon: tabinfo => {
            return (
              <Entypo
                name="shopping-cart"
                size={20}
                color={tabinfo.focused ? 'yellow' : 'white'}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
