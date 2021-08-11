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

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  async logout() {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <GlobalWrapper>
        <>
          <SafeAreaView style={{backgroundColor: 'white'}} />
          <SafeAreaView>
            <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
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
                  image={require('../assets/medical-doctor-specialist.png')}
                  pressAction={() => this.props.navigation.navigate('Search')}
                />
                <HomeCard
                  title="Apointments"
                  image={require('../assets/clock.png')}
                  pressAction={() =>
                    this.props.navigation.navigate('Reschedule')
                  }
                />
                {/* <HomeCard
                title="Cancel Appointment"
                image={require('../assets/close.png')}
                pressAction={() => this.props.navigation.navigate('Cancel')}
              /> */}
              </View>

              <View style={styles.container1}>
                <View style={styles.counterWrap}>
                  <Text style={{textAlign: 'center', color: 'white'}}>1</Text>
                </View>
                <Text style={styles.container1Text}>Upcoming Appointments</Text>
                <Text style={styles.container1Text}>{'>'}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
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
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
