import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import { IconContext, Heart } from 'phosphor-react-native';

const HeartItem = ({ value, rating, setRating, confirmed, style }) => {

    const getStyle = () => {
        if (confirmed) {
            if (value <= rating) {
                return {
                    color: '#FD8D8D',
                    size: 64,
                    weight: "duotone"
                }
            } else {
                return  {
                    color: '#FFF',
                    size: 64,
                    weight: "duotone"
                }
            }
        } else {
            if (value <= rating && !confirmed) {
                return  {
                    color: '#FD8D8D',
                    size: 64,
                    weight: "fill"
                }
            } else {
                return {
                    color: '#111',
                    size: 64,
                    weight: 'thin'
                }
            }
        }
    }

    return (
        <IconContext.Provider value={getStyle()}>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        if (!confirmed) {
                            setRating(value)
                        }
                    }}
                    style={style}
                >
                    <Heart />
                </TouchableOpacity>
            </View>
        </IconContext.Provider >
    )
}

export default HeartItem