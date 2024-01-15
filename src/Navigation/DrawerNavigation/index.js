import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import BottomBar from '../TopTab/BottomBar';
import AcademicsDrawerNav from '../AcademicsDrawerNav';
import Register from '../../Screen/Auth/Register';
import {COLORS} from '../../Constants/COLORS';
import ProfileTopCard from '../../components/header/ProfileTopCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import DrawerHeader from '../../components/header/DrawerHeader';
import DrawerData from './DrawerData';
import {Icons} from '../../components/Icons';

const DrawerNav = () => {
  const WindowHeight = Dimensions.get('window').height;
  const WindowWidth = Dimensions.get('window').width;
  const DrawerScreens = [
    {
      name: 'Home',
      component: BottomBar,
      options: {},
    },
    {
      name: 'Academics',
      component: AcademicsDrawerNav,
      // options: {
      //   tabBarLabel: 'Academics',
      //   activeBackgroundColor: COLORS.white,
      //   inactiveBackgroundColor: 'transparent',
      // },
    },
    {
      name: 'Examination',
      component: Register,
      // options: {
      //   tabBarLabel: 'Examination',
      //   activeBackgroundColor: COLORS.white,
      //   inactiveBackgroundColor: 'transparent',
      // },
    },
    {
      name: 'Evaluation',
      component: Register,
      // options: {
      //   tabBarLabel: 'Evaluation',
      //   activeBackgroundColor: COLORS.white,
      //   inactiveBackgroundColor: 'transparent',
      // },
    },
  ];

  const drawerMenu = [
    {
      title: 'Setting',
      bg: COLORS.menu1,
      type: Icons.Feather,
      icon: 'settings',
      route: 'Setting',
      subMenu: [
        {title: 'Change Theme', route: 'Submenu1'},
        {title: 'Notify Me', route: 'Submenu2'},
      ],
    },
    {
      title: 'More Options',
      bg: COLORS.menu4,
      type: Icons.Entypo,
      icon: 'dots-three-vertical',
      subMenu: [
        {title: 'Submenu 1', route: 'Submenu1'},
        {title: 'Submenu 2', route: 'Submenu2'},
      ],
    },
    {
      title: "Todo's",
      bg: COLORS.menu2,
      type: Icons.Feather,
      icon: 'check-square',
      route: 'Todo',
      subMenu: [{title: 'Eat'}, {title: 'Code'}, {title: 'Sleep'}],
    },
    {
      title: 'Projects',
      bg: COLORS.menu3,
      type: Icons.Octicons,
      icon: 'project',
      route: 'Project',
      subMenu: [{title: 'Portfolio'}, {title: 'Note-APP'}, {title: 'RN-Ui'}],
    },
  ];
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerData {...props} drawerMenu={drawerMenu} />}
      screenOptions={{
        headerStyle: {overflow: 'hidden'},
        overlayColor: 'transparent',
        headerBackgroundContainerStyle: {overflow: 'hidden'},
        header: props => <DrawerHeader {...props} />,
        drawerType: 'slide',
        drawerStatusBarAnimation: 'slide',
        drawerActiveBackgroundColor: 'red',
        drawerActiveTintColor: 'red',
        drawerInactiveBackgroundColor: 'red',
      }}>
      {DrawerScreens.map(tab => (
        <Drawer.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            drawerActiveBackgroundColor: 'red',
            drawerActiveTintColor: 'red',
            drawerInactiveBackgroundColor: 'red',
            drawerStatusBarAnimation: 'slide',
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({});
