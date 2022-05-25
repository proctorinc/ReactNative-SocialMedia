import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/auth/Signup'
import Login from '../screens/auth/Login'
import TabNavigator from './TabNavigator'
import PendingEnable from '../screens/auth/PendingEnable'

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    );
};

export const PendingEnableStack = () => {
    return (
        <PendingEnable />
    );
};

export const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
    );
};