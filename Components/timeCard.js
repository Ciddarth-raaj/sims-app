import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default function TimeCard(props) {
  const {id, time, onTimeChange, selected} = props;

  return (
    <TouchableOpacity
      style={!selected ? styles.container : styles.containerSelected}
      activeOpacity={1}
      onPress={() => {
        onTimeChange(id);
      }}>
      <Text style={!selected ? {color: '#004b96'} : {color: '#ffffff'}}>
        {time}
      </Text>
    </TouchableOpacity>
  );
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
    backgroundColor: '#0080ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
});
