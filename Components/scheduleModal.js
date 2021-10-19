import React, { useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

import Colors from '../constants/colors'

import CalendarPicker from 'react-native-calendar-picker'
import RazorpayCheckout from 'react-native-razorpay'
import { numberFormat } from '../Util/numberFormat'

import TimeCard from './timeCard'

import OrdersHelper from '../helper/orders'
import PatientsHelper from '../helper/patients'
import AppointmentHelper from '../helper/appointment'
import moment from 'moment'

export default function ScheduleModal(props) {
  let order_id = undefined
  let patientDetails = undefined
  const { isVisible, fee, close, navigation } = props
  const [date, setDate] = React.useState(new Date())
  const minDate = new Date()
  const [availableDates, setAvailableDates] = React.useState([])

  useEffect(() => {
    // AppointmentHelper.getTime().then(data => setAvailableDates(availableDates))
    AppointmentHelper.getTime(1).then(data => console.log(availableDates))
  }, [])

  onTimeChange = id => {
    const newAvailableDates = availableDates.map(d => {
      if (d.id === id) {
        d.selected = true
      } else d.selected = false
      return d
    })

    setAvailableDates(newAvailableDates)
  }

  const createRazorpay = () => {
    if (order_id == undefined) {
      OrdersHelper.createRazorpay({
        amount: fee * 100,
        receipt: 1,
      })
        .then(data => {
          if ((data.status = 'status')) {
            order_id = data.id
            openPayment(data.id)
          } else {
            throw 'err'
          }
        })
        .catch(err => {
          console.log(err)
          alert('An error occured during payment.\nPlease try again later!')
        })
    } else {
      openPayment(order_id)
    }
  }

  const createOrder = mobile => {
    OrdersHelper.create({
      mobile,
    })
      .then(data => {
        if ((data.code = '200')) {
          createAppoinment()
        } else {
          throw 'err'
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const openPayment = async order_id => {
    try {
      patientDetails = patientDetails || (await getPatientsDetails())
      const options = {
        description: 'Online Consultation',
        // image: 'https://i.imgur.com/3g7nmJC.png',
        currency: 'INR',
        key: 'rzp_test_pMZx2ECklysZXf',
        amount: fee,
        name: 'SIMS Hospital',
        order_id: order_id,
        theme: { color: Colors.secondary },
      }

      if (patientDetails.code == 200) {
        options.prefill = {
          email: patientDetails.email,
          contact: patientDetails.phone,
          name: patientDetails.name,
        }
      }

      RazorpayCheckout.open(options)
        .then(data => {
          close()
          createOrder(patientDetails.phone)
        })
        .catch(error => {
          throw { code: error.code, error: error }
        })
    } catch (err) {
      console.log(err)
      if (err.code == undefined || err.code != 2) {
        alert('An error occured during payment.\nPlease try again later!')
      }
    }
  }

  const getPatientsDetails = async () =>
    new Promise((resolve, reject) => {
      PatientsHelper.getDetails()
        .then(data => resolve(data))
        .catch(err => reject(err))
    })

  const createAppoinment = () => {
    let selectedDate = undefined

    for (const i in availableDates) {
      if (availableDates[i].selected == true) {
        selectedDate = availableDates[i].time
        break
      }
    }

    const formattedDate = moment(
      moment(date).format('YYYY-MM-DD') + ' ' + selectedDate,
      'YYYY-MM-DD hh:mm A',
    )
      .utc()
      .format('YYYY-MM-DD[T]HH:mm:ss.000[Z]')

    const data = {
      timeslot: new Date(formattedDate).toISOString(),
      doctor_id: props.doctor_id,
    }

    AppointmentHelper.create(data)
      .then(data => {
        if (data.code == 200) {
          alert('Booked!')
          navigation.navigate('Success', {
            doctor_id: props.doctor_id,
            doctor_name: props.doctor_name,
            timeslot: moment(date).format('YYYY-MM-DD') + ' ' + selectedDate,
          })
        } else if (data.code == 201) {
          alert('Slot not available!')
        } else {
          throw 'undefined code'
        }
      })
      .catch(err => {
        alert('Error booking appointment! Try Again Later!')
        console.log(err)
      })
  }

  return (
    <Modal animationType='slide' transparent={true} visible={isVisible}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
        }}>
        <View style={styles.mainContainer}>
          <ScrollView style={{ height: '100%' }}>
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
              <Text style={{ textAlign: 'center' }}>x</Text>
            </TouchableOpacity>
            <CalendarPicker
              onDateChange={date => {
                setDate(new Date(date))
              }}
              // scaleFactor={400}
              minDate={minDate}
              selectedDayColor='#e1f0ff'
              selectedDayTextColor='#004b96'
              todayBackgroundColor='#ffffff'
              width={350}
            />

            <View style={[styles.blueContainer, { marginTop: 20 }]}>
              <Text style={styles.blueContainerTitle}>Selected Date</Text>
              <Text style={styles.blueContainerText}>
                {moment(date).format('DD/MM/YYYY')}
              </Text>
            </View>

            <View>
              <Text
                style={[
                  styles.blueContainerTitle,
                  { marginTop: 20, textAlign: 'center' },
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
                createRazorpay()
                // navigation.navigate('Success');
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
  )
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
  blueContainerText: { color: '#004b96', marginTop: 10, textAlign: 'center' },
})
