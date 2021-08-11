import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../constants/colors';

import {numberFormat} from '../Util/numberFormat';
import CalendarPicker from 'react-native-calendar-picker';

import TimeCard from './timeCard';

import OrdersHelper from '../helper/orders';
import PatientsHelper from '../helper/patients';
import AppointmentHelper from '../helper/appointment';
import moment from 'moment';

export default function ScheduleModal(props) {
  let order_id = undefined;
  let patientDetails = undefined;

  const {isVisible, fee, close, navigation, getAppointments} = props;
  const [date, setDate] = React.useState(
    new Date(moment(props.timeSlot, 'hh:mm A - ddd - DD,MMM')),
  );
  const minDate = new Date();
  const [availableDates, setAvailableDates] = React.useState([
    {id: 1, time: '09:30 AM', selected: false},
    {id: 2, time: '10:30 AM', selected: false},
    {id: 3, time: '11:00 AM', selected: false},
    {id: 4, time: '11:30 AM', selected: false},
    {id: 5, time: '12:00 PM', selected: false},
    {id: 6, time: '12:30 PM', selected: false},
    {id: 7, time: '03:00 PM', selected: false},
    {id: 8, time: '03:30 PM', selected: false},
  ]);

  useEffect(() => {
    if (
      moment(props.timeSlot, 'hh:mm A - ddd - DD,MMM').format('DD-MM-YYYY') ==
      moment(date).format('DD-MM-YYYY')
    ) {
      for (let i in availableDates) {
        if (
          availableDates[i].time ==
          moment(props.timeSlot, 'hh:mm A - ddd - DD,MMM').format('hh:mm')
        ) {
          availableDates[i].selected = true;
          break;
        } else {
          availableDates[i].selected = false;
        }
      }
      setAvailableDates([...availableDates]);
    } else {
      for (let i in availableDates) {
        if (i == 0) {
          availableDates[i].selected = true;
          continue;
        }
        availableDates[i].selected = false;
      }
      setAvailableDates([...availableDates]);
    }
  }, [date]);

  onTimeChange = id => {
    const newAvailableDates = availableDates.map(d => {
      if (d.id === id) {
        d.selected = true;
      } else {
        d.selected = false;
      }
      return d;
    });

    setAvailableDates([...newAvailableDates]);
  };

  const updateAppoinment = () => {
    let selectedDate = undefined;

    for (const i in availableDates) {
      if (availableDates[i].selected == true) {
        selectedDate = availableDates[i].time;
        break;
      }
    }

    const formattedDate = moment(
      moment(date).format('YYYY-MM-DD') + ' ' + selectedDate,
      'YYYY-MM-DD hh:mm A',
    )
      .utc()
      .format('YYYY-MM-DD[T]HH:mm:ss.000[Z]');

    const data = {
      appointment_id: props.appointment_id,
      timeslot: new Date(formattedDate).toISOString(),
    };

    AppointmentHelper.update(data)
      .then(data => {
        if (data.code == 200) {
          getAppointments();
          alert('Rescheduled!');
          close();
        } else if (data.code == 201) {
          alert('Slot not available!');
        } else {
          throw 'undefined code';
        }
      })
      .catch(err => {
        alert('Error rescheduling appointment! Try Again Later!');
        console.log(err);
      });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        }}>
        <View style={styles.mainContainer}>
          <ScrollView style={{height: '100%'}}>
            <TouchableOpacity
              style={{
                backgroundColor: 'whitesmoke',
                width: 30,
                height: 30,
                borderRadius: 15,
                justifyContent: 'center',
                alignSelf: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}
              onPress={() => close()}>
              <Text style={{textAlign: 'center'}}>x</Text>
            </TouchableOpacity>
            <CalendarPicker
              onDateChange={date => {
                setDate(new Date(date));
              }}
              // scaleFactor={400}
              initialDate={date}
              minDate={minDate}
              selectedDayColor="#e1f0ff"
              selectedDayTextColor="#004b96"
              todayBackgroundColor="#ffffff"
              width={350}
            />
            <View style={[styles.blueContainer, {marginTop: 20}]}>
              <Text style={styles.blueContainerTitle}>Selected Date</Text>
              <Text style={styles.blueContainerText}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.blueContainerTitle,
                  {marginTop: 20, textAlign: 'center'},
                ]}>
                Pick Your Time Slot
              </Text>
              <View
                style={{
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  marginTop: 10,
                  justifyContent: 'center',
                }}>
                {availableDates.map(d => (
                  <TimeCard
                    time={d.time}
                    id={d.id}
                    selected={d.selected}
                    onTimeChange={onTimeChange}
                    disabled={d.disabled}
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={{
                marginTop: 10,
                alignSelf: 'center',
                width: '80%',
                backgroundColor: Colors.secondary,
                padding: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                // close();
                // createRazorpay();
                // navigation.navigate('Success');
                updateAppoinment();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                RESCHEDULE
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '95%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueContainer: {
    backgroundColor: '#e1f0ff',
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    width: '70%',
    alignSelf: 'center',
  },
  blueContainerTitle: {
    color: '#00264b',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  blueContainerText: {color: '#004b96', marginTop: 10, textAlign: 'center'},
});
