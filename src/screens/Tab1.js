import React, { useState, useEffect } from 'react'
import { Text, ScrollView, Button, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'
import { Avatar } from '@rneui/themed';

const handleLogout = () => {
    try {
        auth().signOut()
        console.log('Signed Out!')
    } catch (e) {
        console.log(e)
    }
}

const Tab1 = () => {
    const [user, setUser] = useState();

    auth().onAuthStateChanged(user => {
        if (user) {
            setUser(auth().currentUser)
        } else {
            // console.log('Loading...')
        }
    })

    return (
        <ScrollView
            style={styles.view}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
            <Avatar
                size={96}
                rounded
                source={require('../../assets/beach.jpg')}
            />
            <Text>Username: {user ? user.displayName : null}</Text>
            <Text>Email: {user ? user.email : null}</Text>
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
        padding: 10,
        // backgroundColor: 'black',
    },
    text: {
        fontSize: 30,
    },
    image: {
        width: '50%',
        // height: '100%',
        borderRadius: 100
    },
    button: {
        fontSize: 30,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 15,
        marginTop: 10
    }
});

export default Tab1