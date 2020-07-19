import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';

export default class RegisterUser extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            error: null,
        };
        this.resetStates = this.resetStates.bind(this)
    }

    resetStates(){
        this.setState({
            name: '',
            email: '',
            password: '',
            error: null,
        })
        console.log("efjfrj frf")
    }

    RegisterUserToFirebase = async() => {

        const { email, password, name } = this.state;

        if (email==='' || password==='' || name==='')
        {
            this.setState({
                error : "Enter details."
            })
        }
        else
        {
            this.props.navigation.navigate(
                'User Type', {
                    email : email,
                    name : name,
                    password : password,
                    resetStates : this.resetStates
                }
            )
        }

    }

    render(){
        return(
            <View style = {styles.container}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Name"
                    onChangeText={name => this.setState({ name })}
                    value={this.state.name}
                />
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                />
                <TextInput
                    secureTextEntry
                    style={styles.textInput}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={password => this.setState({ password })}
                    value={this.state.password}
                />
                { this.state.error ?
                    <Text style={styles.errorMessage}>
                        {this.state.error}
                    </Text> : <Text/>}

                <Button style={styles.buttonMessage} title="Continue" onPress={this.RegisterUserToFirebase} />

                <Text
                    style = {styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}
                >
                    Already have an account? Login
                </Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    textInput: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    errorMessage: {
        color: 'red',
        marginBottom: 15,
        paddingTop : 10,
        paddingBottom: 10,
    },
    buttonMessage: {
        marginTop: 15
    }
});
