import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'
import HeartRating from '../components/HeartRating';
import ScaledImage from '../components/ScaledImage';

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
    }, [])

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Today's Daily Gerth</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            {!image
                ? <Image source={{ uri: '../../assets/images/adaptive-icon.png' }} style={styles.image} />
                : <ScaledImage uri={image.url} style={styles.image} />}
            <HeartRating style={styles.rating} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Light',
    },
    text: {
        fontSize: 18,
        paddingBottom: 15,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
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
        // position: 'absolute',
        // bottom: 0,
        // alignSelf: 'flex-end'
        // flex: 1,
        backgroundColor: 'red'
    }
});

export default Tab2