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

export default class Cancel extends React.Component {
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

  cancel(id, docName) {
    Alert.alert(
      'Cancel Appointment',
      'Are you Sure you Want to Cancel the Appointment with ' + docName + ' ?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const {appointments} = this.state;
            for (i = 0; i < appointments.length; i++) {
              if (appointments[i].id == id) {
                appointments.splice(i, 1);
                break;
              }
            }
            this.setState({appointments: appointments});
          },
        },
      ],
    );
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
                Cancel Appointment
              </Text>
            </View>
            {appointments.map(a => (
              <AppointmentCard
                id={a.id}
                name={a.name}
                timeSlot={a.timeSlot}
                cancel={() => this.cancel(a.id, a.name)}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
