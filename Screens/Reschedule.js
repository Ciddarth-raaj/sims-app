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
import GlobalWrapper from '../Components/GlobalWrapper';

import AppointmentHelper from '../helper/appointment';

export default class Reschedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments: [],
    };
  }

  componentDidMount() {
    this.getAppointments();
  }

  getAppointments() {
    AppointmentHelper.get()
      .then(data => this.setState({ appointments: data }))
      .catch(err => console.log(err));
  }

  openModal() {
    this.setState({ isVisible: true });
  }

  render() {
    const { appointments } = this.state;
    return (
      <GlobalWrapper>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ alignSelf: 'center', marginRight: 5 }}
              onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/back.png')}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 19,
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 10,
              }}>
              Appointments
            </Text>
          </View>
          {appointments.map(a => (
            <AppointmentCard
              id={a.appointment_id}
              name={a.doctor_name}
              status={a.status}
              status_id={a.status_id}
              timeSlot={a.timeslot}
              meetingLink={a.meetingLink}
              navigation={this.props.navigation}
              getAppointments={() => this.getAppointments()}
            />
          ))}
        </View>
      </GlobalWrapper>
    );
  }
}

const styles = StyleSheet.create({});
