import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'react-native';

import Home from './Screens/Home';
import Doctor from './Screens/Doctor';
import Search from './Screens/Search';
import DoctorList from './Screens/DoctorList';
import Reschedule from './Screens/Reschedule';
import Cancel from './Screens/Cancel';
import Success from './Screens/Success';

const Stack = createStackNavigator();
console.disableYellowBox = true;

function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor="#e39300" /> */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Doctor"
          component={Doctor}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Cancel"
          component={Cancel}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Reschedule"
          component={Reschedule}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
