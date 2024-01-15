import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dashboard from '../../Screen/Portal/Dashboard';
import Register from '../../Screen/Auth/Register';
import CHeader from '../../components/header/CustomHeader';
import CustomTabBar from '../../components/header/CustomTabBar';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../../Screen/StackScreens/Settings';
import BottomBar from './BottomBar';
import {COLORS} from '../../Constants/COLORS';
import Academics from '../../Screen/Portal/DrawerScreens/Academics';
import AcademicsDrawerNav from '../AcademicsDrawerNav';

const TopTab = () => {
  const tabscreens = [
    {
      name: 'Home',
      component: BottomBar,
      options: {
        tabBarLabel: 'Dashboard',
        activeBackgroundColor: COLORS.white,
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Academics',
      component: AcademicsDrawerNav,
      options: {
        tabBarLabel: 'Academics',
        activeBackgroundColor: COLORS.white,
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Examination',
      component: Register,
      options: {
        tabBarLabel: 'Examination',
        activeBackgroundColor: COLORS.white,
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Evaluation',
      component: Register,
      options: {
        tabBarLabel: 'Evaluation',
        activeBackgroundColor: COLORS.white,
        inactiveBackgroundColor: 'transparent',
      },
    },
  ];
  const TTab = createMaterialTopTabNavigator();
  return (
    <TTab.Navigator
      initialRouteName="Home"
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarScrollEnabled: true,
        swipeEnabled: true,
      }}>
      {tabscreens.map(tab => (
        <TTab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.options.tabBarLabel,
            activeBackgroundColor: COLORS.white,
            inactiveBackgroundColor: 'transparent',
          }}
        />
      ))}
    </TTab.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({});

{
  /* <TTab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          activeBackgroundColor: COLORS.white,
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting"
        component={Register}
        options={{
          tabBarLabel: 'Academics',
          activeBackgroundColor: COLORS.white,
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting1"
        component={Register}
        options={{
          tabBarLabel: 'Examinations',
          activeBackgroundColor: COLORS.white,
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting2"
        component={Register}
        options={{
          tabBarLabel: 'SETTINGS',
          activeBackgroundColor: COLORS.white,
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting3"
        component={Register}
        options={{
          tabBarLabel: 'SETTINGS',
          activeBackgroundColor: COLORS.white,
          inactiveBackgroundColor: 'transparent',
        }}
      /> */
}
