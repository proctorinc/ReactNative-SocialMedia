import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppStack, AuthStack } from './Stacks';
import AuthContext from './AuthContext';
import SplashScreen from '../screens/SplashScreen';

export const Router = () => {
    const { loading, currentUser } = useContext(AuthContext)

    if (loading) {
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {currentUser ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};