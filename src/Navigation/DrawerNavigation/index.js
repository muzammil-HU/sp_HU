import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomBar from '../TopTab/BottomBar';

import Register from '../../Screen/Auth/Register';
import {COLORS} from '../../Constants/COLORS';
import ProfileTopCard from '../../components/header/ProfileTopCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DrawerHeader from '../../components/header/DrawerHeader';
import DrawerData from './DrawerData';
import {Icons} from '../../components/Icons';
import AttendenceInquiry from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/AttendenceInquiry';
import {useDispatch, useSelector} from 'react-redux';
import {LogOutUserApi} from '../../Redux/Actions/AuthFunctions';

const DrawerNav = () => {
  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  const Drawer = createDrawerNavigator();
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });
  const handleLogout = () => {
    setLoad(true);
    let data = {
      token: TokenState,
    };
    LogOutUserApi(data, dispatch, setLoad);
  };

  const Drawerheadings = ['Academics', 'Examination', 'Evaluation'];
  const AcademicsScreens = [
    {
      name: 'Attendance Inquiry',
      component: AttendenceInquiry,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
      options: {iconComp: FontAwesome6, iconName: 'graduation-cap'},
    },
    {
      name: 'Classes Schedule',
      component: AttendenceInquiry,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Register New Course',
      component: Register,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Registered Courses',
      component: Register,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Curriculum',
      component: Register,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Alumni Form',
      component: Register,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
  ];
  const ExaminationScreens = [
    {
      name: 'Examination Schedule',
      component: BottomBar,
      options: {},
    },
    {
      name: 'Marks Sheet',
      component: AttendenceInquiry,
    },
  ];
  const EvaluationScreens = [
    {
      name: 'Course Evaluation',
      component: BottomBar,
      options: {},
    },
    {
      name: 'Teacher Evaluation',
      component: AttendenceInquiry,
    },
  ];
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <DrawerData
          {...props}
          Drawerheadings={Drawerheadings}
          AcademicsScreens={AcademicsScreens}
          ExaminationScreens={ExaminationScreens}
          EvaluationScreens={EvaluationScreens}
        />
      )}
      screenOptions={{
        headerStyle: {overflow: 'hidden'},
        overlayColor: 'transparent',
        headerBackgroundContainerStyle: {overflow: 'hidden'},
        header: props => <DrawerHeader {...props} />,
        drawerType: 'slide',
        drawerActiveTintColor: COLORS.red,
        drawerInactiveTintColor: COLORS.themeColor,
      }}>
      <Drawer.Screen name="Home" component={BottomBar} />
      {AcademicsScreens.map(As => (
        <Drawer.Screen key={As.name} name={As.name} component={As.component} />
      ))}
      {ExaminationScreens.map(Es => (
        <Drawer.Screen key={Es.name} name={Es.name} component={Es.component} />
      ))}
      {EvaluationScreens.map(EvaSrc => (
        <Drawer.Screen
          key={EvaSrc.name}
          name={EvaSrc.name}
          component={EvaSrc.component}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});

// drawerContent={props => {
//   const [expandedItem, setExpandedItem] = useState(null);
//   const handleDrawerItemClick = routeName => {
//     setExpandedItem(prevItem =>
//       prevItem === routeName ? null : routeName,
//     );
//   };
//   return (
//     <DrawerContentScrollView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.themeColor,
//         flexDirection: 'column',
//         width: '100%',
//       }}
//       {...props}>
//       <View
//         style={{
//           flex: 1,
//           // backgroundColor: 'red',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}>
//         {/* <DrawerItemList {...props} /> */}
//         {/* <DrawerItem label="LogOut" onPress={handleLogout} /> */}
//         <Image
//           source={require('../../assets/whitelogo.png')}
//           resizeMode="cover"
//         />
//       </View>
//       <View style={{flex: 1}}>
//         {/* <DrawerItemList {...props} /> */}
//         {props.state.routeNames.map((routeName, index) => {
//           // const label =
//           //   props.descriptors[routeName].options.drawerLabel || routeName;
//           // console.log(routeNames[0]);
//           return (
//             // <TouchableOpacity
//             //   onPress={{}}
//             //   style={{
//             //     flexDirection: 'row',
//             //     justifyContent: 'space-between',
//             //     alignItems: 'center',
//             //   }}>
//             <DrawerItem
//               onPress={() => handleDrawerItemClick(index)}
//               label={() => (
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}>
//                   <Text style={{color: COLORS.white}}>{routeName}</Text>
//                   <FontAwesome6
//                     name="angle-down"
//                     size={20}
//                     color={COLORS.white}
//                   />
//                 </View>
//               )}
//             />

//             // </TouchableOpacity>
//           );
//         })}
//         {/* <DrawerItem label="LogOut" onPress={handleLogout} /> */}
//       </View>
//       <View style={{flex: 1}}>
//         {/* <DrawerItemList {...props} /> */}
//         <DrawerItem
//           labelStyle={{color: COLORS.white}}
//           label="LogOut"
//           onPress={handleLogout}
//         />
//       </View>
//     </DrawerContentScrollView>
//   );
// }}

{
  /* {DrawerScreens.map(D => (
        <Drawer.Screen
          key={D.name}
          name={D.name}
          component={D.component}
          options={{}}
        />
      ))} */
}
//
//
// const DrawerScreens = [
//   {
//     name: 'Home',
//     component: BottomBar,
//     options: {},
//   },
//   {
//     name: 'Academics',
//     component: AttendenceInquiry,
//   },
//   {
//     name: 'Examination',
//     component: Register,
//   },
//   {
//     name: 'Evaluation',
//     component: Register,
//   },
// ];
