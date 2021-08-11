import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  RefreshControl,
} from 'react-native';

import Colors from '../constants/colors';

import Header from './header';
// import FooterMenu from '../Components/FooterMenu';

export default class GlobalWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      children,
      disableFooter,
      tag,
      navigation,
      refreshing,
      handleRefresh,
    } = this.props;
    return (
      <>
        <SafeAreaView style={{backgroundColor: Colors.primary}} />
        <SafeAreaView style={{height: '100%', backgroundColor: 'white'}}>
          <StatusBar
            backgroundColor={Colors.primaryDark}
            barStyle="light-content"
          />
          <Header />
          <ScrollView
            style={{height: '100%'}}
            refreshControl={
              handleRefresh != undefined && (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              )
            }>
            {children}
          </ScrollView>
          <SafeAreaView />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    // flex: 1,
    // alignItems: 'center',
    // flexDirection: 'column',
    // marginTop: 50,
  },
});
