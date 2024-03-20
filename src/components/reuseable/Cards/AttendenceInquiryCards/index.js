import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import AttendenceModal from '../../Modals/Attendence';
import {useSelector} from 'react-redux';

const AttendenceInquiryCards = ({AttendenceState}) => {
  const [visible, setVisible] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState();
  // const AttendenceState = useSelector(state => {
  //   return state.GlobalStatesReducer.dayAttendence;
  // });
  const renderAttendanceCard = ({item, index}) => (
    <TouchableOpacity
      key={item.course_id}
      onPress={() => {
        setSelectedCourseName(item);
        setVisible(true);
      }}
      style={[
        styles.card,
        {
          backgroundColor: index % 2 === 0 ? COLORS.themeColor : COLORS.white,
        },
      ]}>
      <View style={styles.cardcol1}>
        <View
          style={[
            styles.ids,
            {
              borderRadius: 5,
              backgroundColor:
                index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
            },
          ]}>
          <Text
            style={[
              styles.textsty,
              {
                fontSize: windowWidth / 26,
                textAlign: 'center',
                color: index % 2 === 0 ? COLORS.TextthemeColor : COLORS.white,
              },
            ]}>
            Offer No: {}
          </Text>
          <Text
            style={[
              styles.textsty,
              {
                fontSize: windowWidth / 26,
                textAlign: 'center',
                color: index % 2 === 0 ? COLORS.TextthemeColor : COLORS.white,
              },
            ]}>
            {item.offer_no}
          </Text>
        </View>
        <View
          style={[
            styles.ids,
            {
              borderRadius: 5,
            },
          ]}>
          <Text
            style={[
              styles.textsty,
              {
                fontSize: windowWidth / 26,
                textAlign: 'center',
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            Course ID: {}
          </Text>
          <Text
            style={[
              styles.textsty,
              {
                fontSize: windowWidth / 26,
                textAlign: 'center',
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            {item.course_id}
          </Text>
        </View>

        <Text
          style={[
            styles.textsty,
            {
              //   textAlign: 'center',
              color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
            },
          ]}>
          {item.course_title}
        </Text>
        <Text
          style={[
            styles.textsty,
            {
              fontWeight: 400,
              fontSize: windowWidth / 28,
              color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
            },
          ]}>
          {item.lecturer}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '53%',
          height: '100%',
          justifyContent: 'space-between',
        }}>
        <View style={[styles.cardcol2, {alignItems: 'center'}]}>
          <Text
            style={[
              styles.textsty,
              {
                fontWeight: '400',
                fontSize: windowWidth / 28,
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            Credit Hours
          </Text>
          <Text
            style={[
              styles.textsty,
              {
                paddingTop: windowWidth / 23,
                fontSize: windowWidth / 13,
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            {item.credit_hrs}
          </Text>
          <Text></Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            width: '2%',
            height: '90%',
            borderColor: 'white',
            backgroundColor:
              index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
          }}
        />
        <View style={[styles.cardcol2, {}]}>
          <Text
            style={[
              styles.textsty,
              {
                fontWeight: '400',
                fontSize: windowWidth / 28,
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            Percentage
          </Text>
          <Text
            style={[
              styles.textsty,
              {
                paddingTop: windowWidth / 20,
                fontSize: windowWidth / 13,
                color: index % 2 === 0 ? COLORS.white : COLORS.TextthemeColor,
              },
            ]}>
            {item.attend_percentage}%
          </Text>
          <Text></Text>
        </View>
      </View>
      <AttendenceModal
        visible={visible}
        setVisible={setVisible}
        selectedCourseName={selectedCourseName}
        setSelectedCourseName={setSelectedCourseName}
      />
      {/* <View onTouchEnd={() => setVisible(false)}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(!visible);
          }}
          onTouchEnd={() => setVisible(false)}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView]}>    
              <Text style={{color: COLORS.themeColor}}>Loading...</Text>
            </View>
          </View>
        </Modal>
      </View> */}
    </TouchableOpacity>
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        bounces={true}
        alwaysBounceVertical={true}
        data={AttendenceState}
        keyExtractor={(item, index) => index}
        renderItem={renderAttendanceCard}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={
          <View
            style={{
              height: '100%',
              width: '100%',
              // justifyContent: 'center',
              paddingTop: '10%',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}>
            <Text
              style={{color: COLORS.themeColor, fontSize: windowWidth / 22}}>
              No Data Found
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default AttendenceInquiryCards;

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 24,
    width: '95%',
    // height: '30%',
    overflow: 'hidden',
    paddingVertical: windowWidth / 25,
    marginVertical: windowWidth / 60,
    // marginBottom: '1%',
    // paddingHorizontal: 25,
  },
  cardcol1: {
    flexDirection: 'column',
    width: '45%',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    // paddingLeft: '8%',
  },
  cardcol2: {
    flexDirection: 'column',
    width: '45%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // backgroundColor: 'red',
  },
  textsty: {
    fontSize: windowWidth / 20,
    fontWeight: '700',
    flexWrap: 'wrap',
    // textAlignVertical: 'center',
    // textAlign: 'center',
  },
  ids: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    height: '12%',
    backgroundColor: 'white',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    columnGap: 20,
  },
});
