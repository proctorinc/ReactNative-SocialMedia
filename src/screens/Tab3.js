import React from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

const Tab3 = () => {

    const list = [
        { name: 'Matt' },
        { name: 'Annika' },
        { name: 'Person' },
        { name: 'Banana' },
        { name: 'Thingy' },
        { name: 'Gummies' },
        { name: 'Gibberish' },
        { name: 'ASDF' },
        { name: 'Another one' },
        { name: 'Cool' },
        { name: 'Save' },
        { name: 'Ok' },

    ]

    return (
        <View style={styles.view}>
            <FlatList
                // styles={styles.list}
                keyExtractor={(item) => item.name}
                data={list}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => console.log(item.name)}>
                            <Text
                                key={item.key}
                                style={styles.item}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'lightgray',
    },
    // list: {

    // },
    item: {
        padding: 15,
        marginHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'center',
        marginVertical: 4,
        color: 'gray',
        fontSize: 30,
    }
})

export default Tab3