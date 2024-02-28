import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, windowHeight, windowWidth} from '../../Constants/COLORS';
import ProfileTopCard from '../../components/header/ProfileTopCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useRoute} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ClassesSchedule from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/ClassesSchedule';
import MakeupClasses from '../ClassesSchedule/MakeUpClasses';
import CourseContent from '../ClassesSchedule/CourseContent';
import {ActivetabChange} from '../../Redux/Actions/GlobalStatesFunctions';
import {useDispatch, useSelector} from 'react-redux';
const DrawerHeader = ({navigation}) => {
  const dispatch = useDispatch();
  // const Tab = createMaterialTopTabNavigator();
  const tabs = [
    {name: 'Current Schedule', comp: 'CurrentScheduleCards'},
    {name: 'Upcoming Makeup Classes', comp: 'MakeupClasses'},
    {name: 'Course Content', comp: 'CourseContent'},
  ];
  const route = useRoute();
  const TabState = useSelector(state => {
    return state.GlobalStatesReducer.ActiveTab;
  });
  return (
    <View
      style={{
        flexDirection: 'column',
        height: windowHeight / 10,
        width: '100%',
        elevation: 25,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        backgroundColor: COLORS.themeColor,
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'column',
            height: '95%',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '20%',
          }}>
          <TouchableOpacity
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <FontAwesome6
              name="bars-staggered"
              size={windowWidth / 12}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            // backgroundColor: 'blue',
            width: '80%',
          }}>
          <ProfileTopCard />
        </View>
      </View>

      {/* <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: '40%',
          justifyContent: 'space-between',
          paddingHorizontal: '5%',
          alignItems: 'center',
        }}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              let data = tab.comp;
              ActivetabChange(dispatch, data);
            }}
            style={{
              backgroundColor:
                tab.comp === TabState ? COLORS.TextthemeColor : COLORS.white,
              width: '30%',
              height: '80%',
              borderRadius: 10,
              elevation: tab.comp === TabState ? 24 : 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[
                styles.tabsbtn,
                {
                  color:
                    tab.comp === TabState
                      ? COLORS.white
                      : COLORS.TextthemeColor,
                },
              ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
       
      </View> */}

      {/* <Tab.Navigator>
        <Tab.Screen name="Current Schedule" component={ClassesSchedule} />
        <Tab.Screen name="Tab2" component={MakeupClasses} />
        <Tab.Screen name="Tab3" component={CourseContent} />
      </Tab.Navigator> */}
    </View>
  );
};

export default DrawerHeader;

const styles = StyleSheet.create({
  tabsbtn: {
    // color: COLORS.black,
    textAlign: 'center',
  },
});
