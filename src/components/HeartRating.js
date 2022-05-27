import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeartItem from './HeartItem'
import { useAuth } from '../context/AuthContext'
import { confirmUserRating } from '../api/api'
import { CheckCircle } from 'phosphor-react-native'

const HeartRating = ({ previousRating, onRate, style }) => {
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
        <View style={[style, styles.container]}>
            {hearts}
            {rating && !confirmed
                ? 
                <TouchableOpacity
                    onPress={async () => {
                        await confirmUserRating(currentUser, rating)
                            .then(() => {
                                setConfirmed(true)
                                onRate()
                            })
                    }}
                >
                    <CheckCircle color={'green'} size={50} />
                </TouchableOpacity>
                : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default HeartRating