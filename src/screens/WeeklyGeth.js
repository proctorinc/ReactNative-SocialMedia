import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

const WeeklyGerth = () => {

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Weekly Gerth Results</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            <Image
                style={styles.image}
                source={require('../../assets/images/20211211_194448.jpg')}
                resizeMethod='scale'
            />
            <Image
                style={styles.image}
                source={require('../../assets/images/20211211_194448.jpg')}
                resizeMethod='scale'
            />
            <Image
                style={styles.image}
                source={require('../../assets/images/20211211_194448.jpg')}
                resizeMethod='scale'
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        // textAlign: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        height: '100%',
        padding: 10,
        alignItems: 'center',
        // backgroundColor: 'black',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        padding: 5,
    },
    text: {
        fontSize: 20,
    },
    image: {
        borderRadius: 10,
        width: '33%',
        height: undefined,
        // aspectRatio: 1,
        aspectRatio: 3 / 4
    },
    button: {
        fontSize: 30,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 15,
        marginTop: 10
    },
    rating: {
        padding: 25,
        transform: [{ scale: 1.5 }]
    }
});

export default WeeklyGerth