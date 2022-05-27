import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import UserProfilePage from '../screens/app/UserProfilePage'
import Weekly from '../screens/app/Weekly'
import WeeklyResults from '../screens/app/WeeklyResults'
import Daily from '../screens/app/Daily'
import DailyResults from '../screens/app/DailyResults'
import SplashScreen from '../screens/app/SplashScreen'
import AdminApprove from '../screens/admin/AdminApprove'
import AdminCalendar from '../screens/admin/AdminCalendar'
import { useAuth } from '../context/AuthContext'
import { House, User, ListBullets, Trophy, Gear } from 'phosphor-react-native'

const Tab = createMaterialTopTabNavigator();

const Main = () => {
    const { loading } = useAuth()
    const [isFriday, setIsFriday] = useState()

    useEffect(() => {
        setIsFriday(isTodayFriday)
    }, [])

    const isTodayFriday = () => {
        return new Date().getDay() === 5
    }

    const initialRoute = isFriday ? "Weekly" : "Daily"

    if (loading) {
        return <SplashScreen />
    }

    return (
        <Tab.Navigator
            initialRouteName={'Daily'}
            tabBarPosition="bottom"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarIndicator: () => null
            }}
        >
            <Tab.Screen
                name="Profile"
                component={UserProfilePage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <User size={24} color={focused ? '#FD8D8D' : 'black'} />
                    )
                }}
            />
            <Tab.Screen
                name="Daily"
                component={Daily}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <House
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="DailyResults"
                component={DailyResults}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ListBullets
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            />
            {/* <Tab.Screen
                name="Weekly"
                component={Weekly}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Trophy
                            size={24}
                            color={focused ? '#FFD84E' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="WeeklyResults"
                component={WeeklyResults}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ListBullets
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            /> */}
            {/* <Tab.Screen
                name="Calendar"
                component={AdminCalendar}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Gear
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            /> */}
            {/* <Tab.Screen
                name="Admin"
                component={AdminApprove}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Gear
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            /> */}
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    focused: {
        backgroundColor: 'red',
    },
    notfocused: {

    }
})

export default Main