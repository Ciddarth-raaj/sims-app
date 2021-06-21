import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

import {moment} from 'moment';
import TimeCard from './timeCard';
import {numberFormat} from '../Util/numberFormat';

export default function ScheduleModal(props) {
  const {isVisible, fee, close, navigation} = props;
  const [date, setDate] = React.useState(new Date());
  const minDate = new Date();
  const [availableDates, setAvailableDates] = React.useState([
    {id: 1, time: '9:30', selected: true},
    {id: 2, time: '10:30', selected: false, disabled: true},
    {id: 3, time: '11:00', selected: false},
    {id: 4, time: '11:30', selected: false},
    {id: 5, time: '12:00', selected: false},
    {id: 6, time: '12:30', selected: false, disabled: true},
  ]);

  onTimeChange = id => {
    const newAvailableDates = availableDates.map(d => {
      if (d.id === id) {
        d.selected = true;
      } else d.selected = false;
      return d;
    });

    setAvailableDates(newAvailableDates);
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
              minDate={minDate}
              selectedDayColor="#e1f0ff"
              selectedDayTextColor="#004b96"
              todayBackgroundColor="#ffffff"
              width={350}
            />
            <View style={[styles.blueContainer, {marginTop: 0}]}>
              <Text style={styles.blueContainerTitle}>Selected Date</Text>
              <Text style={styles.blueContainerText}>{date + ''}</Text>
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
                backgroundColor: '#0080ff',
                padding: 20,
                borderRadius: 10,
              }}
              onPress={() => {
                close();
                navigation.navigate('Success');
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                CONTINUE TO PAYMENT - {numberFormat(fee)}
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
  },
  blueContainerText: {color: '#004b96', marginTop: 10},
});
