import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { Rating, AirbnbRating } from '@rneui/themed';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Tab2 = () => {
    return (
        <SafeAreaView style={styles.view}>
            <Text style={styles.title}>The Daily Gerth</Text>
            <Image
                style={styles.image}
                source={require('../../assets/20211211_194448.jpg')}
                // source={require('../../assets/beach.jpg')}
                resizeMode='contain'
            />
            <Rating
                style={styles.rating}
                type='heart'
                startingValue={3}
                onFinishRating={console.log('ok')}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        // textAlign: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        height: '100%',
        padding: 10,
        alignItems: 'center',
        // backgroundColor: 'black',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        padding: 5,
    },
    text: {
        fontSize: 30,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
        // aspectRatio: 1,
        aspectRatio: 3 / 4
    },
    button: {
        fontSize: 30,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 15,
        marginTop: 10
    },
    rating: {
        padding: 25,
        transform: [{ scale: 1.5 }]
    }
});

export default Tab2