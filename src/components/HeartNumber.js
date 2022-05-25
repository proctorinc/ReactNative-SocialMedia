import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Heart } from 'phosphor-react-native'

const HeartNumber = ({value, size}) => {
  return (
    <View style={styles.container}>
      <Heart size={size} color={'#FD8D8D'} weight={'fill'} />
      <Text style={[{fontSize: size / 2}, styles.number]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    number: {
        position: 'absolute',
    }
})

export default HeartNumber