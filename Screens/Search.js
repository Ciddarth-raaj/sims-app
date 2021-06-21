import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import SearchHeader from '../Components/searchHeader';
import DoctorCard from '../Components/doctorCard';
import DiseaseCard from '../Components/diseaseCard';
import API from '../api';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: [
        {
          id: 1,
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
      specList: [
        {
          id: 1,
          name: 'Geenral Physician',
          subtitle: 'Managing acute medical conditions',
          image: 'Test',
        },
        {
          id: 2,
          name: 'Covid Consultation',
          subtitle: 'For common healt concerns',
          image: 'Test',
        },
      ],
    };
  }

  componentDidMount() {
    // this.getSpecializations();
    // this.getDoctors();
  }

  getSpecializations() {
    let formData = new FormData();
    formData.append('secret', 'TestCode');

    API.post('Specialization/getAll.php', formData)
      .then(res => {
        this.setState({specList: res.data.data});
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  getDoctors() {
    let formData = new FormData();
    formData.append('secret', 'TestCode');

    API.post('Doctor/getAll.php', formData)
      .then(res => {
        this.setState({docList: res.data.data});
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => this.setState({loading: false}));
  }

  handleSearch(str) {
    if (str.length > 2) console.log(str);
  }

  render() {
    const {docList, specList} = this.state;

    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white', flex: 0}} />
        <SafeAreaView style={{backgroundColor: 'white'}}>
          <SearchHeader
            onSearch={this.handleSearch}
            navigation={this.props.navigation}
          />
          <ScrollView style={{height: '100%', padding: 10}}>
            <View style={{paddingBottom: 120}}>
              <Text style={styles.titleText}>Specialisations</Text>
              {specList.map(s => (
                <DiseaseCard
                  id={s.id}
                  name={s.name}
                  subtitle={s.subtitle}
                  image={s.image}
                  navigation={this.props.navigation}
                />
              ))}

              <Text style={[styles.titleText, {marginTop: 20}]}>Doctors</Text>
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

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
});
