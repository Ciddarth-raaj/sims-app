import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/colors';

import HomeCard from '../Components/homeCard';
import GlobalWrapper from '../Components/GlobalWrapper';

import AppointmentHelper from '../helper/appointment';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcoming_count: 0,
    };
  }

  componentDidMount() {
    this.getUpcomingCount();
  }

  getUpcomingCount() {
    AppointmentHelper.getUpcoming()
      .then(data => {
        if (data.code == undefined) {
          this.setState({upcoming_count: data.length});
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  async logout() {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  render() {
    const {upcoming_count} = this.state;

    return (
      <GlobalWrapper>
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              paddingTop: 20,
            }}>
            <View>
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '700',
                    color: Colors.secondary,
                  }}>
                  {`Hi ${global.config.name} ,`}
                </Text>
              </View>
              <Text style={{fontSize: 19, fontWeight: '500'}}>
                How can we help you?
              </Text>
            </View>

            <TouchableOpacity onPress={() => this.logout()}>
              <Text>{'Logout'}</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <HomeCard
              title="Find A Doctor"
              image={require('../assets/doctor.png')}
              pressAction={() => this.props.navigation.navigate('Search')}
            />
            <HomeCard
              title="Apointments"
              image={require('../assets/list.png')}
              pressAction={() => this.props.navigation.navigate('Reschedule')}
            />
            {/* <HomeCard
                title="Cancel Appointment"
                image={require('../assets/close.png')}
                pressAction={() => this.props.navigation.navigate('Cancel')}
              /> */}
          </View>

          <TouchableOpacity
            style={styles.container1}
            onPress={() => this.props.navigation.navigate('Upcoming')}>
            <View style={styles.counterWrap}>
              <Text style={{textAlign: 'center', color: 'white'}}>
                {upcoming_count}
              </Text>
            </View>
            <Text style={styles.container1Text}>Upcoming Appointments</Text>
            <Text style={styles.container1Text}>{'>'}</Text>
          </TouchableOpacity>
        </>
      </GlobalWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#e1f0ff',
    borderRadius: 20,
    margin: 10,
    padding: 20,
    height: 70,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,

    // elevation: 13,
  },
  container1Text: {
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  counterWrap: {
    width: 30,
    height: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
