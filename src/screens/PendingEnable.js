import React, { useEffect } from 'react'
import { View, Button, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { useAuth } from '../context/AuthContext'
import auth from '@react-native-firebase/auth'

const PendingEnable = ({ navigator }) => {
    const { currentUser, handleLogout, reload } = useAuth()

    const reloadUserCheck = async () => {
        reload()
        auth().onIdTokenChanged(() => {
            if (currentUser && currentUser.emailVerified) {
                navigator.navigate('Home')
            }
        })
    }

    useEffect(() => {
        reloadUserCheck()
    })

    return (
        <View style={styles.container}>
            <Text>Waiting for email confirmation</Text>
            <ActivityIndicator size="large" />
            <Button
                title="Resend Email"
                onPress={() => {
                    currentUser.sendEmailVerification()
                }} />
            <Button
                title="Return"
                onPress={() => handleLogout()} />

            <Text>{currentUser.enabled}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PendingEnable