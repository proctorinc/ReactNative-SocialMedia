import 'react-native-gesture-handler'
import React from 'react'
import { AuthProvider } from './src/context/AuthContext'
import { Router } from './src/context/Router';

const App = () => {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
export default App