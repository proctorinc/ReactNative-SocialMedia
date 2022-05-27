import React, { createContext, useContext, useState, useEffect } from 'react';
import { getImage, getUserRating } from '../api/api';
import { useAuth } from './AuthContext';

const DailyContext = createContext();

export const useDailyContext = () => {
    return useContext(DailyContext);
}

export const DailyContextProvider = ({ children }) => {
    const { currentUser } = useAuth()
    const [myRating, setMyRating] = useState(0)
    const [dailyImage, setDailyImage] = useState(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [ratingLoaded, setRatingLoaded] = useState(false)
    const [today, setToday] = useState(new Date())
    // const [dailyContextLoaded, setDailyContextLoaded] = useState(false)

    const fetchImage = async () => {
        await getImage(today)
            .then((image) => {
                setDailyImage(image)
                setImageLoaded(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const fetchUserRating = async () => {
        await getUserRating(currentUser, today)
            .then((rating) => {
                setMyRating(rating)
                setRatingLoaded(true)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const refreshUserRating = () => {
        fetchUserRating()
    }

    useEffect(() => {
        fetchImage()
        fetchUserRating()

        // return () => {
        //     unsubscribe();
        // };
    }, []);

    const contextData = {
        myRating,
        dailyImage,
        imageLoaded,
        ratingLoaded,
        refreshUserRating,
    };

    return (
        <DailyContext.Provider value={contextData}>
            {children}
        </DailyContext.Provider>
    );
}