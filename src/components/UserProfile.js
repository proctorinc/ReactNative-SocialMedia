import React, { useEffect, useState } from 'react'
import { View, Button, Text, Image, StyleSheet } from 'react-native'
import { useAuth } from '../context/AuthContext';
import UserProfileHeader from './UserProfileHeader';

const UserProfile = ({ username }) => {
    const { currentUser, handleLogout } = useAuth()
    const [isSelf, setIsSelf] = useState(false)

    useEffect(() => {
        setIsSelf(currentUser.displayName == username)
    }, [])

    return (
        <View style={styles.view}>
            <UserProfileHeader username={currentUser.displayName}/>
            <Text style={styles.header}>{username}'s favorite Gerth:</Text>
            <Image
                style={styles.favoriteImage}
                source={{ uri: currentUser.photoURL }}
                resizeMethod='scale'
            />
            <Text style={styles.header}>Stats:</Text>
            <View style={styles.profileView}>
                <Text style={styles.text}>Streak: 10 days</Text>
                <Text style={styles.text}>Rated cat pics: 27</Text>
                <Text style={styles.text}>Email: {currentUser.email}</Text>
            </View>
            {isSelf
            ? <Button title={'logout'} onPress={() => handleLogout()} />
            : null}
        </View>
    )

}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: 'Poppins-Light',
        padding: 1,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 5
    },
    header: {
        fontSize: 18,
        fontFamily: 'Poppins-Light',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#d6d6d6',
    },
    favoriteImage: {
        borderRadius: 10,
        width: '80%',
        height: undefined,
        aspectRatio: 1,
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
    profileView: {
        borderRadius: 10,
        // borderColor: 'lightgray',
        // borderWidth: 1,
        paddingHorizontal: 10,
        marginVertical: 10
    },
    cardView: {
        borderRadius: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        marginVertical: 10,
    },
    rating: {
        padding: 25,
        transform: [{ scale: 1.5 }]
    },
    avatar: {
        width: '100%'
    }
});

export default UserProfile