import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, } from 'react-native';

export default class RequestAppointmentView extends React.Component {
    static navigationOptions = {
        title: 'RequestAppointmentView',
        header: null,
    }
    constructor(props) {
        super(props);
        var {params} = this.props.navigation.state;
        this.state = {
            firstName: params.firstName,
            lastName: params.lastName,
            username: params.username,
            doctorUsername: "",
            description: "",
            apptTime: "",
            apptDate: "",
        };
    }
    submitRequestPress(username, appointmentInfo) {
        Keyboard.dismiss();
        try {
            const myRequest = new Request('http://YOURIPHERE/apptapp/Controller/RequestAppointmentController.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    'username': username,
                    'appointmentInfo': appointmentInfo
                })
            });
            fetch(myRequest)
        }
        catch(error) {
            alert("Couldn't Request Appointment");
            console.log(error);
            return;
        }
        var {params} = this.props.navigation.state
        var {navigate} = this.props.navigation.
        navigate("PatientView", params);
    }
    buildAppointmentInfo() {
        result = "";
        result += this.state.apptDate + ",";
        result += this.state.apptTime + ",";
        result += this.state.description + ",";
        result += this.state.doctorUsername + ",";
        return result;
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.header}>Appointment Request</Text>
                <TextInput
                    style={styles.applicationForm}                
                    placeholder="Doctor's Username"
                    onChangeText= {doctorUsername => this.setState({doctorUsername: doctorUsername})}
                />
                <TextInput
                    style={styles.applicationForm}               
                    placeholder="Description"
                    onChangeText= {description=> this.setState({description: description})}
                />
                <TextInput
                    style={styles.applicationForm}                
                    placeholder="Time"
                    onChangeText= {apptTime => this.setState({apptTime: apptTime})}
                />
                <TextInput
                    style={styles.applicationForm}                
                    placeholder="Date: YYYY-MM-DD"
                    onChangeText= {apptDate => this.setState({apptDate: apptDate})}
                />
                <Button 
                    color='#000051'
                    title="Submit Request"
                    style={styles.bottomButton}
                    onPress={() => this.submitRequestPress(this.state.username, this.buildAppointmentInfo())}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#534bae',
        alignItems: 'center',
    },
    header: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 48,
        marginBottom: 10,
        backgroundColor: '#000051',
        color: 'white',
    },
    applicationForm: {
        fontSize: 28,
        width: '80%',
        color: 'white',
        marginBottom: 40,
    },
    picker: {
        width: '80%',
        color: 'white',
        marginBottom: 40,
        borderWidth: 1,
    },
    bottomButton: {
        justifyContent: 'space-between',
    }
});