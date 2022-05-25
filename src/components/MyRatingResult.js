import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Heart } from 'phosphor-react-native'
import HeartItem from './HeartItem'
import HeartNumber from './HeartNumber'
import { getUserRating } from '../api/api'

const MyRatingResult = () => {
    const { currentUser } = useAuth()
    const [rating, setRating] = useState(0)
    const [hearts, setHearts] = useState([])

    const fetchRating = async () => {
        await getUserRating(currentUser, new Date())
            .then((rating) => {
                setRating(rating)
                // setRatingLoaded(true)
                for (let i = 0; i < rating; i++) {
                    setHearts(old => [...old, <HeartItem key={i} value={1} rating={1} />])
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchRating()
    }, [])

  return (
    <View style={styles.container}>
        <Text style={styles.header}>My Rating:</Text>
        {rating == 0
        ? <Text>No Rating yet</Text>
        :<View style={styles.ratingView}>
            <HeartNumber value={rating} size={100}/>
        </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {

    },
    ratingView: {
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 18,
        fontFamily: 'Poppins-Light',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
})

export default MyRatingResult