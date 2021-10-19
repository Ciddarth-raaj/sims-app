import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'

import Colors from '../constants/colors'

export default function TimeCard (props) {
  const {id, time, onTimeChange, selected, disabled} = props

  return (
    <TouchableOpacity
      style={
        disabled
          ? [styles.container, styles.disabledContainer]
          : [styles.container, selected && styles.containerSelected]
      }
      activeOpacity={1}
      onPress={() => {
        // if (disabled == false || disabled == undefined) {
        onTimeChange(id)
        // }
      }}>
      <Text
        style={{color: disabled ? 'black' : !selected ? '#004b96' : '#ffffff'}}>
        {time}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1f0ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  containerSelected: {
    backgroundColor: Colors.secondary,
  },
  disabledContainer: {
    backgroundColor: '#d9d9d9',
  },
})
