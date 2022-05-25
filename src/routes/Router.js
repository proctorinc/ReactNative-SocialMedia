import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack, AuthStack } from './Stacks'
import AuthContext from '../context/AuthContext'
import SplashScreen from '../screens/app/SplashScreen'
import PendingEnable from '../screens/auth/PendingEnable'

export const Router = () => {
    const { loading, currentUser } = useContext(AuthContext)

    if (loading) {
        console.log('Loading')
        return <SplashScreen />
    }

    return (
        <NavigationContainer>
            {currentUser && currentUser.emailVerified ? <AppStack />
                : currentUser && !currentUser.emailVerified ? <PendingEnable />
                    : <AuthStack />}
        </NavigationContainer>
    );
};