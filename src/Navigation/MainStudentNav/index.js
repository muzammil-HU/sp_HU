import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TopTab from '../TopTab';
import Settings from '../../Screen/StackScreens/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../Constants/COLORS';
import DrawerNav from '../DrawerNavigation';
import QrScan from '../../Screen/Portal/BottomTabScreens/QrScan';
import PrivacyPolicy from '../../Screen/StackScreens/PrivacyPolicy';
import {useRoute} from '@react-navigation/native';
import CourseEva from '../../Screen/Portal/DrawerScreens/Evaluation/DrawerScreens/CourseEvaluation/CourseEva';
import TeacherEva from '../../Screen/Portal/DrawerScreens/Evaluation/DrawerScreens/TeacherEvaluation/TeacherEva';

const MainStudentNav = () => {
  const Stack = createNativeStackNavigator();
  // const route = useRoute();

  const CustomHeader = ({navigation, options}) => {
    return (
      <View style={styles.customHeader}>
        <View
          style={{
            flexDirection: 'column',
            width: '24%',
            justifyContent: 'center',
            // backgroundColor: COLORS.red,
            height: '100%',
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: COLORS.red,
              width: '50%',
              height: '50%',
              justifyContent: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '56%',
            // backgroundColor: COLORS.black,
          }}>
          <Text style={styles.headerText}>{options.title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '20%',
          }}>
          <Text style={styles.headerText}></Text>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>{options.title}</Text>
          <Text style={{color: COLORS.themeColor}}></Text>
        </View> */}
      </View>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      // style={{}}
      screenOptions={{
        header: props => {
          return <CustomHeader {...props} />;
        },
      }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: 'Privacy Policy',
        }}
      />
      <Stack.Screen
        name="Course Eva"
        component={CourseEva}
        options={{
          title: 'Course Evaluation',
        }}
      />
      <Stack.Screen
        name="Teacher Eva"
        component={TeacherEva}
        options={{
          title: 'Teacher Evaluation',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStudentNav;
const WindowHeight = Dimensions.get('window').height;
const WindowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  customHeader: {
    height: WindowHeight / 10,
    width: '100%',
    elevation: 25,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: COLORS.themeColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  headerText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 20,
    margin: 16,
  },
});
