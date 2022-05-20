import { BackgroundImage } from '@rneui/base';
import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { useAuth } from '../../context/AuthContext';

const Signup = ({ navigation }) => {
    const { error, handleSignup, resetError } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            {error
                ? <Text style={styles.errorText}>{error}</Text>
                : null}
            <TextInput
                placeholder="Username"
                autoCapitalize="none"
                style={styles.textInput}
                value={username}
                onChangeText={username => setUsername(username)}
            />
            <TextInput
                placeholder="Email"
                autoCapitalize="none"
                style={styles.textInput}
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                secureTextEntry
                placeholder="Password"
                autoCapitalize="none"
                style={styles.textInput}
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <TextInput
                secureTextEntry
                placeholder="Confirm Password"
                autoCapitalize="none"
                style={styles.textInput}
                value={confirmPassword}
                onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleSignup(username, email, password, confirmPassword )}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    resetError()
                    navigation.navigate('Login')
                }}
            >
                <Text>Already have an account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'lightgray',
        borderColor: 'white'
    },
    title: {
        fontSize: 50,
        paddingBottom: 20,
        marginTop: -20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'lightblue',
        borderRadius: 10,
        marginVertical: 20,
        textAlign: 'center',
    },
    buttonText: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20
    },
    errorText: {
        padding: 10,
        width: '90%',
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
        backgroundColor: 'lightpink',
        borderColor: 'red',
        textAlign: 'center',
        color: 'red',
    }
})

export default Signup