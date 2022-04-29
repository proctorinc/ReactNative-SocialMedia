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
        <Tab.Navigator
            initialRouteName="Home"
            tabBarPosition="bottom"
        >
            <Tab.Screen name="Profile" component={Tab1} />
            <Tab.Screen name="Home" component={Tab2} />
            <Tab.Screen name="Other" component={Tab3} />
        </Tab.Navigator>
    );
}

export default Main