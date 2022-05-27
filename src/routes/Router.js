import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack, AuthStack } from './Stacks'
import { useAuth } from '../context/AuthContext'
import SplashScreen from '../screens/app/SplashScreen'
import PendingEnable from '../screens/auth/PendingEnable'
import { DailyContextProvider } from '../context/DailyContext'

export const Router = () => {
    const { loading, currentUser } = useAuth()

    if (loading) {
        console.log('Loading')
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {currentUser && currentUser.emailVerified
            ? <DailyContextProvider>
                <AppStack />
            </DailyContextProvider>
            : currentUser && !currentUser.emailVerified
                ? <PendingEnable />
                : <AuthStack />}
        </NavigationContainer>
    );
};