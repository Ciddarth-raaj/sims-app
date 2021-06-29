import React from 'react';

import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  login() {
    const {phone, password} = this.state;

    if (phone == '' || password == '') {
      alert('Fill all fields to continue!');
      return;
    }

    alert('Logged In');
  }

  render() {
    const {phone, password} = this.state;
    return (
      <>
        <SafeAreaView style={{backgroundColor: 'white'}} />
        <SafeAreaView
          style={{backgroundColor: 'white', flex: 1, justifyContent: 'center'}}>
          <View style={styles.wrapper}>
            <Text
              style={{
                textAlign: 'center',
                marginBottom: 20,
                fontWeight: 'bold',
                fontSize: 32,
              }}>
              Login
            </Text>
            <TextInput
              value={phone}
              placeholder={'Phone Number'}
              placeholderTextColor="#879099"
              onChangeText={v => this.setState({phone: v})}
              style={styles.textInputStyle}
            />
            <TextInput
              value={password}
              placeholder={'Password'}
              placeholderTextColor="#879099"
              onChangeText={v => this.setState({password: v})}
              style={styles.textInputStyle}
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
    backgroundColor: '#0088ff',
    alignSelf: 'center',
    width: 150,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
