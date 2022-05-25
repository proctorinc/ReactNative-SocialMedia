import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import HeartRating from '../../components/HeartRating';
import ScaledImage from '../../components/ScaledImage';
import { useAuth } from '../../context/AuthContext';
import { ShareNetwork } from 'phosphor-react-native';
import { getUserRating, getImage } from '../../api/api'

const Daily = () => {
    const { currentUser } = useAuth()
    const [image, setImage] = useState(null)
    const [rating, setRating] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [ratingLoaded, setRatingLoaded] = useState(false)

    const getImageAndRating = async () => {
        const today = new Date()
        await getImage(today)
            .then((image) => {
                setImage(image)
                setImageLoaded(true)
            })
            .catch((err) => {
                console.log(err)
            })
        await getUserRating(currentUser, today)
            .then((rating) => {
                setRating(rating)
                setRatingLoaded(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getImageAndRating()
        // return () => subscriber();
    }, [])

    return (
        <View style={styles.view}>
            <Text style={styles.title}>Today's Daily Gerth</Text>
            <Text style={styles.text}>{new Date().toDateString()}</Text>
            {!imageLoaded
                ? <Text>Loading...</Text>
                : <View>
                    <ScaledImage uri={image.url} style={styles.image} />
                    <TouchableOpacity
                        style={styles.iconOnImage}
                        onPress={() => console.log('Share!')}
                    >
                        <ShareNetwork color={'#111'} size={32} />
                    </TouchableOpacity>
                </View>}
            {!ratingLoaded
            ? <Text>Loading</Text>
            : <HeartRating style={styles.rating} previousRating={rating}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4', //#121212
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Light',
    },
    text: {
        fontSize: 18,
        // paddingBottom: 15,
    },
    image: {
        width: '100%',
        height: undefined,
    },
    iconOnImage: {
        backgroundColor: '#FD8D8D',
        position: 'absolute', 
        bottom: 20,
        right: 20,
        borderRadius: 100,
        padding: 10,
    }
});

export default Daily