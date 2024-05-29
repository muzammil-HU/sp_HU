import {
  Image,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {LogOutUserApi} from '../../Redux/Actions/AuthFunctions';
import {COLORS, windowHeight} from '../../Constants/COLORS';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const DrawerData = props => {
  const navigation = props.navigation;
  const dispatch = useDispatch();
  const Drawerheadings = props.Drawerheadings;
  const [load, setLoad] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  const route = useRoute();

  const currentScreen = getFocusedRouteNameFromRoute(route);
  const isHome = currentScreen === 'Home';
  const IsActiveHomeStyle = {
    backgroundColor: isHome ? COLORS.white : COLORS.themeColor,
    color: isHome ? COLORS.themeColor : COLORS.white,
  };
  const isActiveProfile = currentScreen === 'ProfileScreen';
  const isActiveSettings = currentScreen === 'Settings';
  const isActivePrivacyPolicy = currentScreen === 'PrivacyPolicy';
  const IsActiveProfileStyle = {
    backgroundColor: isActiveProfile ? COLORS.white : COLORS.themeColor,
    color: isActiveProfile ? COLORS.themeColor : COLORS.white,
  };
  const TokenState = useSelector(state => {
    return state.AuthReducer.TokenId;
  });
  const handleMenuItemClick = item => {
    if (item.screens) {
      setExpandedItem(expandedItem === item.name ? null : item.name);
    } else {
      // console.log(item, 'ittte,');
      navigation.navigate(item.name);
    }
  };
  const handleSubMenuClick = route => {
    setOpenDropdown(null);
    navigation.navigate(route);
  };
  const handleLogout = () => {
    setLoad(true);
    let data = {
      token: TokenState,
    };
    LogOutUserApi(data, dispatch, setLoad);
  };
  const renderDrawerSection = (Section, index) => {
    // console.log(Section, 'sec');
    const isExpanded = expandedItem === Section.name;
    return (
      <View key={index}>
        {/* Heading */}
        <DrawerItem
          onPress={() => handleMenuItemClick(Section)}
          style={{
            backgroundColor: isExpanded
              ? COLORS.DrawerDDActive
              : COLORS.themeColor,
            borderRadius: 5,
          }}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                // backgroundColor: 'black',
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  width: '90%',
                  height: '100%',
                  // backgroundColor: 'red',
                }}>
                <View style={{flexDirection: 'row', columnGap: 20}}>
                  <Section.iconComp
                    name={Section.iconName}
                    size={windowHeight / 50}
                    color={COLORS.white}
                  />
                  <Text
                    style={[
                      styles.font,
                      {color: COLORS.white, marginRight: 5},
                    ]}>
                    {Section.name}
                  </Text>
                </View>
              </View>
              <FontAwesome6
                name={isExpanded ? 'angle-up' : 'angle-down'}
                size={windowHeight / 55}
                color={COLORS.white}
              />
            </View>
          )}
        />
        {isExpanded &&
          Section.screens.map((screen, screenIndex) => {
            const isActive = currentScreen === screen.name;
            const IsActiveSubMenuStyles = {
              backgroundColor: isActive ? COLORS.white : COLORS.themeColor,
              color: isActive ? COLORS.themeColor : COLORS.white,
            };
            return (
              <DrawerItem
                key={screenIndex}
                style={{
                  backgroundColor: IsActiveSubMenuStyles.backgroundColor,
                }}
                onPress={() => handleMenuItemClick(screen)}
                label={() => (
                  <View style={{marginLeft: 20}}>
                    <Text
                      style={[
                        // styles.font,
                        {
                          color: IsActiveSubMenuStyles.color,
                          fontSize: windowHeight / 65,
                        },
                      ]}>
                      {screen.name}
                    </Text>
                  </View>
                )}
              />
            );
          })}
      </View>
    );
  };
  return (
    <DrawerContentScrollView style={styles.container} {...props}>
      {/* Top Header */}
      <View style={styles.headerView}>
        <Image
          source={require('../../assets/whitelogo.png')}
          resizeMode="cover"
        />
      </View>
      {/*  */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 2,
          opacity: 0.5,
          borderRadius: 20,
          backgroundColor: 'white',
        }}
      />
      {/* Home Screen */}
      <View style={{flex: 1}}>
        <DrawerItem
          onPress={() => {
            setExpandedItem(null);
            navigation.navigate('Home');
          }}
          style={{
            backgroundColor: IsActiveHomeStyle.backgroundColor,
          }}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 20,
              }}>
              <FontAwesome5
                name="home"
                size={20}
                color={IsActiveHomeStyle.color}
              />
              <Text style={[styles.font, {color: IsActiveHomeStyle.color}]}>
                Dashboard
              </Text>
            </View>
          )}
        />
      </View>
      {/* sections here */}
      <View style={{flex: 1}}>
        {[
          {
            name: 'Academics',
            iconComp: FontAwesome6,
            iconName: 'graduation-cap',
            screens: props.AcademicsScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
        {[
          {
            name: 'Examination',
            iconComp: Ionicons,
            iconName: 'book-outline',
            screens: props.ExaminationScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
        {[
          {
            name: 'Evaluation',
            iconComp: MaterialCommunityIcons,
            iconName: 'google-analytics',
            screens: props.EvaluationScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
        {[
          {
            name: 'Accounts',
            iconComp: MaterialCommunityIcons,
            iconName: 'google-analytics',
            screens: props.AccountScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
        {[
          {
            name: 'General',
            iconComp: MaterialCommunityIcons,
            iconName: 'google-analytics',
            screens: props.GeneralScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
        {[
          {
            name: 'Transport',
            iconComp: MaterialCommunityIcons,
            iconName: 'google-analytics',
            screens: props.TransportScreens,
          },
        ].map((Section, index) => renderDrawerSection(Section, index))}
      </View>
      {/* Profile */}
      <View style={{flex: 1}}>
        <DrawerItem
          onPress={() => {
            setExpandedItem(null);
            navigation.navigate('ProfileScreen');
          }}
          style={{
            backgroundColor: IsActiveProfileStyle.backgroundColor,
          }}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 22,
              }}>
              <FontAwesome5
                name="user-circle"
                size={windowHeight / 50}
                color={IsActiveProfileStyle.color}
              />
              <Text style={[styles.font, {color: IsActiveProfileStyle.color}]}>
                Profile
              </Text>
            </View>
          )}
        />
      </View>
      {/* Settings */}
      <View style={{flex: 1}}>
        <DrawerItem
          onPress={() => {
            setExpandedItem(null);
            navigation.navigate('Settings');
          }}
          style={{
            backgroundColor: isActiveSettings
              ? COLORS.white
              : COLORS.themeColor,
          }}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 22,
              }}>
              <AntDesign
                name="setting"
                size={windowHeight / 50}
                color={isActiveSettings ? COLORS.themeColor : COLORS.white}
              />
              <Text
                style={[
                  styles.font,
                  {
                    color: isActiveSettings ? COLORS.themeColor : COLORS.white,
                  },
                ]}>
                Settings
              </Text>
            </View>
          )}
        />
      </View>
      {/* LogOut Btn */}
      <View style={{flex: 1}}>
        <DrawerItem
          labelStyle={styles.textsty}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 20,
              }}>
              <SimpleLineIcons
                name="logout"
                size={windowHeight / 55}
                color={COLORS.white}
              />
              <Text style={[styles.textsty, styles.font]}>LogOut</Text>
            </View>
          )}
          onPress={handleLogout}
        />
      </View>
      {/* Privacy Policy */}
      {/* <View style={{flex: 1}}>
        <DrawerItem
          onPress={() => {
            setExpandedItem(null);
            navigation.navigate('PrivacyPolicy');
          }}
          style={{
            backgroundColor: isActivePrivacyPolicy
              ? COLORS.white
              : COLORS.themeColor,
          }}
          label={() => (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                columnGap: 22,
              }}>
              <FontAwesome5
                name="user-circle"
                size={windowHeight / 55}
                color={isActivePrivacyPolicy ? COLORS.themeColor : COLORS.white}
              />
              <Text
                style={[
                  styles.font,
                  {
                    color: isActivePrivacyPolicy
                      ? COLORS.themeColor
                      : COLORS.white,
                  },
                ]}>
                Privacy Policy
              </Text>
            </View>
          )}
        />
      </View> */}
    </DrawerContentScrollView>
  );
};

export default DrawerData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.themeColor,
    flexDirection: 'column',
    width: '100%',
  },
  headerView: {
    flex: 1,
    backgroundColor: COLORS.themeColor,
    alignItems: 'center',
    width: '100%',
  },
  textsty: {
    color: COLORS.white,
  },
  font: {
    fontSize: windowHeight / 55,
  },
});
