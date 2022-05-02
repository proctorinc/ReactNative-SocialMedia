import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ navigation, children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    const handleLogout = () => {
        try {
            auth().signOut()
            reload()
        } catch (e) {
            console.log(e)
        }
    }

    const handleLogin = async ({ email, password }) => {
        if (email && password) {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(() => {
                    reload()
                    // navigation.navigate('Main')
                })
                .catch(err => {
                    if (err.code === 'auth/invalid-email') {
                        setError('Enter a valid email address')
                    } else {
                        setError('Invalid email or password')
                    }
                })
        } else {
            setError('Enter email and password')
        }
    }

    const handleSignup = async ({ username, email, password, confirmPassword }) => {
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                // if (await isUnique(username)) {
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(async (result) => {
                        const userInfo = {
                            displayName: username
                        }
                        auth().currentUser.updateProfile({
                            displayName: username
                        })
                    })
                    .then(() => navigation.navigate('Main'))
                    .catch(err => {
                        // setError(err.message)
                        if (err.code === 'auth/invalid-email') {
                            setError('Enter a valid email address')
                        } else if (err.code === 'auth/weak-password') {
                            setError('Invalid password. Password is too weak')
                        } else {
                            setError(err.message)
                            setError('Error creating account.')
                        }
                    })

                // } else {
                //     setError('Username is already taken')
                // }
            } else {
                setError('Passwords do not match')
            }
        } else {
            setError('Enter email, password, and confirm password')
        }
    }

    const sendVerification = () => {
        return currentUser.sendEmailVerification();
    }

    const getUser = () => auth().currentUser;

    const reloadUser = () => getUser().reload();

    const reload = async () => {
        try {
            await reloadUser();
            const user = getUser();
            setCurrentUser(user);
        } catch (error) { }
        return reload;
    };

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const contextData = {
        currentUser,
        loading,
        reload,
        sendVerification,
        handleLogin,
        handleSignup,
        handleLogout,
        error,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export default AuthContext