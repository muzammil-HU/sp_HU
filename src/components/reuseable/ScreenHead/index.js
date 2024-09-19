import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../Constants/COLORS';
import Loader from '../Modals/LoaderModal';

const ScreenHead = ({
  heading,
  NoteVisibility,
  Note,
  Note2,
  data,
  load,
  setLoad,
  ledger,
  notetextcolor = COLORS.themeColor,
  listHeader = true,
}) => {
  return (
    <>
      {load ? (
        <Loader load={load} setLoad={setLoad} />
      ) : (
        <>
          {heading && (
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                height: '10%',
                backgroundColor: COLORS.white,
              }}>
              <Text style={styles.headingtext}>{heading}</Text>
            </View>
          )}
          {NoteVisibility === true && (
            <View style={{paddingHorizontal: '3%', paddingBottom: '2%'}}>
              {Note && (
                <Text style={[styles.Notetext, {color: notetextcolor}]}>
                  {Note}
                </Text>
              )}
              {data ? (
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.Notetext}>Your Current Dues are </Text>
                  <Text
                    style={[
                      styles.Notetext,
                      {
                        backgroundColor: '#FB9678',
                        paddingHorizontal: '4%',
                        color: COLORS.black,
                        fontWeight: 'bold',
                      },
                    ]}>
                    Rs. {data}/=
                  </Text>
                </View>
              ) : null}

              {Note2 && (
                <Text
                  style={[
                    styles.Notetext,
                    {
                      // backgroundColor: '#FB9678',
                      fontWeight: 'bold',
                      color: COLORS.black,
                    },
                  ]}>
                  {Note2}
                </Text>
              )}
              {listHeader ? (
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
                      width: '30%',
                    }}>
                    <Text
                      style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                      Transaction Date
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      // justifyContent: 'center',
                      width: '30%',
                    }}>
                    <Text
                      style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                      Semester
                    </Text>
                  </View>
                  {!ledger && (
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '30%',
                      }}>
                      <Text
                        style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                        Offer Type
                      </Text>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '10%',
                    }}>
                    {/* <Text style={{color: COLORS.themeColor, fontWeight: 'bold'}}>
                    Offer Type
                  </Text> */}
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default ScreenHead;

const styles = StyleSheet.create({
  mainheading: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  Notetext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 28,
    // fontWeight: 'bold',
  },
  headingtext: {
    color: COLORS.themeColor,
    fontSize: windowWidth / 16,
    fontWeight: 'bold',
    textDecorationColor: COLORS.themeColor,
    textAlign: 'center',
  },
});
