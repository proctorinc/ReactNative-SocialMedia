import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Share } from 'react-native'
import HeartRating from '../../components/HeartRating';
import ScaledImage from '../../components/ScaledImage';
import { Export } from 'phosphor-react-native';
import { getUserRating, getImage } from '../../api/api'
import { useDailyContext } from '../../context/DailyContext';
import { useAuth } from '../../context/AuthContext';

const Daily = () => {
    const { myRating, dailyImage, imageLoaded, ratingLoaded, refreshUserRating } = useDailyContext()
    const { currentUser } = useAuth()

    const onShare = async () => {
        /* react-native-share for image */
        const heart = '❤'
        try {
          const result = await Share.share({
            message:
              heart.repeat(myRating),
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      }

      const setImageURL = () => {
        currentUser.updateProfile({
            photoURL: 'gs://thedailygerth.appspot.com/profile-picture/B064CCDC-478D-4B94-A317-DCCB84B9DC9C.jpeg'
        })
      }

    useEffect(() => {
        // const subscriber = getImageAndRating()
        // return () => subscriber()
        
        setImageURL()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Today's Daily Gerth</Text>
                <Text style={styles.text}>{new Date().toDateString()}</Text>
            </View>
            {!imageLoaded
                ? <Text>Loading...</Text>
                : <View style={styles.imageView}>
                    <ScaledImage uri={dailyImage.url} style={styles.image} />
                    {!myRating
                    ? null
                    : <TouchableOpacity
                        style={styles.shareIcon}
                        onPress={() => onShare()}
                    >
                        <Export color={'#ffcfcf'} size={24} />
                    </TouchableOpacity>}
                </View>}
            {!ratingLoaded
            ? <Text>Loading</Text>
            : <HeartRating style={styles.rating} previousRating={myRating} onRate={refreshUserRating}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'column',
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Light',
    },
    text: {
        fontSize: 18,
    },
    image: {
        width: '100%',
        height: undefined,
    },
    shareIcon: {
        backgroundColor: '#FD8D8D',
        position: 'absolute', 
        bottom: 20,
        right: 20,
        borderRadius: 100,
        padding: 10,
        // opacity: 0.8,
    },
    rating: {
        flexGrow: 1
    }
});

export default Daily