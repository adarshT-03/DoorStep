// import React, {useEffect} from 'react';

// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import UserHomeScreen from '../UserScreens/UserHomeSceen';
// import UserOrders from '../UserScreens/UserOrders';
// import {
//   FirstScreenNavigator,
//   LoginScreenNavigator,
//   LogoutSCreenNavigator,
//   OrdersScreenNavigator,
// } from './stackNavigation';
// import Entypo from 'react-native-vector-icons/Entypo';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import Logout from '../UserScreens/logout';
// import {useNavigation} from '@react-navigation/native';

// const Tab = createBottomTabNavigator();
// const TabNavigator = () => {
//   const navigation = useNavigation();
//   const _retrieveData = async key => {
//     try {
//       const data = await AsyncStorage.getItem('token');
//       console.log(data, 'token at tabNavigation');
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     _retrieveData();
//   }, []);
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#0163d2',
//         },
//         headerTitleAlign: 'center',
//         headerTintColor: '#fff',
//         tabBarStyle: {
//           backgroundColor: '#0163d2',
//           height: 60,
//           justifyContent: 'center',
//           alignItems: 'center',
//         },
//         tabBarLabelStyle: {
//           fontSize: 14,
//         },
//         tabBarItemStyle: {
//           padding: 8,
//         },
//       }}
//       tabBarOptions={{
//         labelStyle: {fontSize: 18},
//         activeTintColor: 'yellow',
//         inactiveTintColor: 'white',
//       }}>
//       <Tab.Screen
//         name="Home"
//         options={{
//           tabBarIcon: tabinfo => {
//             return (
//               <Entypo
//                 name="home"
//                 size={18}
//                 color={tabinfo.focused ? 'yellow' : 'white'}
//               />
//             );
//           },
//         }}
//         component={FirstScreenNavigator} // Replaced Screen 1
//       />
//       <Tab.Screen
//         name="Orders"
//         component={OrdersScreenNavigator}
//         options={{
//           tabBarIcon: tabinfo => {
//             return (
//               <Entypo
//                 name="shopping-cart"
//                 size={20}
//                 color={tabinfo.focused ? 'yellow' : 'white'}
//               />
//             );
//           },
//         }}
//       />
//       <Tab.Screen
//         name="Log Out"
//         component={LogoutSCreenNavigator}
//         options={{
//           tabBarIcon: tabinfo => {
//             return (
//               <TouchableOpacity
//                 hitSlop={{top: 20, bottom: 80, left: 50, right: 50}}>
//                 <Entypo
//                   name="shopping-cart"
//                   size={20}
//                   color={tabinfo.focused ? 'yellow' : 'white'}
//                   onPress={() => {
//                     AsyncStorage.setItem('token', '');
//                     AsyncStorage.setItem('isLogged', 'false');
//                     navigation.navigate('Login');
//                   }}
//                 />
//               </TouchableOpacity>
//             );
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;
