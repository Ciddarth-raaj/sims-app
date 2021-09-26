import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import Home from './Screens/Home';
import Doctor from './Screens/Doctor';
import Search from './Screens/Search';
import DoctorList from './Screens/DoctorList';
import Reschedule from './Screens/Reschedule';
import Cancel from './Screens/Cancel';
import Success from './Screens/Success';
import Login from './Screens/Login';
import Upcoming from './Screens/Upcoming';
import DoctorHome from './Screens/Doctor/Home';
import DoctorAppointments from './Screens/Doctor/Appointments';

import './constants/variables';

const Stack = createStackNavigator();
console.disableYellowBox = true;

function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#017be5" barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Doctor"
          component={Doctor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorList"
          component={DoctorList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cancel"
          component={Cancel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Reschedule"
          component={Reschedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Upcoming"
          component={Upcoming}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="DoctorHome"
          component={DoctorHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DoctorAppointments"
          component={DoctorAppointments}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
