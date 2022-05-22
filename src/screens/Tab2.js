import React, { useState, useEffect } from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'
import HeartRating from '../components/HeartRating';
import ScaledImage from '../components/ScaledImage';
import { useAuth } from '../context/AuthContext';
import UserRatings from '../components/UserRatings';

const Tab2 = () => {
    const { currentUser } = useAuth()
    const [image, setImage] = useState(null)
    const [rating, setRating] = useState(0)

    const getTodaysImage = () => {
        firestore()
            .collection('images')
            .where('date', '==', new Date().toLocaleDateString())
            .limit(1)
            // .onSnapshot(documentSnapshot => {
            //     if (documentSnapshot) {
            //         console.log(documentSnapshot)
            //         setImage(documentSnapshot.data())
            //     }
            // })
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snapshot => {
                    // console.log('Image Date: ' + snapshot.data().date)
                    setImage(snapshot.data())
                })
            }).catch((err) => {
                console.log(err)
            })
    }

    const getRating = () => {
        const today = new Date().toLocaleDateString().replace(/\//g, '')
        console.log(today)
        firestore()
            .collection('ratings')
            .doc(currentUser.uid + '_' + today)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setRating(documentSnapshot.data().rating)
                } else {
                    // console.log('NOPE')
                }
            })
    }

    useEffect(() => {
        const subscriber = getTodaysImage()
        getRating()
        return () => subscriber();
    }, [])

    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>Today's Daily Gerth</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            {!image
                ? <Image source={{ uri: '../../assets/images/adaptive-icon.png' }} style={styles.image} />
                : <ScaledImage uri={image.url} style={styles.image} />}
            {!rating
            ? <HeartRating style={styles.rating} />
            : <View style={{ height: '30%' }}>
                <Text>Next Rating in: 10 hours 34 minutes</Text>
                <UserRatings />
            </View>}
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