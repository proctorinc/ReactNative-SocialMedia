import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { Avatar } from '@rneui/base'
import { Pencil } from 'phosphor-react-native'

const UserProfileHeader = ({ username }) => {
    const { currentUser } = useAuth()
    const [isSelf, setIsSelf] = useState(false)

    useEffect(() => {
        setIsSelf(currentUser.displayName == username)
    }, [])

    return (
    <View style={styles.header}>
        <TouchableOpacity
            onPress={() => console.log('edit')}
        >
            <Avatar
                size="large"
                // title={username.substring(0, 2).toUpperCase()}
                source={{ uri: currentUser.photoURL }}
                rounded
                // overlayContainerStyle={{ backgroundColor: 'gray' }}
            />
            {isSelf
            ? <Pencil style={styles.edit} />
            : null}
        </TouchableOpacity>
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
        paddingHorizontal: 10
    },
    edit: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        backgroundColor: 'white',
        borderRadius: 100,
    }
});

export default UserProfileHeader