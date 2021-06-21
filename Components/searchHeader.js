import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function SearchHeader(props) {
  const {onSearch, navigation} = props;

  return (
    <View style={{overflow: 'hidden', paddingBottom: 5}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={{alignSelf: 'center', marginRight: 5}}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search By Doctor Name or Speciality"
          placeholderTextColor={'#999999'}
          style={styles.searchBox}
          onChangeText={text => onSearch(text)}
        />
      </View>
    </View>
  );
}

const color = '#0080ff';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 70,
    shadowColor: '#000',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  searchBox: {
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: 'whitesmoke',
    height: 40,
    paddingHorizontal: 10,
  },
});
