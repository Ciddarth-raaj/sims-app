import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import SearchHeader from '../Components/searchHeader';
import DoctorCard from '../Components/doctorCard';
import DiseaseCard from '../Components/diseaseCard';
import API from '../Util/api';

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
      specList: [
        {
          id: 1,
          name: 'General Physician',
          subtitle: 'Managing acute medical conditions',
          image: require('../assets/medical-doctor-specialist.png'),
        },
        {
          id: 2,
          name: 'Covid Consultation',
          subtitle: 'For common health concerns',
          image: require('../assets/cells-in-a-circle.png'),
        },
        {
          id: 3,
          name: 'Paediatrics',
          subtitle: 'Specialists to care and treat children',
          image: require('../assets/baby-face.png'),
        },
        {
          id: 4,
          name: 'Cardiology',
          subtitle: 'For heart and blood pressure problems',
          image: require('../assets/sthethoscope.png'),
        },
        {
          id: 5,
          name: 'Dermatology',
          subtitle: 'Specialists for skin an hair treatment',
          image: require('../assets/sthethoscope.png'),
        },
      ],
      sortedDocList: [],
      sortedSpecList: [],
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
              {(sortedSpecList.length > 0 ? sortedSpecList : specList).map(
                s => (
                  <DiseaseCard
                    id={s.id}
                    name={s.name}
                    subtitle={s.subtitle}
                    image={s.image}
                    navigation={this.props.navigation}
                  />
                ),
              )}

              <Text style={[styles.titleText, {marginTop: 20}]}>Doctors</Text>
              {(sortedDocList.length > 0 ? sortedDocList : docList).map(d => (
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
