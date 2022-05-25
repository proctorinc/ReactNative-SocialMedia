import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeekList from '../../components/admin/WeekList'
import ScaledImage from '../../components/ScaledImage'
import { getImageByDate } from '../../api/api'

const AdminCalendar = () => {
    // const { loading } = useAuth()
    const [date, setDate] = useState(new Date())
    const [week, setWeek] = useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)

    const getStartOfWeek = () => {
        d = new Date(date)
        const day = d.getDay()
        const diff = d.getDate() - day + (day == 0 ? -6 : 1) // For monday
        return new Date(d.setDate(diff))
    }

    const getDaysInWeek = () => {
        setLoading(true)
        const newDate = getStartOfWeek()

        const newWeek = [
            {date: new Date(newDate.setDate(newDate.getDate()))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
            {date: new Date(newDate.setDate(newDate.getDate() + 1))},
        ]

        setWeek(newWeek)
        setLoading(false)
    }

    const handleDateChange = (date) => {
        setDate(date)
    }

    const fetchImage = async () => {
        await getImageByDate(date)
            .then((image) => {
                setImage(image)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        if (week.length == 0) {
            getDaysInWeek()
        }
        if (!date) {
            setDate(new Date())
        }
        fetchImage()
    }, [date])

    if (loading || week.length == 0) {
        return <Text>Loading...</Text>
    }

  return (
    <View style={styles.container}>
        <View>
            <Text>AdminCalendar</Text>
            <Text>Selected: {date.toLocaleDateString()}</Text>
        </View>
        {image
            ? <ScaledImage
                style={styles.image}
                uri={image.url}
            />
            : <View style={styles.image}>
                <Text>No Image Available</Text>
            </View>
        } 
        <View style={styles.buttonGroup}>
            <Button
                style={styles.button}
                title={'<'}
                onPress={() => {
                    if (!loading) {
                        console.log(date + ' -> ' + new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000))
                        setDate(new Date(date.setDate(date.getDate() - 7)))
                        getDaysInWeek()
                    }
                }}
            />
            <Button
                style={styles.button}
                title={'Today'}
                onPress={() => {
                    /*
                    There is an issue here! Does not refresh the week properly.. idk why
                    */
                    const today = new Date()
                    if (!loading && date.toLocaleDateString() !== today.toLocaleDateString()) {
                        console.log('TODAY?')
                        console.log(today.toLocaleDateString())
                        setDate(today)
                        getDaysInWeek()
                    } else {
                        console.log('It was loading')
                    }
                }}
            />
            <Button
                style={styles.button}
                title={'>'}
                onPress={() => {
                    if (!loading) {
                        console.log(date + ' -> ' + new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))
                        // handleDateChange(new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000))
                        setDate(new Date(date.setDate(date.getDate() + 7)))
                        getDaysInWeek()
                    }
                }}
            />
        </View>
        {week.length > 0
            ? 
            <WeekList
                date={date}
                week={week}
                handleDateChange={handleDateChange}
            />
            : <Text>No Week</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        paddingTop: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    button: {

    },
    image: {
        height: '30%'
    }
})

export default AdminCalendar