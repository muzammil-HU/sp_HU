import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React from 'react';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import TopCard from '../../components/reuseable/Cards/TopCards';
// import ProfileCard from '../../components/reuseable/Cards/ProfileCard';
// import Cards from "../../Components/reusable/Cards";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../BottomTabScreens/Profile';
import Attendence from '../BottomTabScreens/Attendence';
import QrScan from '../BottomTabScreens/QrScan';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import BottomBar from '../../../Navigation/TopTab/BottomBar';

// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const {width} = Dimensions.get('window');
// import {SelectWheel} from '.';
// const TabBar = ({state, descriptors, navigation}) => {
//   return (
//     <View style={styles.mainContainer}>
//       {state.routes.map((route, index, icons) => {
//         if (route.name == 'PlaceholderScreen') {
//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => navigation.navigate('QR Scanner')}
//               style={[
//                 styles.mainItemContainer,
//                 {backgroundColor: COLORS.white, height: '100%', elevation: 10},
//               ]}>
//               <Image
//                 source={require('../../assets/qrIcon.png')}
//                 resizeMode="contain"
//                 style={{}}
//               />
//             </TouchableOpacity>
//           );
//         }
//         const {options} = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <View
//             key={index}
//             style={[
//               styles.mainItemContainer,
//               {borderRightWidth: label == 'notes' ? 3 : 0},
//             ]}>
//             <Pressable
//               onPress={onPress}
//               style={{
//                 backgroundColor: isFocused ? COLORS.white : '#2BA344',
//                 borderRadius: 10,
//               }}>
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flex: 1,
//                   padding: 15,
//                 }}>
//                 {/* <AntDesign name="pluscircle" size={50} color="black" /> */}
//               </View>
//             </Pressable>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const Dashboard = () => {
//   const theme = useColorScheme() === 'dark';
//   const isDarkTheme = theme === 'dark';
//   const Tab = createBottomTabNavigator();
//   const screenOptions = {
//     tabBarShowLabel: false,
//     headerShown: false,
//     tabBarStyle: {
//       position: 'absolute',
//       bottom: 0,
//       right: 0,
//       left: 0,
//       elevation: 0,
//       height: 60,
//       backgroundColor: COLORS.themeColor,
//       borderTopLeftRadius: 10,
//       borderTopRightRadius: 10,
//     },
//   };

//   return (
//     <View
//       style={[
//         {
//           flex: 1,
//           // backgroundColor: 'red',
//           // paddingHorizontal: '5%',
//         },
//       ]}>
//       {/* <TopCard />
//       <ProfileCard /> */}
//       <BottomBar />
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   mainContainer: {
//     flexDirection: 'row',
//     // bottom: 0,
//     height: '10%',
//     backgroundColor: COLORS.themeColor,
//     // borderRadius: 25,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     // marginHorizontal: width * 0.1,
//   },
//   mainItemContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderRadius: 1,
//     borderColor: '#333B42',
//   },
// });
