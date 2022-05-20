import React, { useContext, useEffect, useState } from 'react'
import { View, Button, Text, ScrollView, Image, StyleSheet } from 'react-native'
import AuthContext from '../context/AuthContext';
import { Rating, Avatar } from '@rneui/themed';
import { utils } from '@react-native-firebase/app';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

const Tab3 = () => {
    const { currentUser, handleLogout } = useContext(AuthContext)
    const [imageTab, setImageTab] = useState([]);

    useEffect(() => {
        storage()
            .ref('images/')
            .listAll()
            .then(function (result) {
                // console.log(result.items.length)
                result.items.forEach(function (imageRef) {
                    // console.log(imageRef)
                    imageRef.getDownloadURL()
                        .then(function (url) {
                            // console.log(url)
                            firestore()
                            // imageTab.push(url);
                            // setImageTab(imageTab);
                        }).catch(function (error) {
                            // Handle any errors
                        });
                });
            })
            .catch((e) => console.log('Errors while downloading => ', e));
    }, []);

    return (
        <View>
            <Text>{imageTab.length}</Text>
        </View>
        //     <ScrollView
        //         style={styles.scrollContainer}
        //     >
        //         {imageTab.map(i => (<Image key={i.id} style={styles.ratedImage} source={{ uri: i }} />))}
        //     </ScrollView>
    )

    // return (
    //     <View>
    //         <View
    //             styles={styles.view}
    //         >
    //             <Text>{new Date().toDateString()}</Text>
    //         </View>
    //         <ScrollView
    //             style={styles.cardView}
    //             horizontal
    //             showsHorizontalScrollIndicator
    //             contentContainerStyle={styles.scrollContainer}
    //         >
    //             <Image
    //                 style={styles.ratedImage}
    //                 source={require('../../assets/images/20211211_194448.jpg')}
    //                 resizeMethod='scale'
    //             />
    //             <Image
    //                 style={styles.ratedImage}
    //                 source={require('../../assets/images/20211211_194448.jpg')}
    //                 resizeMethod='scale'
    //             />
    //             <Image
    //                 style={styles.ratedImage}
    //                 source={require('../../assets/images/20211211_194448.jpg')}
    //                 resizeMethod='scale'
    //             />
    //             <Image
    //                 style={styles.ratedImage}
    //                 source={require('../../assets/images/20211211_194448.jpg')}
    //                 resizeMethod='scale'
    //             />
    //         </ScrollView>
    //     </View>
    // )

}

const styles = StyleSheet.create({
    view: {
        // textAlign: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // height: '100%',
        padding: 10,
        // backgroundColor: 'black',
    },
    text: {
        fontSize: 30,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 5
    },
    ratedImage: {
        borderRadius: 10,
        width: undefined,
        height: '1%',
        aspectRatio: 3 / 4,
        // aspectRatio: 1,
        marginLeft: 5
    },
    scrollContainer: {
        // flexGrow: 1,
        // justifyContent: 'center'
    },
    profileView: {
        borderRadius: 10,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10
    },
    cardView: {
        // borderRadius: 10,
        // borderColor: 'lightgray',
        // borderWidth: 1,
        marginVertical: 10,
        height: '50%'
    },
    rating: {
        padding: 25,
        transform: [{ scale: 1.5 }]
    },
    avatar: {
        width: '100%'
    }
});

export default Tab3