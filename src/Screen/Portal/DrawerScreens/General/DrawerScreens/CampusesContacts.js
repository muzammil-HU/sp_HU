import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, windowWidth} from '../../../../../Constants/COLORS';
import ContactUsCards from '../../../../../components/reuseable/Cards/ContactUsCards';

const CampusesContacts = () => {
  const cards = [
    {
      head: 'Campus',
      campus_name: 'Main Campus',
      Address:
        'Hamdard University, Madinat al-Hikmah, Muhammad Bin Qasim Avenue, Karachi.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34928756',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'University Hospital (Taj Medical Complex)',
      Address:
        'Taj Medical Complex, MA Jinnah Rd, Saddar Town, Karachi, Sindh.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34928778',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'North Nazimabad Campus',
      Address: 'ST-II, Block-L, North Nazimabad, Karachi.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34298756',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'Faisalabad Campus',
      Address: 'Faisalabad',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34211756',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'Islamabad Campus',
      Address:
        'Hamdard University, Islamabad Campus, 04 Park Link Road, Chak Shahzad Islamabad',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34991756',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'Dental Hospital',
      Address: 'ST-II, Block-L, North Nazimabad, Karachi.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34211753',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'North Nazimabad KDA Campus',
      Address: 'North Nazimabad KDA.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34211755',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'City Campus',
      Address:
        'Plot # 4-A, Block 6, PECHS, near Nursery Flyover, Shahrah-e- Faisal, Karachi.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34211755',
      Fax: '-',
    },
    {
      head: 'Campus',
      campus_name: 'Bahadurabad City Campus',
      Address: ' BAHADURABAD.',
      Web: 'www.hamdard.edu.pk',
      Email: '-',
      Phone: '021-34211755',
      Fax: '-',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
      }}>
      <Text style={styles.ScreenHead}>Contact Us</Text>
      <ContactUsCards cards={cards} />
    </View>
  );
};

export default CampusesContacts;

const styles = StyleSheet.create({
  ScreenHead: {
    fontSize: windowWidth / 20,
    color: COLORS.themeColor,
  },
});
