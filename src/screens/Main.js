import React, { useState, useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
import SplashScreen from './SplashScreen'
import WeeklyGerth from './WeeklyGeth'
import AdminApprove from './admin/AdminApprove'
import AdminCalendar from './admin/AdminCalendar'
import { useAuth } from '../context/AuthContext'

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

    const initialRoute = 'Calendar'
    //  = isFriday
    //     ? "Weekly"
    //     : "Daily"

    // = 'Admin'

    if (loading) {
        return <SplashScreen />
    }

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
            {/* <Tab.Screen name="Other" component={Tab3} /> */}
            <Tab.Screen name="Admin" component={AdminApprove} />
            <Tab.Screen name="Calendar" component={AdminCalendar} />
        </Tab.Navigator>
    );
}

export default Main