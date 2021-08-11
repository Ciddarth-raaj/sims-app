import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors';

import {useState} from 'react';

export default function DiseaseCard(props) {
  const {id, name, subtitle, image, navigation} = props;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DoctorList', {id: id})}>
      <View style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image source={image} style={{width: 30, height: 30}} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.containerText}>{name}</Text>
          <Text style={[styles.containerText, {color: '#676767'}]}>
            {subtitle}
          </Text>
        </View>
        <Text
          style={{alignSelf: 'center', fontWeight: 'bold', color: '#676767'}}>
          {'>'}
        </Text>
      </View>

      <View style={{height: 1, backgroundColor: '#c9c9c9'}} />
    </TouchableOpacity>
  );
}

const color = '#0080ff';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerText: {
    textAlign: 'center',
  },
  imageWrapper: {
    borderRadius: 30,
    padding: 10,
    backgroundColor: Colors.secondary,
  },
});
