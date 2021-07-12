import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import SearchHeader from '../Components/searchHeader';
import DoctorCard from '../Components/doctorCard';
import DiseaseCard from '../Components/diseaseCard';
import API from '../Util/api';

import DoctorHelper from '../helper/doctor';
import SpecialisationHelper from '../helper/specialisation';
export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docList: [
        {
          id: 1,
          name: 'Ravi',
          qualification: 'MBBS',
          specialization: 'Surgery',
          experience: '4',
          email: 'ABC@sims.com',
          phone: '123456789',
          languages: 'ENG,TAMIL',
          fees: '249',
          picture: 'xxxxx',
        },
        {
          id: 2,
          name: 'Leela',
          qualification: 'MBBS',
          specialization: 'Paediatrics',
          experience: '4',
          email: 'ABC@sims.com',
          phone: '123456789',
          languages: 'ENG,TAMIL',
          fees: '549',
          picture: 'xxxxx',
        },
      ],
      specList: [],
      sortedDocList: [],
      sortedSpecList: [],
    };
  }

  componentDidMount() {
    this.getSpecializations();
    this.getDoctors();
  }

  getSpecializations() {
    SpecialisationHelper.get()
      .then(data => {
        console.log(data);
        this.setState({specList: data});
      })
      .then(data => {
        console.log(err);
        alert('Error Getting Specialisations');
      });
  }

  getDoctors() {
    DoctorHelper.get()
      .then(data => {
        this.setState({docList: data});
      })
      .catch(err => {
        console.log(err);
        alert('Error Getting Doctor Details!');
      });
  }

  handleSearch(str) {
    const {docList, specList} = this.state;
    if (str.length > 2) {
      const newDocList = [];
      for (let d of docList) {
        if (
          d.name.includes(str) ||
          d.qualification.includes(str) ||
          d.specialization.includes(str)
        ) {
          newDocList.push(d);
        }
      }

      const newSpecList = [];
      for (let d of specList) {
        if (d.name.includes(str) || d.subtitle.includes(str)) {
          newSpecList.push(d);
        }
      }

      this.setState({sortedDocList: newDocList, sortedSpecList: newSpecList});
    } else if (str.length == 0) {
      this.setState({sortedDocList: [], sortedSpecList: []});
    }
  }

  render() {
    const {docList, specList, sortedDocList, sortedSpecList} = this.state;

    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white', flex: 0}} />
        <SafeAreaView style={{backgroundColor: 'white'}}>
          <SearchHeader
            onSearch={val => this.handleSearch(val)}
            navigation={this.props.navigation}
          />
          <ScrollView style={{height: '100%', padding: 10}}>
            <View style={{paddingBottom: 120}}>
              <Text style={styles.titleText}>Specialisations</Text>
              {(sortedSpecList.length > 0
                ? sortedSpecList
                : specList.splice(0, 5)
              ).map(s => (
                <DiseaseCard
                  id={s.id}
                  name={s.label}
                  subtitle={s.sub}
                  image={s.image}
                  navigation={this.props.navigation}
                />
              ))}

              <Text style={[styles.titleText, {marginTop: 20}]}>Doctors</Text>
              {(sortedDocList.length > 0 ? sortedDocList : docList).map(d => (
                <DoctorCard
                  id={d.id}
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

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
});
