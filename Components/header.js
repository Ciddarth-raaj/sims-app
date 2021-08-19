import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Colors from '../constants/colors';

export default class Header extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.imageWrapper}>
            <Image
              source={require('../assets/sims-logo.png')}
              style={styles.image}
              resizeMode={'contain'}
            />
          </View>
          <Text style={styles.companyName}>{'SIMS Hospital'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: '100%',
    padding: 10,
    paddingBottom: 12,
  },
  image: {
    width: 60,
    height: 30,
  },
  imageWrapper: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  companyName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: 'white',
  },
  searchImage: {
    width: 20,
    height: 20,
  },
});
