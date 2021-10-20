import React from 'react'
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native'
import {useState} from 'react'

import Colors from '../constants/colors'

import {numberFormat} from '../Util/numberFormat'

export default function DoctorCard (props) {
  const {
    id,
    name,
    qualification,
    specialization,
    experience,
    languages,
    fees,
    navigation,
  } = props

  console.log(name, id)

  return (
    <View style={{marginBottom: 20}}>
      <View style={styles.container}>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={require('../assets/happydoctor.jpg')}
            style={{width: 80, height: 80, borderRadius: 50}}
          />
        </View>
        <View
          style={{
            marginLeft: 30,
            // marginRight: 10,
            // flexShrink: 1,
            alignSelf: 'center',
          }}>
          <Text
            style={[
              styles.containerText,
              {fontWeight: '700'},
            ]}>{`Dr ${name}`}</Text>
          <Text
            style={[
              styles.containerText,
              {color: Colors.secondary},
            ]}>{`${specialization} ${
            experience != undefined ? `| ${experience} Years` : ''
          }`}</Text>
          {qualification != undefined && (
            <Text style={styles.containerText}>{qualification}</Text>
          )}
          {languages != undefined && (
            <Text style={styles.containerText}>{languages}</Text>
          )}
          <Text style={[styles.containerText, {color: Colors.secondary}]}>
            <Text style={{color: 'black'}}>Consultation Fees : </Text>
            {numberFormat(fees)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => navigation.navigate('Doctor', {id, id})}>
        <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
          BOOK APPOINTMENT
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    //backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  containerText: {
    textAlign: 'left',
    marginBottom: 5,
  },
  buttonStyle: {
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    height: 50,
    // borderBottomRightRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
})
