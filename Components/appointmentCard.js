import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

import ScheduleModal from './scheduleModal';

export default function AppointmentCard(props) {
  const {id, name, timeSlot, cancel, navigation} = props;
  const reschedule = props.cancel == undefined;

  const [isVisible, setVisible] = React.useState(false);

  return (
    <View style={{marginTop: 10}}>
      <ScheduleModal
        isVisible={isVisible}
        fee={100}
        close={() => setVisible(false)}
        navigation={navigation}
      />
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../assets/happydoctor.jpg')}
          style={{width: 80, height: 80, borderRadius: 50}}
        />
        <View style={{justifyContent: 'center'}}>
          <Text
            style={[
              styles.containerText,
              {fontWeight: '700'},
            ]}>{`Dr ${name}`}</Text>
          <Text style={{fontWeight: 'bold', color: '#0080ff', marginTop: 10}}>
            Time :{' '}
            <Text style={{fontWeight: 'normal', color: 'black'}}>
              {timeSlot}
            </Text>{' '}
          </Text>
        </View>
      </View>
      {reschedule ? (
        <TouchableOpacity
          style={[styles.buttonStyle, {backgroundColor: '#0080ff'}]}
          onPress={() => setVisible(true)}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            RESCHEDULE APPOINTMENT
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonStyle} onPress={cancel}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            CANCEL APPOINTMENT
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'red',
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
});
