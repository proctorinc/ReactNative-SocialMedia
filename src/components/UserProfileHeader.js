import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Avatar } from '@rneui/base'

const UserProfileHeader = ({ username }) => {
    const { currentUser } = useAuth()
    const [isSelf, setIsSelf] = useState(false)

    useEffect(() => {
        setIsSelf(currentUser.displayName == username)
    }, [])

    return (
    <View style={styles.header}>
        <Avatar
            size="large"
            title={username.substring(0, 2).toUpperCase()}
            rounded
            overlayContainerStyle={{ backgroundColor: 'gray' }}
        />
        <Text style={styles.title}>{username}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
        paddingVertical: 25,
        // paddingHorizontal: 10,
    },
    title: {
        fontSize: 30,
        paddingHorizontal: 5
    },
});

export default UserProfileHeader