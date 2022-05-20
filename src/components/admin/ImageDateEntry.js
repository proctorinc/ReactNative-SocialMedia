import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { DAYS_OF_WEEK } from '../../consts'

const ImageDateEntry = ({ date, selectedDate, toggleShowModal, setAssignDate }) => {
    const [hasImage, setHasImage] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const [cancelled, setCancelled] = useState(false)
    const navigation = useNavigation()

    const checkIfDateHasImage = () => {
        firestore().collection('images')
            .where('date', '==', date.toLocaleDateString())
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty && !cancelled) {
                    setHasImage(false)
                } else if (!cancelled) {
                    setHasImage(true)
                } else {
                    console.log('Skipped!')
                }
            })
    }

    const selectedStyle = () => {
        if (isSelected) {
            return {
                backgroundColor: 'gray'
            }
        } else {
            return {
                backgroundColor: 'white'
            }
        }
    }

    useEffect(() => {
        if (!hasImage) {
            checkIfDateHasImage()
        }
        setIsSelected(date.toLocaleDateString() === selectedDate.toLocaleDateString())

        return () => {
            setCancelled(true)
        }
    }, [selectedDate])

  return (
        <View style={[styles.container, selectedStyle()]}>
            <Text style={styles.item}>{DAYS_OF_WEEK[date.getDay()]}</Text>
            <Text style={styles.item}>{date.toLocaleDateString()}</Text>
            {hasImage
                ? <Text style={styles.item}>Set</Text>
                : <Text style={styles.item}>No Image</Text>}
            {hasImage
                ? <Button
                    style={styles.item}
                    title={'Edit'}
                    onPress={() => {
                        console.log('edit')
                        // toggleShowModal()
                    }}
                >
                </Button>
                : <Button
                    style={styles.item}
                    title={'Add'}
                    onPress={() => {
                        console.log('Add')
                        setAssignDate(date)
                        toggleShowModal()
                    }}
                >
                </Button>
            }
            {isSelected ? <Text>Selected</Text> : <Text>False</Text>}
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 5,
        width: '100%',
        borderTopWidth: 1,
        borderColor: 'gray',
    },
    item: {
        paddingHorizontal: 10,
    }
})

export default ImageDateEntry