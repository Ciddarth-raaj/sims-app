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
import API from '../Util/api';

export default class DoctorList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: [
        {
          name: 'ABC',
          qualification: 'MBBS',
          specialization: 'Surgery',
          experience: '4',
          email: 'ABC@sims.com',
          phone: '123456789',
          languages: 'ENG,TAMIL',
          fees: '249',
          picture: 'xxxxx',
        },
      ],
    };
  }

  componentDidMount() {
    // this.getDoctors(this.props.route.params.id);
  }

  getDoctors(id) {
    let formData = new FormData();
    formData.append('secret', 'TestCode');
    formData.append('specialization', id);

    API.post('Doctor/getAll.php', formData)
      .then(res => {
        this.setState({docList: res.data.data});
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => this.setState({loading: false}));
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
                  id={d.id}
                  name={d.name}
                  qualification={d.qualification}
                  specialization={d.specialization}
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
