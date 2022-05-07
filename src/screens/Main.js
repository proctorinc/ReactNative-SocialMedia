// Loading.js
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import TabBar from '../components/TabBar'
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './SplashScreen'
import WeeklyGerth from './WeeklyGeth'

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
            <SplashScreen />
        )
    };

    if (!user) {
        navigation.navigate('Login')
        return null
    }

    const isFriday = () => {
        console.log(new Date().getDay() === 5)
        return new Date().getDay() === 5
    }

    const initialRoute = isFriday
        ? "Weekly"
        : "Daily"

    return (
        <Tab.Navigator
            initialRouteName={initialRoute}
            tabBarPosition="bottom"
        // tabBar={props => <TabBar {...props} />}
        >
            <Tab.Screen name="Profile" component={Tab1} />
            {isFriday
                ? <Tab.Screen name="Weekly" component={WeeklyGerth} />
                : <Tab.Screen name="Daily" component={Tab2} />}
            <Tab.Screen name="Other" component={Tab3} />
        </Tab.Navigator>
    );
}

export default Main