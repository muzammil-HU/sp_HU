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
import {COLORS, windowHeight, windowWidth} from '../../Constants/COLORS';
import ProfileTopCard from '../../components/header/ProfileTopCard';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DrawerHeader from '../../components/header/DrawerHeader';
import DrawerData from './DrawerData';
import {Icons} from '../../components/Icons';
import AttendenceInquiry from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/AttendenceInquiry';
import {useDispatch, useSelector} from 'react-redux';
import {LogOutUserApi} from '../../Redux/Actions/AuthFunctions';
import ClassesSchedule from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/ClassesSchedule';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MakeupClasses from '../../components/ClassesSchedule/MakeUpClasses';
import CourseContent from '../../components/ClassesSchedule/CourseContent';
import RegisteredCourses from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/RegisteredCourses';
import UnderConstruction from '../../components/reuseable/ScreenUnderConstruction';
import FeeLedger from '../../Screen/Portal/DrawerScreens/Accounts/DrawerScreens/FeeLedger';
import HostelLedger from '../../Screen/Portal/DrawerScreens/Accounts/DrawerScreens/HostelLedger';
import TransportLedger from '../../Screen/Portal/DrawerScreens/Accounts/DrawerScreens/TransportLedger';
import GenerateVoucher from '../../Screen/Portal/DrawerScreens/Accounts/DrawerScreens/GenerateVoucher';
import WifiRegistration from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/WifiRegistration';
import FeedbackForm from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/FeedbackForm';
import EnrollmentForm from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/EnrollmentForm';
import MyComplaintDashboard from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/MyComplaintDashboard';
import ResetPassword from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/ResetPassword';
import EmergencyTransportRequest from '../../Screen/Portal/DrawerScreens/Transport/DrawerScreens/EmergencyTransportRequest';
import CampusesContacts from '../../Screen/Portal/DrawerScreens/General/DrawerScreens/CampusesContacts';
import CourseEvaluation from '../../Screen/Portal/DrawerScreens/Evaluation/DrawerScreens/CourseEvaluation';
import TeacherEvaluation from '../../Screen/Portal/DrawerScreens/Evaluation/DrawerScreens/TeacherEvaluation';
import ExaminationSchedule from '../../Screen/Portal/DrawerScreens/Examination/DrawerScreens/ExaminationSchedule';
import MarksSheet from '../../Screen/Portal/DrawerScreens/Examination/DrawerScreens/MarksSheet';
import Curriculum from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/Curriculum';
import RegisterNewCourses from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/RegisterNewCourses';
import AlumniForm from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/AlumniForm';
import GraduatingSurvey from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/GraduatingSurvey';
import SearchingLibraryBooks from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/SearchingLibraryBooks';
import Profile from '../../Screen/Portal/DrawerScreens/Profile';
import ProfileScreen from '../../Screen/Portal/DrawerScreens/Profile';
import GradingCriteria from '../../Screen/Portal/DrawerScreens/Academics/DrawersScreens/GradingCriteria';

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  const [load, setLoad] = useState(false);
  const dispatch = useDispatch();
  const Tab = createMaterialTopTabNavigator();

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

  // const Drawerheadings = ['Academics', 'Examination', 'Evaluation'];
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
      component: ClassesSchedule,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Register New Course',
      component: UnderConstruction,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Registered Courses',
      component: RegisteredCourses,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Curriculum',
      component: Curriculum,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    {
      name: 'Grading Criteria',
      component: GradingCriteria,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
    // {
    //   name: 'Alumni Form',
    //   component: AlumniForm,
    //   iconComp: FontAwesome6,
    //   iconName: 'graduation-cap',
    // },
    // {
    //   name: 'Graduating Survey',
    //   component: GraduatingSurvey,
    //   iconComp: FontAwesome6,
    //   iconName: 'graduation-cap',
    // },
    {
      name: 'Searching Library Books',
      component: UnderConstruction,
      iconComp: FontAwesome6,
      iconName: 'graduation-cap',
    },
  ];
  const ExaminationScreens = [
    {
      name: 'Examination-Schedule',
      component: ExaminationSchedule,
      options: {},
    },
    {
      name: 'Marks Sheet',
      component: MarksSheet,
    },
  ];
  const EvaluationScreens = [
    {
      name: 'Course Evaluation',
      component: CourseEvaluation,
      options: {},
    },
    {
      name: 'Teacher Evaluation',
      component: UnderConstruction,
    },
  ];
  const AccountScreens = [
    {
      name: 'Fee Ledger',
      component: FeeLedger,
      options: {},
    },
    {
      name: 'Hostel Ledger',
      component: HostelLedger,
    },
    {
      name: 'Transport Ledger',
      component: TransportLedger,
    },
    {
      name: 'Generate Account Voucher',
      component: GenerateVoucher,
    },
  ];
  const GeneralScreens = [
    {
      name: 'Wifi Registration',
      component: UnderConstruction,
      options: {},
    },
    {
      name: 'Campuses Contacts',
      component: CampusesContacts,
      options: {},
    },
    {
      name: 'Feedback Form',
      component: UnderConstruction,
    },
    {
      name: 'Enrollment Form',
      component: UnderConstruction,
    },
    {
      name: 'My Complaint Dashboard',
      component: UnderConstruction,
    },
    {
      name: 'Change / Reset Password',
      component: UnderConstruction,
    },
  ];
  const TransportScreens = [
    {
      name: 'Emergency Transport Request',
      component: UnderConstruction,
      options: {},
    },
  ];
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => (
        <DrawerData
          {...props}
          AcademicsScreens={AcademicsScreens}
          ExaminationScreens={ExaminationScreens}
          EvaluationScreens={EvaluationScreens}
          AccountScreens={AccountScreens}
          GeneralScreens={GeneralScreens}
          TransportScreens={TransportScreens}
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
        unmountOnBlur: true,
        swipeEdgeWidth: 50,
        drawerStyle: {width: windowHeight / 3, elevation: 24},
      }}>
      <Drawer.Screen name="Home" component={BottomBar} />
      <Drawer.Screen name="ProfileScreen" component={UnderConstruction} />
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
      {AccountScreens.map(As => (
        <Drawer.Screen key={As.name} name={As.name} component={As.component} />
      ))}
      {GeneralScreens.map(Gs => (
        <Drawer.Screen key={Gs.name} name={Gs.name} component={Gs.component} />
      ))}
      {TransportScreens.map(Ts => (
        <Drawer.Screen key={Ts.name} name={Ts.name} component={Ts.component} />
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
