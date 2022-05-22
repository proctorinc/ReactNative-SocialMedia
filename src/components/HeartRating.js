import { View, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartItem from './HeartItem'
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '../context/AuthContext'

const HeartRating = () => {
    const { currentUser } = useAuth()
    const [rating, setRating] = useState(0)
    const [confirmed, setConfirmed] = useState(false)
    // const [hearts, setHearts] = useState([])
    const hearts = []

    for (let i = 1; i <= 5; i++) {
        hearts.push(<HeartItem key={i} value={i} rating={rating} setRating={setRating} confirmed={confirmed} />)
    }

    const confirmRating = () => {
        const today = new Date().toLocaleDateString().replace(/\//g, '')
        setConfirmed(true)
        firestore()
            .collection('ratings')
            .doc(currentUser.uid + '_' + today)
        .set({
            rating: rating
        })
        .then(() => {
            console.log('Rating added');
        })
    }

    useEffect(() => {
        console.log(rating)
    }, [rating])

    return (
        <View>
            <View style={styles.container}>
                {hearts}
            </View>
            {rating && !confirmed
                ? <Button
                    title={'confirm rating'}
                    onPress={() => confirmRating()}
                    />
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
})

export default HeartRating