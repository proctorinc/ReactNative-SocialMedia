import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AppStack, AuthStack } from './Stacks'
import AuthContext from './AuthContext'
import SplashScreen from '../screens/SplashScreen'
import PendingEnable from '../screens/PendingEnable'

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