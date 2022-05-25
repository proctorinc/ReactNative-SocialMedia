import React, { useEffect } from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

const SplashScreen = ({ navigation }) => {

    return (
        <View style={styles.container}>
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

export default SplashScreen