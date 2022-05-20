import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Rating } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'

const Tab2 = () => {
    const [image, setImage] = useState()

    const getTodaysImage = () => {
        firestore().collection('images')
            .where('date', '==', new Date().toLocaleDateString())
            .limit(1)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snapshot => {
                    console.log('Image Date: ' + snapshot.data().date)
                    setImage(snapshot.data())
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getTodaysImage()
        // console.log(new Date().toLocaleDateString())
    }, [])

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Today's Daily Gerth</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            {!image
                ? <Text>No Image Available</Text>
                : <Image
                    style={styles.image}
                    source={{ uri: image.url }}
                    resizeMethod='scale'
                />}

            {/* <Rating
                style={styles.rating}
            /> */}
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