import 'react-native-gesture-handler'
// import React from 'react'
// import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation";
// import the different screens
import Loading from './src/screens/Loading'
import Signup from './src/screens/Signup'
import Login from './src/screens/Login'
import Main from './src/screens/Main'

// create our app's navigation stack
const App = createStackNavigator(
  {
    Loading: Loading,
    Signup: Signup,
    Login: Login,
    Main: Main
  },
  {
    initialRouteName: 'Loading',
    defaultNavigationOptions: {
      // title: "MattApp",
      headerLeft: () => null,
      headerShown: false
    }
  }
)
export default createAppContainer(App)