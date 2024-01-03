import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Dashboard from '../../Screen/Portal/Dashboard';
import Register from '../../Screen/Auth/Register';
import CHeader from '../../components/header/CustomHeader';
import CustomTabBar from '../../components/header/CustomTabBar';

const TopTab = () => {
  const tabscreens = [
    {
      name: 'Home',
      component: Dashboard,
      options: {
        tabBarLabel: 'Dashboard',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Academics',
      component: Register,
      options: {
        tabBarLabel: 'Academics',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Examination',
      component: Register,
      options: {
        tabBarLabel: 'Examination',
        activeBackgroundColor: '#fff',
        inactiveBackgroundColor: 'transparent',
      },
    },
    {
      name: 'Evaluation',
      component: Register,
      options: {
        tabBarLabel: 'Evaluation',
        activeBackgroundColor: '#fff',
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
      }}
      // style={{ paddingHorizontal: 0 }}
    >
      {tabscreens.map(tab => (
        <TTab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarLabel: tab.options.tabBarLabel,
            activeBackgroundColor: '#fff',
            inactiveBackgroundColor: 'transparent',
          }}
        />
      ))}

      {/* <TTab.Screen
        name="Home"
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting"
        component={Register}
        options={{
          tabBarLabel: 'Academics',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting1"
        component={Register}
        options={{
          tabBarLabel: 'Examinations',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting2"
        component={Register}
        options={{
          tabBarLabel: 'SETTINGS',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: 'transparent',
        }}
      />
      <TTab.Screen
        name="Setting3"
        component={Register}
        options={{
          tabBarLabel: 'SETTINGS',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: 'transparent',
        }}
      /> */}
    </TTab.Navigator>
  );
};

export default TopTab;

const styles = StyleSheet.create({});
