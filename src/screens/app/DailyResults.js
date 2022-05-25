import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import UserProfileHeader from '../../components/UserProfileHeader'
import UserRatings from '../../components/UserRatings'
import MyRatingResult from '../../components/MyRatingResult'
import { useAuth } from '../../context/AuthContext'

const DailyResults = () => {
    const { currentUser } = useAuth()
    const date = new Date().toLocaleDateString().replace(/\//g, '-')
  return (
    <View style={styles.container}>
      <UserProfileHeader username={currentUser.displayName} />
      <MyRatingResult />
      <UserRatings date={date} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})

export default DailyResults