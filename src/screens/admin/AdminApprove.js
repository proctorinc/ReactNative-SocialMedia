import { View, Button, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-picker'

const AdminApprove = () => {
    const [photoURLs, setPhotoURLs] = useState([])
    const [loading, setLoading] = useState(true)
    const [photoDimensions, setPhotoDimensions] = useState({ width: 0, height: 0 })
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);

    const selectImage = () => {
        const options = {
            maxWidth: 8000,
            maxHeight: 8000,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log(source);
                setImage(source)
            }
        });
    };

    const uploadImage = async () => {
        const { uri } = image;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);
        setTransferred(0);
        const task = storage()
            .ref(filename)
            .putFile(uploadUri);
        // set progress state
        task.on('state_changed', snapshot => {
            setTransferred(
                Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
            );
        });
        try {
            await task;
        } catch (e) {
            console.error(e);
        }
        setUploading(false);
        Alert.alert(
            'Photo uploaded!',
            'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
    };

    const getPhotos = async () => {
        setLoading(true)
        // Get photos from firebase storage
        await storage()
            .ref('new-images/')
            .listAll()
            .then(async (imageRefs) => {
                setPhotoURLs(await Promise.all(imageRefs.items.map((ref) => ref.getDownloadURL())))
            })
        setLoading(false)
    }

    const denyPhoto = () => {
        setLoading(true)

        // Delete photo from 'new-images'
        const ref = storage().refFromURL(photoURLs[0])

        ref.delete().then(() => {
            console.log('Deleted Image')
        }).catch((error) => {
            console.log(error)
        })

        // Remove photo from photo list
        setPhotoURLs(photoURLs.splice(1, photoURLs.length))
        setLoading(false)
    }

    const acceptPhoto = () => {
        const imageUrl = photoURLs[0]
        setLoading(true)
        const ref = storage().refFromURL(imageUrl)

        // TODO: move location of photo
        // Move photo out of 'new-images' storage to 'reviewed-images'
        //
        //
        //
        //
        // IMPLEMENT ABOVE

        // Add photo to firestore
        firestore()
            .collection('images')
            .doc()
            .set({
                date: null,
                status: 'verified',
                url: imageUrl
            })

        setPhotoURLs(photoURLs.splice(1, photoURLs.length))
        setLoading(false)
    }

    useEffect(() => {
        if (photoURLs.length == 0) {
            getPhotos()
        } else {
            Image.getSize(photoURLs[0], (width, height) => {
                setPhotoDimensions({ width, height })
            });
        }
    }, [photoURLs])

    return (
        <View style={styles.container}>
            <Button
                title={'Import Photos'}
                onPress={() => selectImage()}
            />
            <Text>Photos to review: {photoURLs.length}</Text>
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
                            source={{ uri: photoURLs[0] }}
                            // resizeMethod='scale'
                            resizeMode={'cover'}
                        />
                        <View style={styles.buttonGroup}>
                            <Button
                                style={styles.button}
                                title={'Deny'}
                                onPress={() => {
                                    if (!loading) {
                                        denyPhoto()
                                    }
                                }}
                            />
                            <Button
                                style={styles.button}
                                title={'Accept'}
                                onPress={() => {
                                    if (!loading) {
                                        acceptPhoto()
                                    }
                                }}
                            />
                        </View>
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

export default AdminApprove