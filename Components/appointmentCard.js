import React from 'react';
import {StyleSheet, Text, TouchableOpacity, Image, View} from 'react-native';

import ScheduleModal from './scheduleModal';

export default function AppointmentCard(props) {
  const {id, name, timeSlot, cancel, navigation} = props;
  const [isVisible, setVisible] = React.useState(false);

  return (
    <View style={{marginTop: 40}}>
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {marginRight: 10, borderColor: 'red', borderWidth: 1},
          ]}
          onPress={cancel}>
          <Text style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>
            CANCEL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {backgroundColor: '#0080ff', marginLeft: 10},
          ]}
          onPress={() => setVisible(true)}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            RESCHEDULE
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
