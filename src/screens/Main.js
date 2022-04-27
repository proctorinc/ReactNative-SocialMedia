// Loading.js
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const handleLogout = () => {
    try {
        auth().signOut()
    } catch (e) {
        console.log(e)
    }
}

const Main = ({ navigation }) => {
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

    if (initializing) {
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )
    };

    if (!user) {
        navigation.navigate('Login')
        return null
    }

    return (
        <NavigationContainer>
            {/* <Text>Welcome {user.email}</Text>
            <TouchableOpacity onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </TouchableOpacity> */}
            <Tab.Navigator>
                <Tab.Screen name="Tab1" component={Tab1} />
                <Tab.Screen name="Tab2" component={Tab2} />
                <Tab.Screen name="Tab3" component={Tab3} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main