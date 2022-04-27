import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import auth from '@react-native-firebase/auth'

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = () => {
        if (email && password) {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => navigation.navigate('Main'))
                .catch(err => {
                    if (err.code === 'auth/invalid-email') {
                        setError('Enter a valid email address')
                    } else {
                        setError('Invalid email or password')
                    }
                })
        } else {
            setError('Enter email and password')
        }
    }

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            {error ?
                <Text style={{ color: 'red' }}>
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
            <Button title="Login" onPress={() => handleLogin()} />
            <Button
                title="Don't have an account? Sign Up"
                onPress={() => navigation.navigate('Signup')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})

export default Login