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
import {useDispatch, useSelector} from 'react-redux';
import clientapi from '../../../../../../api/clientapi';
import Loader from '../../../../../../components/reuseable/Modals/LoaderModal';
import DropdownComponent from '../../../../../../components/reuseable/Dropdown';
import InputText from '../../../../../../components/reuseable/InputText';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {showMessage} from 'react-native-flash-message';
import {
  LoginUser,
  TokenId,
  UserDetail,
} from '../../../../../../Redux/Reducers/AuthReducer/AuthReducer';
import {registered_courses} from '../../../../../../Redux/Reducers/GlobalStatesReducer/GlobalStatesReducer';

const CourseEva = ({route, navigation}) => {
  const [load, setLoad] = useState();
  const [questions, setQuestions] = useState([]);
  const {item} = route.params;
  const [isFocus, setIsFocus] = useState([]);
  const [previous_answer, setPrevious_answer] = useState(false);
  const dispatch = useDispatch();
  const TokenState = useSelector(state => {
    return state?.AuthReducer.TokenId;
  });
  const studentId = useSelector(state => {
    return state.AuthReducer.UserDetail.student_id;
  });
  const data = [
    {label: 'Select Item', value: '', icon: ''},
    {
      label: 'Strongly Disagree',
      value: '1',
      icon: 'Strongly Disagree',
    },
    {label: 'Disagree', value: '2', icon: 'Disagree'},
    {label: 'Uncertain', value: '3', icon: 'Uncertain'},
    {label: 'Agree', value: '4', icon: 'Agree'},
    {label: 'Strongly Agree', value: '5', icon: 'Strongly Agree'},
  ];

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
        if (
          api?.data?.success === false &&
          api?.data?.output?.response?.messages ===
            'Session expired Please Login Again'
        ) {
          dispatch(LoginUser(false));
          dispatch(TokenId(null));
          dispatch(UserDetail(null));
          dispatch(registered_courses(null));
          showMessage({
            message: 'Session expired Please Login Again',
            type: 'warning',
            position: 'top',
            // backgroundColor: COLORS.themeColor,
            color: COLORS.black,
            style: {justifyContent: 'center', alignItems: 'center'},
            icon: () => (
              <FontAwesome6
                name="circle-exclamation"
                size={windowWidth / 16}
                color={COLORS.black}
                style={{paddingRight: 20}}
              />
            ),
          });
          setLoad(false);
        } else {
          setQuestions(api?.data?.course_eva_data);
          setPrevious_answer(api?.data?.previous_answer);
          setIsFocus(Array(api?.data?.course_eva_data?.length).fill(false));
          setLoad(false);
        }
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
    // console.log(value, 'vall');
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {...updatedQuestions[index], given_answer: value};
    setQuestions(updatedQuestions);
  };
  // console.log(item.course_id, 'ju');
  const handleFocusChange = (isFocused, index) => {
    const updatedFocus = [...isFocus];
    updatedFocus[index] = isFocused;
    setIsFocus(updatedFocus);
  };
  const gy = questions.map(q => q.given_answer);
  // console.log(gy, 'gy');
  const course_evaluation_form_store = async () => {
    setLoad(true);
    try {
      const hasAnswer = questions.some(
        q => q.given_answer || q.given_answer_box,
      );
      const gy = questions.map(q => q.answer || '');
      const params = {
        token: TokenState,
        student_id: studentId,
        course_id: item.course_id,
        offer_id: item.offer_id,
        offer_no: item.offer_no,
        emp_id: item.emp_id,
        questions: questions,
        // parameter_id: questions.map(q => q.parameter_id),
        // parameter: questions.map(q => q.parameter),
        // parameter_sno: questions.map(q => q.parameter_sno),
        // category_sno: questions.map(q => q.category_sno),
        // category: questions.map(q => q.category),
        // type: questions.map(q => q.type),
        // given_answer_box: questions.map(q => q.given_answer_box || ''),
        // answer: questions.map(q => q.answer || ''),
      };

      let api;
      if (previous_answer === true) {
        api = await clientapi.post(
          '/student/course/evaluation/form/store/update',
          params,
        );
      } else {
        api = await clientapi.post(
          '/student/course/evaluation/form/store',
          params,
        );
      }
      if (
        api?.data?.success === false &&
        api?.data?.output?.response?.messages ===
          'Session expired Please Login Again'
      ) {
        dispatch(LoginUser(false));
        dispatch(TokenId(null));
        dispatch(UserDetail(null));
        dispatch(registered_courses(null));
        showMessage({
          message: 'Session expired Please Login Again',
          type: 'warning',
          position: 'top',
          color: COLORS.black,
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <FontAwesome6
              name="circle-exclamation"
              size={windowWidth / 16}
              color={COLORS.black}
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
      } else {
        showMessage({
          message: api?.data?.output?.response?.messages,
          type: 'success',
          duration: 10000,
          position: 'top',
          backgroundColor: COLORS.themeColor,
          color: COLORS.white,
          style: {justifyContent: 'center', alignItems: 'center'},
          icon: () => (
            <FontAwesome6
              name="check-circle"
              size={windowWidth / 16}
              color={COLORS.white}
              style={{paddingRight: 20}}
            />
          ),
        });
        setLoad(false);
        navigation.goBack();
      }
    } catch (error) {
      console.log(error, 'err');
      setLoad(false);
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
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      given_answer_box: text,
    };
    setQuestions(updatedQuestions);
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
                    value={data[e.given_answer]}
                    setValue={value => {
                      handleValueChange(value, index);
                    }}
                    valueIcon={e.given_answer}
                    // setValueIcon={valueIcon =>
                    //   handleValueChange(valueIcon, index)
                    // }
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
                    value={e.given_answer_box}
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
              onPress={course_evaluation_form_store}>
              <Text style={{color: COLORS.white}}>Apply Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      <Loader load={load} setLoad={setLoad} />
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
