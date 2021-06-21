import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';

import {numberFormat} from '../Util/numberFormat';
import ScheduleModal from '../Components/scheduleModal';

import API from '../api';

export default class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Ramachandran',
      qualification: 'MBBS',
      specialization: 'Surgery',
      experience: '4',
      email: 'ABC@sims.com',
      phone: '123456789',
      languages: 'ENG,TAMIL',
      fees: '249',
      picture: 'xxxxx',
      isVisible: false,
      selectedDate: '',
    };
  }

  componentDidMount() {
    // this.getDoctor(this.props.route.params.id);
  }

  formatData(res) {
    this.setState({
      name: res.name,
      qualification: res.qualification,
      specialization: res.specialization,
      experience: res.experience,
      email: res.email,
      phone: res.phone,
      languages: res.languages,
      fees: res.fees,
      picture: res.picture,
    });
  }

  getDoctor(id) {
    let formData = new FormData();
    formData.append('secret', 'TestCode');
    formData.append('id', id);

    API.post('Doctor/getId.php', formData)
      .then(res => {
        this.formatData(res.data.data[0]);
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    const {
      name,
      qualification,
      specialization,
      experience,
      languages,
      fees,
      isVisible,
      selectedDate,
    } = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <SafeAreaView>
          <ScheduleModal
            isVisible={isVisible}
            fee={fees}
            close={() => this.setState({isVisible: false})}
            navigation={this.props.navigation}
          />
          <ScrollView
            style={{padding: 20, height: '100%', backgroundColor: 'white'}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../assets/back.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/happydoctor.jpg')}
              style={{width: '100%'}}
              resizeMode="contain"
            />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 22,
                color: '#00264b',
                marginTop: 10,
              }}>{`Dr ${name}`}</Text>
            <View
              style={{
                height: 1,
                backgroundColor: '#c9c9c9',
                marginTop: 5,
                marginBottom: 5,
              }}
            />
            <Text
              style={{
                fontSize: 17,
                color: '#004b96',
              }}>{`${specialization} | ${experience} Years`}</Text>

            <Text style={{marginTop: 10}}>{qualification}</Text>

            <Text style={{marginTop: 10, color: '#696969'}}>{languages}</Text>

            <View
              style={{
                backgroundColor: '#e1f0ff',
                padding: 20,
                marginTop: 30,
                borderRadius: 10,
                width: '70%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#00264b',
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                CONSULTATION FEE
              </Text>
              <Text style={{color: '#004b96', textAlign: 'center'}}>
                {numberFormat(fees)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                marginTop: 30,
                alignSelf: 'center',
                width: '80%',
                backgroundColor: '#0080ff',
                padding: 20,
                borderRadius: 10,
              }}
              onPress={() => this.setState({isVisible: !isVisible})}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                BOOK APPOINTMENT
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
