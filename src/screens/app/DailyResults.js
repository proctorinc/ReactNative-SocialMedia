import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import UserProfileHeader from '../../components/UserProfileHeader'
import UserRatings from '../../components/UserRatings'
import { useAuth } from '../../context/AuthContext'
import HeartNumber from '../../components/HeartNumber'
import { useDailyContext } from '../../context/DailyContext'

const DailyResults = () => {
    const { currentUser } = useAuth()
    const { myRating } = useDailyContext()

    const date = new Date().toLocaleDateString().replace(/\//g, '-')

    useEffect(() => {
      console.log('Rating Changed: ' + myRating)
    }, [myRating])
  return (
    <View style={styles.container}>
      <UserProfileHeader username={currentUser.displayName} />
      <View style={styles.ratingContainer}>
        <Text style={styles.header}>My Rating:</Text>
        <View style={styles.ratingView}>
            {myRating == 0
            ? <Text style={styles.text}>No Rating yet</Text>
            : <HeartNumber value={myRating} size={100}/>}
        </View>
      </View>
      <UserRatings date={date} rating={myRating} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      padding: 10,
      height: '100%'
  },
  ratingContainer: {
    height: '20%',
  },
  ratingView: {
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
  },
  header: {
      fontSize: 18,
      fontFamily: 'Poppins-Light',
      padding: 5,
      borderBottomWidth: 1,
      borderColor: '#d6d6d6',
  },
  text: {
      fontSize: 14,
      fontFamily: 'Poppins-Light',
  }
})

export default DailyResults