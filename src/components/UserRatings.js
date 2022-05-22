import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { User, Heart } from 'phosphor-react-native'

const UserRatings = () => {
  return (
    <View>
        {/* <Text>See who voted!</Text> */}
        <View style={styles.userRating}>
            <User size={32} />
            <Text style={styles.text}>Mattyp</Text>
            <View style={styles.stat}>
                <Heart size={50} color={'#FD8D8D'} weight={'fill'} />
                <Text style={styles.userRatingText}>5</Text>
            </View>
        </View>

        <View style={styles.userRating}>
            <User size={32} />
            <Text style={styles.text}>WifeyP</Text>
            <View style={styles.stat}>
                <Heart size={50} color={'#FD8D8D'} weight={'fill'} />
                <Text style={styles.userRatingText}>4</Text>
            </View>
        </View>

        <View style={styles.userRating}>
            <User size={32} />
            <Text style={styles.text}>Moo</Text>
            <View style={styles.stat}>
                <Heart size={50} color={'#FD8D8D'} weight={'fill'} />
                <Text style={styles.userRatingText}>3</Text>
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontFamily: 'Poppins-Light',
    },
    text: {
        fontSize: 18,
        // paddingBottom: 15,
        padding: 10
    },
    image: {
        borderRadius: 10,
        width: '100%',
        height: undefined,
    },
    button: {
        fontSize: 30,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        backgroundColor: 'blue',
        borderRadius: 15,
        marginTop: 10
    },
    rating: {
        backgroundColor: 'red'
    },
    statview: {
        flexDirection: 'row'
    },
    stat: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    stattext: {
        position: 'absolute',
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
    },
    userRating: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 5,
    },
    userRatingText: {
        position: 'absolute',
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
    }
});

export default UserRatings