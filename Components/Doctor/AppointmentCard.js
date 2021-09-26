import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
} from 'react-native';

import Colors from '../../constants/colors';

import AppointmentHelper from '../../helper/appointment';

export default function AppointmentCard(props) {
  const {
    id,
    name,
    timeSlot,
    cancel,
    navigation,
    getAppointments,
    status,
    status_id,
    type,
  } = props;
  const [isVisible, setVisible] = React.useState(false);

  const cancelAppointment = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to cancel this appointment?',
      [
        {
          text: 'No',
          style: 'destructive',
        },
        {
          text: 'Yes',
          style: 'default',
          // onPress: () => cancelCall(),
        },
      ],
    );
  };

  return (
    <View style={{ marginTop: 40 }}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={require('../../assets/happydoctor.jpg')}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={[
              styles.containerText,
              { fontWeight: '700' },
            ]}>{`${name}`}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.secondary,
              marginTop: 10,
            }}>
            {'Time : '}
            <Text style={{ fontWeight: 'normal', color: 'black' }}>
              {timeSlot}
            </Text>
          </Text>

          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.secondary,
              marginTop: 10,
            }}>
            {'Status : '}
            <Text style={{ fontWeight: 'normal', color: 'black' }}>{status}</Text>
          </Text>
        </View>
      </View>

      {status_id != 5 && type != 'upcoming' && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                marginRight: 10,
                borderColor: 'red',
                borderWidth: 1,
              },
            ]}
            onPress={() => cancelAppointment()}>
            <Text
              style={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
              CANCEL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonStyle,
              { backgroundColor: Colors.secondary, marginLeft: 10 },
            ]}
            onPress={() => setVisible(true)}>
            <Text
              style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
              CONFIRM
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {type == 'upcoming' && (
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            { backgroundColor: Colors.secondary, marginLeft: 10 },
          ]}>
          <Text
            style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>
            JOIN MEET
          </Text>
        </TouchableOpacity>
      )}
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
