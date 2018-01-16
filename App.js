import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginView from './Views/LoginView.js';
import DoctorView from './Views/DoctorView.js';
import PatientView from './Views/PatientView.js';
import RequestAppointmentView from './Views/RequestAppointmentView.js'

const Navigation = StackNavigator({
    LoginView: {screen: LoginView},
    DoctorView: {screen: DoctorView},
    PatientView: {screen: PatientView},
    RequestAppointmentView: {screen: RequestAppointmentView},
})

export default Navigation;