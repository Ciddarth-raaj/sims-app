import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';

import AppointmentCard from '../Components/appointmentCard';

export default class Reschedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [
        {
          id: 1,
          name: 'Ravi',
          timeSlot: '9:30, Fri 20th Jan',
        },
        {
          id: 2,
          name: 'Kumanran',
          timeSlot: '4:30, Mon 23th Jan',
        },
        {
          id: 3,
          name: 'Vivek Chandran',
          timeSlot: '10:30, Fri 27th Jan',
        },
      ],
    };
  }

  openModal() {
    this.setState({isVisible: true});
  }

  render() {
    const {appointments} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <SafeAreaView>
          <ScrollView
            style={{height: '100%', backgroundColor: 'white', padding: 10}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{alignSelf: 'center', marginRight: 5}}
                onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../assets/back.png')}
                  style={{width: 30, height: 30}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: 'bold',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                Reschedule Appointment
              </Text>
            </View>
            {appointments.map(a => (
              <AppointmentCard
                id={a.id}
                name={a.name}
                timeSlot={a.timeSlot}
                navigation={this.props.navigation}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
