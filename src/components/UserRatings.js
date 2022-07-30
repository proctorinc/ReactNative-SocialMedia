import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@rneui/base'
import firestore from '@react-native-firebase/firestore'
import HeartNumber from './HeartNumber'
import { LockKey } from 'phosphor-react-native'
import { fetchAllRatings } from '../api/api'

const UserRatings = ({ date, rating }) => {
    const [ratings, setRatings] = useState([])

    const fetchUserRatings = async () => {
        await fetchAllRatings(date)
            .then((userRatings) => {
                console.log(userRatings)
                setRatings(userRatings)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchUserRatings()
    }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.header}>User Ratings:</Text>
        {rating == 0
            ? <View style={styles.ratingView}>
                <View style={styles.roundContainer}>
                    <LockKey size={64} weight={'light'}/>
                    <Text style={styles.noRatingText}>Rate today's Gerth</Text>
                    <Text style={styles.noRatingText}>to see other ratings</Text>
                </View>
            </View>
            : <FlatList
                style={styles.list}
                data={ratings}
                renderItem={({ item }) => {
                    return (
                        <View>
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
                        </View>
                    )
                }}
                keyExtractor={item => item.username}
            />}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // padding: 10,
        flexGrow: 1,
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
        padding: 10,
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
    },
    noRatingText: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
    },
    ratingView: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
    },
    roundContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000,
        backgroundColor: 'lightgray',
        padding: 20,
        height: 200,
        width: 200,
    }
});

export default UserRatings