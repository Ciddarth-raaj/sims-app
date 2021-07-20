import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import DoctorCard from '../Components/doctorCard';

import DoctorHelper from '../helper/doctor';

export default class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: [],
    };
  }

  componentDidMount() {
    this.getDoctors(this.props.route.params.id);
  }

  getDoctors(id) {
    DoctorHelper.get({specialisations: [id]})
      .then(data => {
        this.setState({docList: data});
      })
      .catch(err => {
        console.log(err);
        alert('Error getting details');
      });
  }

  render() {
    const {docList} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white', flex: 0}} />
        <SafeAreaView style={{backgroundColor: 'white'}}>
          <ScrollView style={{height: '100%', padding: 10}}>
            <View style={{paddingBottom: 40}}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.goBack()}>
                  <Image
                    source={require('../assets/back.png')}
                    style={{width: 30, height: 30, marginRight: 20}}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    color: '#004b96',
                    fontWeight: '500',
                    fontSize: 20,
                    marginBottom: 10,
                  }}>
                  Here are our best Doctors
                </Text>
              </View>
              {docList.map(d => (
                <DoctorCard
                  id={d.doctor_id}
                  name={d.doctor_name}
                  qualification={d.qualification}
                  specialization={d.specialisation}
                  experience={d.experience}
                  languages={d.languages}
                  fees={d.fees}
                  navigation={this.props.navigation}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({});
