import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import HeartItem from './HeartItem'

const HeartRating = () => {
    const [rating, setRating] = useState(3)
    const hearts = []

    for (let i = 1; i <= 5; i++) {
        hearts.push(<HeartItem key={i} value={i} rating={rating} setRating={setRating} />)
    }

    return (
        <View style={styles.container}>
            {hearts}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
})

export default HeartRating