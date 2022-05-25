import { View, StyleSheet, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartItem from './HeartItem'
import { useAuth } from '../context/AuthContext'
import { confirmUserRating } from '../api/api'

const HeartRating = ({ previousRating }) => {
    const { currentUser } = useAuth()
    const [rating, setRating] = useState(previousRating)
    const [confirmed, setConfirmed] = useState(true)
    const hearts = []

    const handleHeartPress = (value) => {
        if (!confirmed) {
            setRating(value)
        } else {
            alert('You already rated today')
        }
    }

    for (let i = 1; i <= 5; i++) {
        hearts.push(<HeartItem key={i} value={i} rating={rating} onPress={handleHeartPress} confirmed={confirmed} />)
    }

    useEffect(() => {
        if (previousRating == 0) {
            setConfirmed(false)
        }
    }, [rating])

    return (
        <ScrollView>
            <View style={styles.container}>
                {hearts}
            </View>
            {rating && !confirmed
                ? <Button
                    title={'Confirm Rating'}
                    onPress={async () => {
                        await confirmUserRating(currentUser, rating)
                        setConfirmed(true)
                    }}
                    />
                : null}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
})

export default HeartRating