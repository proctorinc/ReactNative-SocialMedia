import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/Signup'
import Login from '../screens/Login'
import Main from '../screens/Main'

const Stack = createNativeStackNavigator();

export const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Main" component={Main} />
        </Stack.Navigator>
    );
};

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