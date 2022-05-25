import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User, Heart } from 'phosphor-react-native'
import { Avatar } from '@rneui/base'
import firestore from '@react-native-firebase/firestore'
import HeartNumber from './HeartNumber'

const UserRatings = ({ date, style }) => {
    const [ratings, setRatings] = useState([])

    const getRatings = () => {
        setRatings([])
        firestore()
            .collection(String(date))
            .orderBy('rating', 'desc')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(async snapshot => {
                    const user = await firestore()
                        .collection('users')
                        .doc(snapshot.id)
                        .get()
                    setRatings(old => [...old, {username: user.data().username, rating: snapshot.data().rating}])
                })
            })
    }

    useEffect(() => {
        getRatings()
    }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.header}>User Ratings:</Text>
        <FlatList
            style={styles.list}
            data={ratings}
            renderItem={({ item }) => {
                return (
                    <View style={styles.userRating}>
                        <Avatar
                            size="medium"
                            title={item.username.substring(0, 2).toUpperCase()}
                            rounded
                            overlayContainerStyle={{ backgroundColor: 'gray' }}
                        />
                        <Text style={styles.text}>{item.username}</Text>
                        <HeartNumber size={50} value={item.rating} />
                    </View>
                )
            }}
            keyExtractor={item => item.username}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
    },
    header: {
        fontSize: 18,
        fontFamily: 'Poppins-Light',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    text: {
        fontSize: 18,
        padding: 10
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
    },
    userRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    userRatingText: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    }
});

export default UserRatings