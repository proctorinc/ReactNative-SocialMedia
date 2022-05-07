import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { useAuth } from '../context/AuthContext';

// const isUnique = async (displayName) => {
//     const users = firestore().collection("users").get()
//     console.log("users: " + JSON.stringify(decycle(users)))
//     try {
//         const nameDoc = await users.where("displayName", "==", displayName).get()
//         // return !nameDoc.exists
//         console.log("Exists? " + !nameDoc.exists)
//         return !nameDoc.exists
//     } catch (e) {
//         console.log("Error: " + e)
//         return false
//     }
//     return true
// }

const Signup = ({ navigation }) => {
    const { error, handleSignup, resetError } = useAuth()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <View style={styles.container}>
            <Text>Sign Up</Text>
            {error ?
                <Text style={{ color: 'red' }}>
                    {error}
                </Text> : null}
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
            <Button title="Sign Up" onPress={() => handleSignup({ username, email, password, confirmPassword })} />
            <Button
                title="Already have an account? Login"
                onPress={() => {
                    resetError()
                    navigation.navigate('Login')
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
        marginTop: 8
    }
})

export default Signup