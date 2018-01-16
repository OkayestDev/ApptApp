import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';

export default class LoginView extends React.Component {
    static navigationOptions = {
        title: 'LoginView',
        header: null,
    }
    constructor(props) {
        super(props);
        this.state = {
            //Besure to change to "" after dev, 
            username: "patient",
            password: "patient",
        }
    }
    parseJsonForUserInfo(res) {
        userInfo = {
            'age': res.age,
            'address': res.address,
            'lastName': res.lastName,
            'firstName': res.firstName,
            'username': this.state.username,
        };
        return userInfo;
    }
    launchAppropriateView(res) {
        Keyboard.dismiss();
        var {navigate} = this.props.navigation;
        if (res.doctorStatus == "doctor") {
            //launch doctor view
            navigate("DoctorView", this.parseJsonForUserInfo(res));
        }
        else if (res.doctorStatus == "patient") {
            //launch patient view
            navigate("PatientView", this.parseJsonForUserInfo(res));
        }
        else {
            alert(res.errorCode);
        }
    }
    handleLoginPress = () => {
        try {
            const myRequest = new Request('http://YOURIPHERE/apptapp/Controller/LoginController.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                })
            });
            fetch(myRequest)
            .then((response) => response.json())
                .then((res) => {
                    this.launchAppropriateView(res);
                });
        }
        catch(error) {
            console.log(error);
        }
    }
     render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    ApptApp
                </Text>
                <View>
                    <TextInput 
                        style={styles.credential} 
                        autoFocus={true} 
                        placeholder="Enter Username"
                        onChangeText= {username => this.setState({username: username})}
                    />
                    <TextInput 
                        style={styles.credential} 
                        secureTextEntry={true} 
                        placeholder="Enter Password"
                        onChangeText= {password => this.setState({password: password})}
                    />
                </View>
                <Button 
                    color= '#000051'
                    onPress={this.handleLoginPress}
                    title="Login"
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
        fontSize: 54,
        marginBottom: 40,
        backgroundColor: '#000051',
        color: 'white',
    },
    credential: {
        height: 60,
        fontSize: 28,
        marginBottom: 40,
        color: 'white',
    },
 });