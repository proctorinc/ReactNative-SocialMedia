import React, { useState, useEffect } from 'react'
import { Text, Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore'
import ScaledImage from '../components/ScaledImage';
import { Trophy, Heart, User } from 'phosphor-react-native'
import UserRatings from '../components/UserRatings';

const Tab2 = () => {
    const [winnerStats, setWinnerStats] = useState({
        uri: '',
        placement: 1,
        averageRating: 4.8,
    })

    const getTodaysImage = () => {
        firestore().collection('images')
            .where('date', '==', new Date().toLocaleDateString())
            .limit(1)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snapshot => {
                    console.log('Image Date: ' + snapshot.data().date)
                    setWinnerStats({ ...winnerStats, uri: snapshot.data().url })
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
            <Text style={styles.title}>Weekly Gerth's</Text>
            <Text style={styles.text}>May 10th-16th</Text>
            {!winnerStats.uri
                ? <Image source={{ uri: '../../assets/images/adaptive-icon.png' }} style={styles.image} />
                : <ScaledImage uri={winnerStats.uri} style={styles.image} />}
            <View style={styles.statview}>
                <View style={styles.stat}>
                    <Trophy size={64} color={'#FFD84E'} weight={'fill'} />
                    <Text style={styles.stattext}>#{winnerStats.placement}</Text>
                </View>
                <View style={styles.stat}>
                    <Heart size={64} color={'#FD8D8D'} weight={'fill'} />
                    <Text style={styles.stattext}>{winnerStats.averageRating}</Text>
                </View>
            </View>
            <UserRatings />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Light',
    },
    text: {
        fontSize: 18,
        // paddingBottom: 15,
        padding: 10
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
        backgroundColor: 'red'
    },
    statview: {
        flexDirection: 'row'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    stattext: {
        position: 'absolute',
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
    },
    userRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 5,
    },
    userRatingText: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    }
});

export default Tab2