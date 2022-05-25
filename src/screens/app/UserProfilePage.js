import { View, Text } from 'react-native'
import React from 'react'
import UserProfile from '../../components/UserProfile'
import { useAuth } from '../../context/AuthContext'

const UserProfilePage = () => {
    const { currentUser } = useAuth()
  return (
    <UserProfile username={currentUser.displayName} />
  )
}

export default UserProfilePage