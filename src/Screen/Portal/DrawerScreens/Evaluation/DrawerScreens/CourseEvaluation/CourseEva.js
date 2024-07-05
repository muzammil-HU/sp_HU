import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  COLORS,
  windowHeight,
  windowWidth,
} from '../../../../../../Constants/COLORS';
import {useSelector} from 'react-redux';
import clientapi from '../../../../../../api/clientapi';
import Loader from '../../../../../../components/reuseable/Modals/LoaderModal';
import DropdownComponent from '../../../../../../components/reuseable/Dropdown';
import InputText from '../../../../../../components/reuseable/InputText';
import Entypo from 'react-native-vector-icons/Entypo';

const CourseEva = ({route, navigation}) => {
  const [load, setLoad] = useState();
  const [questions, setQuestions] = useState([]);
  const {item} = route.params;
  const [dropdownValues, setDropdownValues] = useState([]);
  const [isFocus, setIsFocus] = useState([]);
  const [textInputValues, setTextInputValues] = useState([]);
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const data = [
    {label: 'Select Item', value: '', icon: ''},
    {label: 'Strongly Agree', value: 'Strongly Agree', icon: 'Strongly Agree'},
    {label: 'Agree', value: 'Agree', icon: 'Agree'},
    {label: 'Uncertain', value: 'Uncertain', icon: 'Uncertain'},
    {label: 'Disagree', value: 'Disagree', icon: 'Disagree'},
    {
      label: 'Strongly Disagree',
      value: 'Strongly Disagree',
      icon: 'Strongly Disagree',
    },
  ];
  // console.log(item, 'item');
  useEffect(() => {
    const course_evaluation_form = async () => {
      setLoad(true);
      try {
        const params = {
          token: TokenState,
          student_id: studentId,
          offer_no: item?.offer_no,
        };
        const api = await clientapi.get('/student/course/evaluation/form', {
          params,
        });
        setQuestions(api?.data?.course_eva_data);
        setDropdownValues(Array(api?.data?.course_eva_data?.length).fill(null));
        setIsFocus(Array(api?.data?.course_eva_data?.length).fill(false));
        setTextInputValues(Array(api?.data?.course_eva_data?.length).fill(''));
        setLoad(false);
      } catch (error) {
        showMessage({
          message: `500 Server Error`,
          type: 'danger',
          position: 'top',
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <Entypo
              name="circle-with-cross"
              size={windowWidth / 16}
              color={COLORS.white}
              style={{paddingRight: 20}}
            />
          ),
        });
      }
    };
    course_evaluation_form();
  }, []);
  const handleValueChange = (value, index) => {
    const updatedValues = [...dropdownValues];
    updatedValues[index] = value;
    setDropdownValues(updatedValues);
  };

  const handleFocusChange = (isFocused, index) => {
    const updatedFocus = [...isFocus];
    updatedFocus[index] = isFocused;
    setIsFocus(updatedFocus);
  };

  const course_evaluation_form_store = async () => {
    setLoad(true);
    try {
      const params = {
        token: TokenState,
        student_id: studentId,
        course_id: item.course_id,
        offer_id: item.offer_id,
        offer_no: item.offer_no,
        emp_id: item.emp_id,
        // parameter:,
      };
      const api = await clientapi.get('/student/course/evaluation/form/store', {
        params,
      });

      // console.log(api?.data, 'api?.data');

      setLoad(false);
    } catch (error) {
      showMessage({
        message: `500 Server Error`,
        type: 'danger',
        position: 'top',
        style: {justifyContent: 'center', alignItems: 'center'},
        icon: () => (
          <Entypo
            name="circle-with-cross"
            size={windowWidth / 16}
            color={COLORS.white}
            style={{paddingRight: 20}}
          />
        ),
      });
    }
  };
  const handleTextInputChange = (text, index) => {
    const updatedTextInputValues = [...textInputValues];
    updatedTextInputValues[index] = text;
    setTextInputValues(updatedTextInputValues);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headcontainer}>
        <View style={styles.headrowcontainer}>
          <Text style={styles.headtxtsty}>Course Title: </Text>
          <Text style={styles.txtsty}>{item.course_title}</Text>
        </View>
        <View style={styles.headrowcontainer}>
          <Text style={styles.headtxtsty}>Teacher Name: </Text>
          <Text style={styles.txtsty}>{item.lecturer}</Text>
        </View>
        <Text style={styles.headtxtsty}>Note!</Text>
        <Text style={[styles.headtxtsty, {fontSize: windowHeight / 60}]}>
          During Evaluation your Name, ID or Email address etc. will not be
          published to anyone including teachers and other staff members. High
          authorities only view the remarks without any identity to improve the
          areas you highlighted. Your fare evaluation will improve the
          institution performance.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: '2%',
          backgroundColor: COLORS.white,
          justifyContent: 'space-between',
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
          paddingVertical: '2%',
          paddingHorizontal: '1%',
          borderWidth: 1,
          borderBlockColor: COLORS.themeColor,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '15%',
          }}>
          <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
            S.No
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            // justifyContent: 'center',
            width: '50%',
          }}>
          <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
            Evaluation Parameter
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
          }}>
          <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
            Your Answer
          </Text>
        </View>
      </View>
      {questions.length < 1 ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {questions.map((e, index) => (
            <View key={index} style={[styles.row, {width: '100%'}]}>
              <View
                style={[
                  styles.column,
                  {
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <Text style={[styles.text]}>{e.parameter_sno}</Text>
              </View>
              <View
                style={[
                  styles.column,
                  {width: '50%', justifyContent: 'flex-start'},
                ]}>
                <Text style={[styles.textBold]}>{e.category}</Text>
                <Text style={styles.text}>{e.parameter}</Text>
              </View>
              <View
                style={[
                  styles.column,
                  {
                    width: '33%',
                    // height: '10%',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  },
                ]}>
                {e?.type === 'Radio Button' ? (
                  <DropdownComponent
                    value={dropdownValues[index]}
                    setValue={value => handleValueChange(value, index)}
                    valueIcon={dropdownValues[index]}
                    setValueIcon={valueIcon =>
                      handleValueChange(valueIcon, index)
                    }
                    isFocus={isFocus[index]}
                    setIsFocus={isFocused =>
                      handleFocusChange(isFocused, index)
                    }
                    data={data}
                    height=""
                  />
                ) : (
                  <InputText
                    placeholder="Write Your Comments"
                    placeholderTextColor={COLORS.themeColor}
                    value={textInputValues[index]}
                    onChangeText={text => handleTextInputChange(text, index)}
                    TextStyle={[
                      styles.inputText,
                      {
                        width: '100%',
                        fontSize: windowWidth / 35,
                        paddingLeft: 10,
                        color: 'black',
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: COLORS.themeColor,
                        textAlign: 'center',
                      },
                    ]}
                  />
                )}
              </View>
            </View>
          ))}
          <View
            style={{flex: 1, alignItems: 'center', height: windowHeight / 14}}>
            <TouchableOpacity
              style={{
                flexDirection: 'column',
                backgroundColor: COLORS.themeColor,
                width: '30%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
              }}
              onPress={() => {}}>
              <Text style={{color: COLORS.white}}>Apply Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CourseEva;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: '2%',
  },
  headcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: '5%',
    // flexWrap: 'wrap',
  },
  headrowcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headtxtsty: {
    color: COLORS.black,
    fontSize: windowHeight / 40,
  },
  txtsty: {
    fontWeight: 'bold',
    color: COLORS.themeColor,
    fontSize: windowHeight / 40,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
  },
  column: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: COLORS.black,
  },
  textBold: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
