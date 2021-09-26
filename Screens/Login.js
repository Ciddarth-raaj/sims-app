import React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/colors';

import UserHelper from '../helper/user';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('token');
    const name = await AsyncStorage.getItem('name');
    const role_id = await AsyncStorage.getItem('role_id');
    if (token != undefined || token != null) {
      global.config.accessToken = token;
      global.config.name = name;
      this.props.navigation.navigate(role_id == 2 ? 'DoctorHome' : 'Home');
    }
  }

  login() {
    const { phone, password } = this.state;

    if (phone == '' || password == '') {
      alert('Fill all fields to continue!');
      return;
    }

    if (phone.length != 10 || isNaN(phone)) {
      alert('Invalid Phone Number!');
      return;
    }

    UserHelper.login(phone, password)
      .then(async data => {
        if (data.code == 200) {
          await AsyncStorage.setItem('token', data.token);
          await AsyncStorage.setItem('name', data.name);
          await AsyncStorage.setItem('role_id', data.role_id + "");
          global.config.accessToken = data.token;
          global.config.name = data.name;
          this.props.navigation.navigate(data.role_id == "2" ? "DoctorHome" : 'Home');
        } else if (data.code == 404) {
          alert('Incorrect Phone Number / Password');
        } else {
          throw 'err';
        }
      })
      .catch(err => {
        console.log(err);
        alert('Error logging in!');
      });
  }

  render() {
    const { phone, password } = this.state;
    return (
      <>
        <SafeAreaView style={{ backgroundColor: 'white' }} />
        <SafeAreaView
          style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
          <View style={styles.wrapper}>
            <Image
              source={require('../assets/sims-logo.png')}
              style={styles.logo}
              resizeMode={'contain'}
            />
            {/* <Text
              style={{
                textAlign: 'center',
                marginBottom: 20,
                fontWeight: 'bold',
                fontSize: 32,
              }}>
              Login
            </Text> */}
            <TextInput
              value={phone}
              placeholder={'Phone Number'}
              placeholderTextColor="#879099"
              onChangeText={v => this.setState({ phone: v })}
              style={styles.textInputStyle}
              keyboardType={'phone-pad'}
            />
            <TextInput
              value={password}
              placeholder={'Password'}
              placeholderTextColor="#879099"
              onChangeText={v => this.setState({ password: v })}
              style={styles.textInputStyle}
              secureTextEntry={true}
            />

            <TouchableOpacity
              style={styles.buttonWrapper}
              onPress={() => this.login()}>
              <Text style={styles.buttonText}>{'LOGIN'}</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
  textInputStyle: {
    backgroundColor: '#e1f0ff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonWrapper: {
    padding: 15,
    backgroundColor: Colors.secondary,
    alignSelf: 'center',
    width: 150,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  logo: {
    alignSelf: 'center',
    height: 100,
    position: 'absolute',
    top: -120,
  },
});
