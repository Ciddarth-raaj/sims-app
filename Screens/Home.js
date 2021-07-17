import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import HomeCard from '../Components/homeCard';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <SafeAreaView>
          <ScrollView style={{height: '100%', backgroundColor: 'white'}}>
            <View style={{padding: 10}}>
              <View>
                <Text
                  style={{fontSize: 25, fontWeight: '700', color: '#0080ff'}}>
                  Hi Ciddarth ,
                </Text>
              </View>
              <Text style={{fontSize: 19, fontWeight: '500'}}>
                How can we help you?
              </Text>
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
                title="Reschedule Apointment"
                image={require('../assets/clock.png')}
                pressAction={() => this.props.navigation.navigate('Reschedule')}
              />
              <HomeCard
                title="Cancel Appointment"
                image={require('../assets/close.png')}
                pressAction={() => this.props.navigation.navigate('Cancel')}
              />
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
    backgroundColor: '#0080ff',
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'center',
  },
});
