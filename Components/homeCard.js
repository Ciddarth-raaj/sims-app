import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/colors';

import {useState} from 'react';

export default function HomeCard(props) {
  const {title, image, pressAction} = props;

  return (
    <TouchableOpacity style={styles.container} onPress={pressAction}>
      <View style={styles.imageWrapper}>
        <Image
          source={image}
          style={{
            width: '70%',
            height: '70%',
            alignSelf: 'center',
          }}
        />
      </View>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1f0ff',
    borderRadius: 20,
    width: (Dimensions.get('window').width - 50) / 2,
    height: (Dimensions.get('window').width - 50) / 2,
    margin: 10,
    justifyContent: 'center',
    padding: 20,
  },
  titleText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  imageWrapper: {
    width: 90,
    height: 90,
    padding: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
