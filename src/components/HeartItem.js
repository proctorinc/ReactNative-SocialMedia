import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconContext, Heart } from 'phosphor-react-native';

const HeartItem = ({ value, rating, setRating, style }) => {
    return (
        <IconContext.Provider
            value={
                value <= rating
                    ? {
                        color: '#FD8D8D',
                        size: 64,
                        weight: "fill"
                    }
                    : {
                        color: '#111',
                        size: 64,
                        weight: 'thin'
                    }
            }
        >
            <View>
                <TouchableOpacity
                    onPress={() => setRating(value)}
                    style={style}
                >
                    <Heart />
                </TouchableOpacity>
            </View>
        </IconContext.Provider >
    )
}

export default HeartItem