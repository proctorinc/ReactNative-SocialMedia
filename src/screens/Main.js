import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import SplashScreen from './SplashScreen'
import WeeklyGerth from './WeeklyGeth'
import AdminApprove from './admin/AdminApprove'
import AdminCalendar from './admin/AdminCalendar'
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

    // = 'Calendar'
    // = 'Admin'

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
        // screenOptions={{
        //     activeTintColor: 'white',
        //     inactiveTintColor: '#d9d9d9',
        //     tabBarStyle: {
        //         borderTopColor: '#111',
        //         elevation: 0,
        //     },
        // }}
        // tabBar={props => <TabBar {...props} />}
        >
            <Tab.Screen
                name="Profile"
                component={Tab1}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <User size={24} color={focused ? '#FD8D8D' : 'black'} />
                    )
                }}
            />
            {/* {isFriday
                ? <Tab.Screen name="Home" component={WeeklyGerth} />
                : <Tab.Screen name="Home" component={Tab2} />} */}
            <Tab.Screen
                name="Weekly"
                component={WeeklyGerth}
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
                name="Daily"
                component={Tab2}
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
            {/* <Tab.Screen name="Other" component={Tab3} /> */}
            {/* <Tab.Screen name="Admin" component={AdminApprove} /> */}
            <Tab.Screen
                name="Calendar"
                component={AdminCalendar} options={{
                    tabBarIcon: ({ focused }) => (
                        <ListBullets
                            size={24}
                            color={focused ? '#FD8D8D' : 'black'}
                            weight={focused ? 'fill' : 'regular'}
                        />
                    )
                }}
            />
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