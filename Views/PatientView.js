import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, } from 'react-native';

export default class PatientView extends React.Component{
    static navigationOptions = {
        title: "PatientView",
        header: null,
    };
    constructor(props) {
        super(props);
        var {params} = this.props.navigation.state;
        this.state = {
            firstName: params.firstName,
            lastName: params.lastName,
            age: params.age,
            address: params.address,
            username: params.username,
            info: "",
        };
    }
    handleControllerRequest(request, credential) {
        try {
            const myRequest = new Request('http://YOURIPHERE/apptapp/Controller/PatientController.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify ({
                    'command': request,
                    'credential': credential
                })
            });
            return fetch(myRequest)
            .then((response) => response.json())
                .then((res) => {
                    this.setState({
                        info: res
                    });
                });
        }
        catch(error) {
            console.log(error);
        }
    }
    handleRequestAppointmentPress() {
        var {navigate} = this.props.navigation;
        navigate("RequestAppointmentView", this.state);
    }
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.header}>{this.state.firstName + " " + this.state.lastName}</Text>
                <PersonalDetails age={this.state.age} address={this.state.address}/>
                <Text style={styles.informationHeader}>Information:</Text>
                <Information info={this.state.info}/>
                <BottomButtons 
                    listingPress={() => this.handleControllerRequest('getDoctorListing', "")}
                    pastPress={() => this.handleControllerRequest('getPastAppointments', this.state.username)}
                    requestPress={() => this.handleRequestAppointmentPress()}
                />
            </View>
        );
    }
}

class PersonalDetails extends React.Component {
    render() {
        return (
            <View style={styles.basicContainer}>
                <Text style={styles.personalDetails}>Age: {this.props.age}</Text>
                <Text style={styles.personalDetails}>Address: {this.props.address}</Text>
            </View>
        );
    }
}

class Information extends React.Component {
    parseInfoJson(info) {
        let result = "";
        Object.entries(info).forEach(
            ([key, value]) => {
                Object.entries(value).forEach(
                    ([key, value]) => {
                        result += key + ": " + value + "\n";
                    }
                );
                result += '\n';
            }  
        );
        return result
    }
    render() {
        return (
            //Figure how to use FlatList if time permits
            <ScrollView style={styles.basicContainer}>
                <Text style={styles.informationContent}>{this.parseInfoJson(this.props.info)}</Text>
            </ScrollView>
        );
    }
}

class BottomButtons extends React.Component {
    render() {
        return (
            <View style={styles.bottomButtonContainer}>
                <Button
                    color='#000051'
                    title='View Doctor Listing'
                    onPress={this.props.listingPress}
                />
                <Button
                    color='#000051'
                    title='View Appointments'
                    onPress={this.props.pastPress}
                />
                <Button
                    color='#000051'
                    title='Request Appointment'
                    onPress={this.props.requestPress}
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
    },
    header: {
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 48,
        marginBottom: 10,
        backgroundColor: '#000051',
        color: 'white',
    },
    informationHeader: {
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
    informationContent: {
        fontSize: 24,
        color: 'white',
        padding: 5,
    }
})