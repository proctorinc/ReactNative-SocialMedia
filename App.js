import 'react-native-gesture-handler'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Loading from './src/screens/Loading'
import Signup from './src/screens/Signup'
import Login from './src/screens/Login'
import Main from './src/screens/Main'

const Stack = createNativeStackNavigator()

// create our app's navigation stack
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer >
  )
}
export default App