import { View, Button, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-picker'

const AssignImageModal = ({ date, toggleShowModal }) => {
    const [photoURLs, setPhotoURLs] = useState([])
    const [loading, setLoading] = useState(true)
    const [photoDimensions, setPhotoDimensions] = useState({ width: 0, height: 0 })
    const [currentIndex, setCurrentIndex] = useState(0)

    const getPhotos = async () => {
        setLoading(true)
        // Get photos from firebase storage
        firestore().collection('images')
            .where('date', '==', null)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snapshot => {
                    // console.log(snapshot.data().url)
                    setPhotoURLs(old => [...old, snapshot.data().url])
                })
            }).catch((err) => {
                console.log(err)
            })
        // console.log('urls: ')
        // console.log(photoURLs)
        setLoading(false)
    }

    const assignImageToDate = () => {
        // firestore, set date for the image
        // console.log('Set image')
        // console.log('Date: ' + date.toLocaleDateString())
        // console.log('Image: ' + photoURLs[currentIndex])
        firestore()
            .collection('images')
            .where('url', '==', photoURLs[currentIndex])
            .limit(1)
            .get()
            .then(querySnapshot => {
                if (!querySnapshot.empty) {
                    const document = querySnapshot.docs[0].ref

                    firestore()
                        .collection('images')
                        .doc(document.id)
                        .update({
                            date: date.toLocaleDateString()
                        })
                        .catch(error => {
                            console.log('Error updating image: ' + error)
                        })
                } else {
                    console.log('Error finding photo. No results')
                }
            })
            .catch((error) => {
                console.log('Error assigning image: ' + error)
            })
        toggleShowModal()
    }

    useEffect(() => {
        if (photoURLs.length == 0) {
            getPhotos()
        } else {
            Image.getSize(photoURLs[0], (width, height) => {
                setPhotoDimensions({ width, height })
            });
        }
    }, [photoURLs, currentIndex])

    return (
        <View style={styles.container}>
            <Text>Photo: #{currentIndex + 1}/{photoURLs.length}</Text>
            {loading || photoDimensions.width == 0 || photoDimensions.height == 0
                ? <ActivityIndicator size="large" />
                : photoURLs.length == 0
                    ? <Button
                        title='Refresh Photos'
                        onPress={() => getPhotos()}
                    />
                    : <View style={styles.container}>
                        <Image
                            style={[styles.image, { aspectRatio: photoDimensions.width / photoDimensions.height }]}
                            source={{ uri: photoURLs[currentIndex] }}
                            resizeMode={'cover'}
                        />
                        <View style={styles.buttonGroup}>
                            <Button
                                style={styles.button}
                                title={'<'}
                                onPress={() => {
                                    if (!loading) {
                                        if (currentIndex > 0) {
                                            setCurrentIndex(currentIndex - 1)
                                        }
                                    }
                                }}
                            />
                            <Button
                                style={styles.button}
                                title={'Assign Image'}
                                onPress={() => {
                                    if (!loading) {
                                        assignImageToDate()
                                        console.log('Assigned photo')
                                    }
                                }}
                            />
                            <Button
                                style={styles.button}
                                title={'>'}
                                onPress={() => {
                                    if (!loading) {
                                        if (currentIndex < photoURLs.length - 1) {
                                            setCurrentIndex(currentIndex + 1)
                                        }
                                    }
                                }}
                            />
                        </View>
                        <Button
                            title={'Cancel'}
                            onPress={() => toggleShowModal()}
                        >

                        </Button>
                    </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
        // aspectRatio: 3 / 4
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
    },
    button: {

    }
})

export default AssignImageModal