import React, {useEffect} from 'react';
import Entypo from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Platform,
  View,
  Text,
  ToastAndroid,
  Alert,
  StyleSheet,
  Switch,
  Image,
  Dimensions,
} from 'react-native';
import Dashboard from '../Screen/Portal/Dashboard';
import Register from '../Screen/Auth/Register';
import {useNavigation} from '@react-navigation/native';
import Customheader from '../components/header';
import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CHeader from '../components/header/CustomHeader';
// import {Image} from 'react-native-reanimated/lib/typescript/Animated';

const Drawer = createDrawerNavigator();

const StudentNav = () => {
  const navigation = useNavigation();
  const windowwidth = Dimensions.get('window').width;
  var localStorage;

  const drawerscreens = [
    {
      id: 0,
      name: 'Dashboard',
      component: Dashboard,
      IconComponent: Entypo,
      iconlabel: 'home',
      iconColor: 'black',
    },
    {
      id: 1,
      name: 'Register',
      component: Register,
      IconComponent: SimpleLineIcons,
      iconlabel: 'login',
      iconColor: 'black',
    },
  ];
  const drawerIcon = ({focused, size}, name) => {
    return (
      <Icon
        name={name}
        size={size}
        color={focused ? Colors.active : Colors.inactive}
      />
    );
  };
  useEffect(() => {}, [localStorage]);
  const handleLogout = async () => {
    try {
      // await AsyncStorage.removeItem('auth');
      // setAuth({
      //   ...auth,
      //   user: null,
      //   userId: '',
      //   token: '',
      // });
      localStorage = await AsyncStorage.removeItem('auth');
      navigation.navigate('Login');
      showMessage({
        message: 'Logged out Sucessfully',
        type: 'success',
        backgroundColor: '#2BA36F',
        color: '#fff',
        icon: () => (
          <FontAwesome6
            name="check-circle"
            size={windowwidth / 16}
            color="#fff"
            style={{paddingRight: 20}}
          />
        ),
      });
      // if (Platform.OS === 'android') {

      // } else {
      //   navigation.navigate('Login');
      //   Alert.alert('Logout successfully');
      // }
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#2BA36F',
          overflow: 'hidden',
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
        },
        header: () => <CHeader />,
        drawerStyle: {
          backgroundColor: '#2BA36F',
          width: 240,
          overflow: 'hidden',
          borderBottomStartRadius: 10,
          borderBottomEndRadius: 10,
        },
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <View style={styles.userContainer}>
              <Image
                source={require('../assets/whitelogo.png')}
                resizeMode="contain"
              />
              {/* <Text style={[styles.userName, {color: '#fff'}]}>
                Student Portal
              </Text> */}
              {/* <Text style={styles.userEmail}>Email</Text> */}
            </View>
            {drawerscreens.map(screen => (
              <DrawerItem
                key={screen.id}
                label={screen.name}
                onPress={() => navigation.navigate(screen.name)}
                icon={({size, color}) => (
                  <screen.IconComponent
                    name={screen.iconlabel}
                    size={24}
                    color={screen.iconColor}
                  />
                )}
              />
            ))}
            <DrawerItem
              label="Logout"
              onPress={handleLogout}
              icon={({color, size}) => (
                <SimpleLineIcons name="logout" size={24} color="black" />
              )}
            />
            <View style={styles.switchContainer}>
              {/* <Text>{theme ? 'Dark Mode' : 'Light Mode'}</Text> */}
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                // thumbColor={theme ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                // value={theme}
              />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      {drawerscreens.map(Screen => (
        <Drawer.Screen
          key={Screen.id}
          name={Screen.name}
          component={Screen.component}
          options={
            {
              // headerShown: true,
              // header: {<Customheader/>},
            }
          }
          // options={{
          //   drawerIcon: options => drawerIcon(options, 'home-outline'),
          // }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default StudentNav;

const Colors = {
  bg: '#0C8C45',
  barbg: '#26ed80',
  active: '#fff',
  inactive: '#eee',
  transparent: 'transparent',
};
const styles = StyleSheet.create({
  userContainer: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#ffffff80',
    color: '#ccc',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});

//  <DrawerItem
//               label="Register"
//               onPress={() => navigation.navigate('Register')}

//               // icon={({color, size}) => (
//               //   <Entypo name="calendar" size={24} color="black" />
//               // )}
//             />
//             <DrawerItem
//               label="General"
//               onPress={() => navigation.navigate('General')}
//               // icon={({color, size}) => (
//               //   <Feather name="settings" size={24} color="black" />
//               // )}
//             />
//             {/* <DrawerItem
//                                         label="Agenda"
//                                         onPress={() => navigation.navigate('Agenda')}
//                                         icon={({ color, size }) => <MaterialCommunityIcons name="professional-hexagon" size={24} color="black" />}
//                                     /> */}
//             <DrawerItem
//               label="Reminder"
//               onPress={() => navigation.navigate('Reminder')}
//               // icon={({color, size}) => (
//               //   <MaterialCommunityIcons
//               //     name="reminder"
//               //     size={24}
//               //     color="black"
//               //   />
//               // )}
//             />
//             <DrawerItem
//               label="Categories"
//               onPress={() => navigation.navigate('Categories')}
//               // icon={({color, size}) => (
//               //   <AntDesign name="folder1" size={24} color="black" />
//               // )}
//             />
//             <DrawerItem
//               label="Weather"
//               onPress={() => navigation.navigate('Weather')}
//               // icon={({color, size}) => (
//               //   <MaterialCommunityIcons
//               //     name="weather-cloudy-clock"
//               //     size={24}
//               //     color="black"
//               //   />
//               // )}
//             />
//             {/* <DrawerItem
//                                         label="Maps"
//                                         onPress={() => navigation.navigate('Maps')}
//                                         icon={({ color, size }) => <MaterialCommunityIcons name="weather-cloudy-clock" size={24} color="black" />}
//                                     /> */}
//             <DrawerItem
//               label="Logout"
//               onPress={handleLogout}
//               // icon={({color, size}) => (
//               //   <SimpleLineIcons name="logout" size={24} color="black" />
//               // )}
//             />
