import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, windowWidth} from '../../../../Constants/COLORS';
import {DataTable} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';

const AttendenceModal = ({
  visible,
  setVisible,
  selectedCourseName,
  setSelectedCourseName,
}) => {
  const [page, setPage] = useState(0);
  const numberOfItemsPerPageList = [4];
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const Attendence = selectedCourseName?.attendance;
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, Attendence?.length);
  const numberOfPages = Math.ceil(Attendence?.length / itemsPerPage);
  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(!visible);
        }}
        onTouchEnd={() => {
          setVisible(false);
          setSelectedCourseName(null);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={styles.modalheading}>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 18,
                  fontWeight: 500,
                  color: COLORS.white,
                }}>
                {selectedCourseName?.course_title}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setVisible(!visible)}>
                <AntDesign name="close" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </View>
            <DataTable>
              <DataTable.Header
                style={{
                  flexDirection: 'row',
                  color: COLORS.red,
                  width: '100%',
                }}>
                <DataTable.Title textStyle={{color: COLORS.TextthemeColor}}>
                  Status
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  textStyle={{color: COLORS.TextthemeColor}}>
                  Present Hrs
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  textStyle={{color: COLORS.TextthemeColor}}>
                  Absent Hrs
                </DataTable.Title>
                <DataTable.Title
                  numeric
                  textStyle={{color: COLORS.TextthemeColor}}>
                  Total Hrs
                </DataTable.Title>
              </DataTable.Header>

              {Attendence?.slice(from, to).map((item, index) => {
                const originalDate = new Date(item.attendance_date);
                const formattedDate = `${originalDate.getDate()}-${getMonthAbbreviation(
                  originalDate.getMonth(),
                )}-${originalDate.getFullYear()}`;

                function getMonthAbbreviation(monthIndex) {
                  const months = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ];
                  return months[monthIndex];
                }

                return (
                  <DataTable.Row key={`${item.attendance_date}-${index}`}>
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        // borderColor: item.the_color,
                        // borderWidth: 1,
                        // backgroundColor: 'red',
                      }}>
                      <Text
                        style={{
                          fontSize: windowWidth / 25,
                          color: item.the_color,
                          fontWeight: '800',
                        }}>
                        {item?.attendance_date
                          ? `${formattedDate}, ${item.day}`
                          : 'N/A'}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          // backgroundColor: 'blue',
                          justifyContent: 'center',
                          width: '100%',
                        }}>
                        <DataTable.Cell
                          style={{
                            borderWidth: 1,
                            justifyContent: 'center',
                          }}
                          borderless={false}
                          // numeric
                          textStyle={{color: item.the_color}}>
                          {item?.attendance_status
                            ? item?.attendance_status
                            : '-'}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          style={{borderWidth: 1, justifyContent: 'center'}}
                          textStyle={{color: item.the_color}}>
                          {item?.present_hrs ? item?.present_hrs : '-'}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          style={{borderWidth: 1, justifyContent: 'center'}}
                          textStyle={{color: item.the_color}}>
                          {item?.absent_hrs ? item?.absent_hrs : '-'}
                        </DataTable.Cell>
                        <DataTable.Cell
                          numeric
                          style={{borderWidth: 1, justifyContent: 'center'}}
                          textStyle={{color: item.the_color}}>
                          {item?.total_hrs ? item?.total_hrs : '-'}
                        </DataTable.Cell>
                      </View>
                    </View>
                  </DataTable.Row>
                );
              })}
              <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={page => setPage(page)}
                label={`${from + 1}-${to} of ${Attendence?.length}`}
                numberOfItemsPerPageList={numberOfItemsPerPageList}
                onItemsPerPageChange={onItemsPerPageChange}
                showFastPaginationControls={true}
              />
            </DataTable>
          </View>
        </View>
      </Modal>
    </View>
  );
};
{
  /* <DataTable.Cell textStyle={{color: item.the_color}}>
                    {item?.day ? item?.day : '-'}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={{color: item.the_color}}>
                    {item?.attendance_status ? item?.attendance_status : '-'}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={{color: item.the_color}}>
                    {item?.present_hrs ? item?.present_hrs : '-'}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={{color: item.the_color}}>
                    {item?.absent_hrs ? item?.absent_hrs : '-'}
                  </DataTable.Cell>
                  <DataTable.Cell numeric textStyle={{color: item.the_color}}>
                    {item?.total_hrs ? item?.total_hrs : '-'}
                  </DataTable.Cell> */
}
export default AttendenceModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // height: '100%',
    backgroundColor: 'white',
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
  modalheading: {
    flexDirection: 'row',
    // position: 'absolute',
    borderTopRightRadius: 10,
    padding: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLORS.themeColor,
    width: '100%',
    justifyContent: 'center',
    // right: 52
  },
  closeButton: {
    // alignItems: 'flex-end',
    position: 'absolute',
    top: 10,
    right: 10,
    // backgroundColor: 'red',
  },
});
