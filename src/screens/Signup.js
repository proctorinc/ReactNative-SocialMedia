import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import auth from '@react-native-firebase/auth'

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = () => {
        if (password && confirmPassword) {
            if (password === confirmPassword) {
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => navigation.navigate('Main'))
                    .catch(err => {
                        // setError(err.message)
                        if (err.code === 'auth/invalid-email') {
                            setError('Enter a valid email address')
                        } else if (err.code === 'auth/weak-password') {
                            setError('Invalid password. Password should be at least 6 characters')
                        } else {
                            setError('Error creating account.')
                        }
                    })
            } else {
                setError('Passwords do not match')
            }
        } else {
            setError('Enter email, password, and confirm password')
        }
    }

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            {error ?
                <Text style={{ color: 'red' }}>
                    {error}
                </Text> : null}
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
            <Button title="Sign Up" onPress={() => handleSignUp()} />
            <Button
                title="Already have an account? Login"
                onPress={() => navigation.navigate('Login')}
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

export default Signup