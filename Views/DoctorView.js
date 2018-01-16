import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

export default class DoctorView extends React.Component {
    static navigationOptions = {
        title: "DoctorView",
        header: null,
    };
    constructor(props) {
        super(props);
        var {params} = this.props.navigation.state; //props from LoginView.js
        this.state = {
            firstName: params.firstName,
            lastName: params.lastName,
            age: params.age,
            address: params.address,
            username: params.username,
            appointments: "",
        };
        this.getAppointments('getAppointments')
    }
    getAppointments(request) {
        try {
            const myRequest = new Request('http://192.168.1.2/apptapp/Controller/DoctorController.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    'command': request,
                    'username': this.state.username,
                })
            });
            return fetch(myRequest)
            .then((response) => response.json())
                .then((res) => {
                    this.setState({
                        appointments: res
                    });
                });
        }
        catch(error) {
            alert("Couldn't Access User Data");
            console.log(error);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>{this.state.firstName + " " + this.state.lastName}</Text>
                <Text style={styles.appointmentHeader}>Appointments:</Text>
                <Appointments appointments={this.state.appointments}/>
            </View>
        );
    }
}

class Appointments extends React.Component {
    parseAppointmentJson(appointments) {
        //If changed to FlatList, this will need to be an associate array
        let result = "";
        Object.entries(appointments).forEach(
            ([key, value]) => {
                Object.entries(value).forEach(
                    ([key, value]) => {
                        result += key + ": " + value + "\n";
                    }
                );
                result += '\n';
            }  
        );
        if (result == "") {
            return "No Appointments"
        }
        return result;
    }
    render() {
        return (
            //Figure how to use FlatList if time permits
            <ScrollView style={styles.basicContainer}>
                <Text style={styles.appointmentContent}>{this.parseAppointmentJson(this.props.appointments)}</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#534bae',
    },
    header: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 48,
        marginBottom: 10,
        backgroundColor: '#000051',
        color: 'white',
    },
    appointmentHeader: {
        fontSize: 30,
        textAlign: 'center',
        color: 'white',
    },
    basicContainer: {
        borderWidth: 4,
        borderColor: '#000051',
        marginBottom: 10,
    },
    personalDetails: {
        fontSize: 30,
        color: 'white',
    },
    bottomButtonsContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    appointmentContent: {
        fontSize: 24,
        color: 'white'
    }
})