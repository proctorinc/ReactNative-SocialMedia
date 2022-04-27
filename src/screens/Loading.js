// Loading.js
import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

const Main = ({ navigation }) => {
    useEffect(() => {
        auth().onAuthStateChanged(user => {
            navigation.navigate(user ? 'Main' : 'Login')
        })
    }, [])

    return (
        <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
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

export default Main