import { View, FlatList, StyleSheet, Button, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import ImageDateEntry from './ImageDateEntry'
import AssignImageModal from './AssignImageModal'

const WeekList = ({ date, week, handleDateChange }) => {
    const [showModal, setShowModal] = useState(false)
    const [assignDate, setAssignDate] = useState()

    const toggleShowModal = () => {
        setShowModal(!showModal)
    }

    return (
        <View>
            <FlatList
                style={styles.list}
                data={week}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                handleDateChange(item.date)
                            }}
                        >
                            <ImageDateEntry
                                date={item.date}
                                selectedDate={date}
                                toggleShowModal={() => toggleShowModal()}
                                setAssignDate={setAssignDate}
                            />
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={item => item.date.toLocaleDateString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setShowModal(!showModal)
                }}
            >
                <View style={styles.modal}>
                    {/* <Button
                        title={'Go Back'}
                        onPress={() => toggleShowModal()}
                    /> */}
                    <AssignImageModal
                        date={assignDate}
                        toggleShowModal={toggleShowModal}
                    />
                </View>
        </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    list: {
        width: '100%',
        padding: 0
    },
    modal : {
        height: '100%',
        backgroundColor: 'white',
    },
})

export default WeekList