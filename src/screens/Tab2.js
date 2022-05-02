import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Rating } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

// const getTodaysImage = () => {
//     const today = new Date().toDateString()
//     const image = firestore().collection('images').doc('TpJi4kKB2dfUO8WvDSmd').get()
//     // .where('showDate', '==', today)
//     // .get()
//     console.log("IMAGE: " + image)
//     console.log("IMAGE ID: " + image.id)
//     console.log("IMAGE Date: " + image.showDate)
// }

const Tab2 = () => {
    // const [image, setImage] = useState()

    // useEffect(() => {
    //     getTodaysImage()
    // }, [])

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Today's Daily Gerth</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            <Image
                style={styles.image}
                source={require('../../assets/20211211_194448.jpg')}
                // source={require('../../assets/beach.jpg')}
                resizeMethod='scale'
            />
            <Rating
                style={styles.rating}
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
        width: '100%',
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

export default Tab2