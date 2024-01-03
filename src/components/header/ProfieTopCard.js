import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {LogOut} from '../../Redux/Reducers/AuthReducer/AuthReducer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {showMessage} from 'react-native-flash-message';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ProfieTopCard = () => {
  const AuthState = useSelector(state => {
    return state.AuthReducer.UserDetail;
  });

  const dispatch = useDispatch();
  return (
    <View
      style={{
        flexDirection: 'row',
        height: '70%',
        width: '90%',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        // borderRadius: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        // padding: 8,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          // borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          height: '100%',
        }}
        onPress={() => {
          dispatch(LogOut([]));
          showMessage({
            message: 'Logged out Sucessfully',
            type: 'success',
            backgroundColor: '#2BA36F',
            color: '#fff',
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="check-circle"
                size={windowwidth / 16}
                color="#fff"
                style={{paddingRight: 20}}
              />
            ),
          });
        }}>
        <SimpleLineIcons
          name="logout"
          size={25}
          iconStyle={{fontWeight: '900', marginRight: 0}}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          width: '60%',
          // backgroundColor: '#abc568',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginHorizontal: '2%',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          height: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'flex-start',
              // alignItems: 'flex-start',
              borderRadius: 150,
              borderWidth: 10,
              // marginHorizontal: 10,
              marginRight: 10,
              marginLeft: 0,
              overflow: 'hidden',
              borderColor: '#2BA36F',
            }}>
            <Image
              source={require('../../assets/test.png')}
              style={{
                width: undefined,
                height: windowwidth / 6.5,
                aspectRatio: 1,
              }}
            />
          </View>
          <View
            style={
              {
                // marginHorizontal: '5%',
              }
            }>
            <Text style={styles.text}>(3080-2022)</Text>
            <Text style={styles.text}>Dummyai Lab</Text>
            <Text style={styles.text}>Confirmed</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'column',
          width: '20%',
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderLeftWidth: 0.5,
          backgroundColor: '#fff',
          height: '100%',
        }}>
        <Image
          source={require('../../assets/settingicon.png')}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfieTopCard;

const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: windowwidth / 32,
  },
});

// <View
//   style={{
//     flexDirection: 'row',
//     height: '45%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//   }}>
//   <View
//     style={{
//       flexDirection: 'column',
//       width: '25%',
//       height: '100%',
//       justifyContent: 'center',
//       alignItems: 'flex-end',
//       //   backgroundColor: 'red',
//     }}>
//     <Image
//       source={require('../../assets/test.png')}
//       resizeMode="stretch"
//       style={{
//         height: '75%',
//         width: '80%',
//         borderRadius: 50,
//         borderWidth: 20,
//       }}
//     />
//     {/* </View> */}
//   </View>
//   <View
//     style={{
//       flexDirection: 'column',
//       //   backgroundColor: 'red',
//       width: '70%',
//       height: '85%',
//       alignItems: 'flex-start',
//       justifyContent: 'center',
//     }}>
//     <ImageBackground
//       source={require('../../assets/Subtract.png')}
//       resizeMode="contain"
//       style={{flex: 1, width: '100%', height: '100%', marginRight: 0}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: '100%',
//           width: '100%',
//           // backgroundColor: 'red',
//           paddingHorizontal: '9%',
//         }}>
//         <View
//           style={{
//             flexDirection: 'column',
//             width: '80%',
//             justifyContent: 'center',
//           }}>
//           <Text style={styles.text}>(3080-2022)</Text>
//           <Text style={[styles.text, {fontSize: windowwidth / 25}]}>
//             Dummyai Lab
//           </Text>
//           <Text style={[styles.text, {fontSize: windowwidth / 35}]}>
//             Admission Status: Confirmed
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: 'column',
//             width: '20%',
//             justifyContent: 'center',
//           }}>
//           <Image
//             source={require('../../assets/settingicon.png')}
//             resizeMode="contain"
//           />
//         </View>
//       </View>
//     </ImageBackground>
//   </View>
// </View>
