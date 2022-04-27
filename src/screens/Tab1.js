import React, { useState, useEffect } from 'react'
import { Text, View, Button, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth'

const handleLogout = () => {
    try {
        auth().signOut()
        console.log('Signed Out!')
    } catch (e) {
        console.log(e)
    }
}

const Tab1 = () => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    return (
        <View>
            <Text>Welcome {user ? user.email : null}</Text>
            <Button title={'logout'} onPress={() => handleLogout()} />
        </View>
    )
}

export default Tab1