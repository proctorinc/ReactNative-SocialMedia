import React from 'react'
import { View, Button, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext';
import { Rating, Avatar } from '@rneui/themed';

const Tab1 = () => {
    const { currentUser, handleLogout } = useAuth()

    return (
        <ScrollView
            style={styles.view}
            contentContainerStyle={styles.scrollContainer}
        >
            <View
                style={{ flex: 2, flexDirection: 'row', paddingVertical: 5, alignItems: 'center' }}
            >
                <Avatar
                    size="medium"
                    title={currentUser.displayName.substring(0, 2).toUpperCase()}
                    rounded
                    overlayContainerStyle={{ backgroundColor: 'gray' }}
                // source={require('../../assets/images/beach.jpg')}
                />
                <Text style={styles.title}>{currentUser ? currentUser.displayName : null}</Text>
            </View>
            <Image
                style={styles.profileImage}
                source={require('../../assets/images/20211211_194448.jpg')}
                resizeMethod='scale'
            />
            <View style={styles.profileView}>
                <Text>Streak: 10 days</Text>
                <Text>Rated cat pics: 27</Text>
                <Text>Email: {currentUser.email}</Text>
            </View>
            {/* <View>
                <Text>Rated Pictures:</Text>
                <View style={styles.cardView}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                    <Image
                        style={styles.ratedImage}
                        source={require('../../assets/images/20211211_194448.jpg')}
                        resizeMethod='scale'
                    />
                    <Rating
                        style={styles.rating}
                    />
                </View>
                <View style={styles.cardView}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                    <Image
                        style={styles.ratedImage}
                        source={require('../../assets/images/20211211_194448.jpg')}
                        resizeMethod='scale'
                    />
                    <Rating
                        style={styles.rating}
                    />
                </View>
                <View style={styles.cardView}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                    <Image
                        style={styles.ratedImage}
                        source={require('../../assets/images/20211211_194448.jpg')}
                        resizeMethod='scale'
                    />
                    <Rating
                        style={styles.rating}
                    />
                </View>
                <View style={styles.cardView}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                    <Image
                        style={styles.ratedImage}
                        source={require('../../assets/images/20211211_194448.jpg')}
                        resizeMethod='scale'
                    />
                    <Rating
                        style={styles.rating}
                    />
                </View>
                <View style={styles.cardView}>
                    <Text>{new Date().toLocaleDateString()}</Text>
                    <Image
                        style={styles.ratedImage}
                        source={require('../../assets/images/20211211_194448.jpg')}
                        resizeMethod='scale'
                    />
                    <Rating
                        style={styles.rating}
                    />
                </View>
            </View> */}
            <Button title={'logout'} onPress={() => handleLogout()} />
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    view: {
        // textAlign: 'center',
        // justifyContent: "center",
        // alignItems: 'center',
        // height: '100%',
        paddingHorizontal: 10,
        // backgroundColor: 'black',
    },
    text: {
        fontSize: 30,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 5
    },
    profileImage: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
        aspectRatio: 1
    },
    ratedImage: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
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
    scrollContainer: {
        // flexGrow: 1,
        // justifyContent: 'center'
    },
    profileView: {
        borderRadius: 10,
        borderColor: 'lightgray',
        backgroundColor: 'white',
        borderWidth: 1,
        padding: 10,
        marginVertical: 10
    },
    cardView: {
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginVertical: 10
    },
    rating: {
        padding: 25,
        transform: [{ scale: 1.5 }]
    },
    avatar: {
        width: '100%'
    }
});

export default Tab1