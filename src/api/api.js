import firestore from '@react-native-firebase/firestore'

export const getImage = (date) => {
    return new Promise(async (resolve, reject) => {
        await firestore()
            .collection('images')
            .where('date', '==', date.toLocaleDateString())
            .limit(1)
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(snapshot => {
                    resolve(snapshot.data())
                })
            }).catch((err) => {
                reject(Error(err))
            })
    })
}

export const getUserRating = (user, date) => {
    return new Promise((resolve, reject) => {
        firestore()
            .collection(date.toLocaleDateString().replace(/\//g, '-'))
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    resolve(documentSnapshot.data().rating)
                } else {
                    resolve(0)
                }
            })
    })
}

export const confirmUserRating = (user, rating) => {
    const today = new Date().toLocaleDateString().replace(/\//g, '-')
    return new Promise((resolve, reject) => {
        firestore()
            .collection(today)
            .doc(user.uid)
        .set({
            rating: rating
        })
        .then(() => {
            resolve(true)
            
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

export const getImageByDate = (date) => {
    return new Promise((resolve, reject) => {
        firestore()
            .collection('images')
            .where('date', '==', date.toLocaleDateString())
            .limit(1)
            .get()
            .then(querySnapshot => {
                if (querySnapshot.empty) {
                    resolve(null)
                } else {
                    querySnapshot.forEach(snapshot => {
                        resolve(snapshot.data())
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
    })
}

/* Issues here. Either in function or implementation */
export const checkIfDateHasImage = (date) => {
    return new Promise((resolve, reject) => {
        firestore().collection('images')
            .where('date', '==', date.toLocaleDateString())
            .get()
            .then(querySnapshot => {
                if (querySnapshot) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
    })
}

export const fetchAllRatings = (date) => {
    const ratings = []
    return new Promise((resolve, reject) => {
        firestore()
            .collection(String(date))
            .orderBy('rating', 'desc')
            .onSnapshot(querySnapshot => {
                querySnapshot.forEach(async snapshot => {
                    const user = await firestore()
                        .collection('users')
                        .doc(snapshot.id)
                        .get()
                        console.log(user.data().username)
                    ratings.push({username: user.data().username, rating: snapshot.data().rating})
                })
                resolve(ratings)
            })
    })
}

export const getProfilePicture = (user) => {
    firestore()
}