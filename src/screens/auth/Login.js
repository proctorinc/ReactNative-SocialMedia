import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import { useAuth } from '../../context/AuthContext'

const Login = ({ navigation }) => {
    const { handleLogin, error, resetError } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error ?
                <Text style={styles.errorText}>
                    {error}
                </Text> : null}
            <TextInput
                style={styles.textInput}
                value={email}
                autoCapitalize="none"
                placeholder="Email"
                onChangeText={email => setEmail(email)}
            />
            <TextInput
                secureTextEntry
                style={styles.textInput}
                value={password}
                autoCapitalize="none"
                placeholder="Password"
                onChangeText={password => setPassword(password)}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => handleLogin({ email, password })}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    resetError()
                    navigation.navigate('Signup')
                }}
            >
                <Text>Don't have an account? Sign Up</Text>
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
        borderColor: 'white',
    },
    title: {
        fontSize: 50,
        paddingBottom: 20,
        // marginTop: -20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 40,
        border: 1,
        borderColor: 'gray',
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

export default Login