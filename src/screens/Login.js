import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useAuth } from '../context/AuthContext'

const Login = ({ navigation }) => {
    const { handleLogin, error, resetError } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
            <Button title="Login" onPress={() => handleLogin({ email, password })} />
            <Button
                title="Don't have an account? Sign Up"
                onPress={() => {
                    resetError()
                    navigation.navigate('Signup')
                }}
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
        marginTop: 8,
        borderRadius: 10,
        paddingLeft: 10
    }
})

export default Login