import { Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

// Use the image width/height to scale image aspect ratio
const ScaledImage = ({ uri, style }) => {
  const [aspectRatio, setAspectRatio] = useState(1)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Get photo dimensions and calculate the aspect ratio
    Image.getSize(uri, (width, height) => {
      setAspectRatio(width / height)
      setLoading(false)
    })
  }, [uri])

  if (loading) {
    return null
  } else {
    return (
      <Image
        style={[ styles.image, style, { aspectRatio: aspectRatio }]}
        source={{ uri: uri }}
        resizeMode={'cover'}
      />
    )
  }
}

const styles = StyleSheet.create({
  image: {
      height: undefined,
  },
})

export default ScaledImage