import moment from 'moment'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Alert,
  Linking,
} from 'react-native'

import Colors from '../constants/colors'

import AppointmentHelper from '../helper/appointment'
import RescheduleModal from './rescheduleModal'

export default function AppointmentCard (props) {
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
    meetingLink,
  } = props

  const [isVisible, setVisible] = React.useState(false)

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
          onPress: () => cancelCall(),
        },
      ],
    )
  }

  const cancelCall = () => {
    const data = {appointment_id: id, appointment_status: 5}
    AppointmentHelper.update(data)
      .then(data => {
        if (data.code == 200) {
          getAppointments()
          alert('Appointment Cancelled')
        } else {
          throw 'error'
        }
      })
      .catch(err => {
        console.log(err)
        alert('Error cancelling appointment! Try again later!')
      })
  }

  const joinMeeting = () => {
    Linking.openURL(meetingLink)
  }

  return (
    <View style={{marginTop: 40}}>
      <RescheduleModal
        appointment_id={id}
        timeSlot={timeSlot}
        isVisible={isVisible}
        close={() => setVisible(false)}
        navigation={navigation}
        getAppointments={() => getAppointments()}
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
            ]}>{`${name}`}</Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: Colors.secondary,
              marginTop: 10,
            }}>
            {'Time : '}
            <Text style={{fontWeight: 'normal', color: 'black'}}>
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
            <Text style={{fontWeight: 'normal', color: 'black'}}>{status}</Text>
          </Text>
        </View>
      </View>

      {status_id != 5 && status_id != 2 && type != 'upcoming' && (
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
              style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>
              CANCEL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {backgroundColor: Colors.secondary, marginLeft: 10},
            ]}
            onPress={() => setVisible(true)}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              RESCHEDULE
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {(type == 'upcoming' || status_id == 2) &&
        joinMeeting != null &&
        moment(timeSlot, 'hh:mm A - ddd - DD,MMM') <= moment() &&
        moment(timeSlot, 'hh:mm A - ddd - DD,MMM').add(30, 'm') >= moment() && (
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {backgroundColor: Colors.secondary, marginLeft: 10},
            ]}
            onPress={() => joinMeeting()}>
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              JOIN MEET
            </Text>
          </TouchableOpacity>
        )}
    </View>
  )
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
})
