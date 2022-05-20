import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'
import { Heart } from 'phosphor-react-native';

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
            <Heart color='#FD8D8D' weight='duotone' />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
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