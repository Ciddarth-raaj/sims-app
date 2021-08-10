import moment from 'moment';
import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Success extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor_name: '',
      appointment_time: '',
    };
  }

  componentDidMount() {
    const params = this.props.route.params;
    if (params == undefined) {
      alert('You are not allowed to view this page');
      this.props.navigation.navigate('Home');
    } else {
      this.setState({
        doctor_name: params.doctor_name,
        appointment_time: moment(params.timeslot, 'YYYY-MM-DD hh:mm A').format(
          'hh:mm A - ddd, DD MMM',
        ),
      });
    }
  }

  render() {
    const {doctor_name, appointment_time} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <SafeAreaView>
          <View
            style={{
              backgroundColor: 'white',
              padding: 20,
              height: '100%',
              justifyContent: 'center',
            }}>
            <Text style={styles.blueContainerTitle}>
              {`Your Appointment with ${doctor_name} has been successfully booked.`}
            </Text>
            <View style={styles.blueContainer}>
              <Text style={styles.blueContainerTitle}>
                Please use the the following link to get your consultation :
              </Text>
              <Text style={styles.blueContainerText}>
                https://myvideocall.com/testId
              </Text>
            </View>
            <Text style={[{fontWeight: '700', marginTop: 20}]}>
              {`The Link Will be active at ${appointment_time} `}
              <Text style={{fontWeight: 'normal'}}>
                It will be active only for{' '}
                <Text style={{fontWeight: '700'}}>30 mins</Text>. Your are
                Kindly requested to join the meeting by then
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Home')}
              style={{
                marginTop: 30,
                alignSelf: 'center',
                width: '80%',
                backgroundColor: '#0080ff',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                GO HOME
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  blueContainer: {
    backgroundColor: '#e1f0ff',
    padding: 20,
    marginTop: 30,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  blueContainerTitle: {
    color: '#00264b',
    fontWeight: '600',
    fontSize: 16,
  },
  blueContainerText: {color: '#004b96', marginTop: 10},
});
