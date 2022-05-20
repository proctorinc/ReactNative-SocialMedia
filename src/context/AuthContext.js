import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import * as Keychain from 'react-native-keychain'
import FingerprintScanner from 'react-native-fingerprint-scanner';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [successMsg, setSuccessMsg] = useState('')

    const handleLogout = async () => {
        try {
            // await Keychain.resetGenericPassword()
            auth().signOut()
            reload()
        } catch (e) {
            console.log(e)
        }-legacy
    }

    const resetError = () => {
        setError(null)
    }

    const getMessage = (biometricType) => {
        if (biometricType == 'Face ID') {
            return 'Scan your face using Face ID to continue'
        } else {
            console.log(biometricType)
            return 'Scan your fingerprint to continue'
        }
    }

    const checkKeychain = async () => {
        try {
            const credentials = await Keychain.getGenericPassword()
            if (credentials) {
                console.log('Email: ' + credentials.username)
                console.log('Password: ' + credentials.password)
                FingerprintScanner.isSensorAvailable()
                    .then(biometricType => {
                        console.log('bio type: ' + biometricType)
                        FingerprintScanner.authenticate({description: getMessage(biometricType)})
                            .then(() => {
                                handleLogin(credentials.username, credentials.password)
                            }).catch(err => {
                                console.log('Authentication Error: ' + err)
                            })
                    }).catch(err => {
                        console.log('isSensorAvailable error: ' + err)
                    })
                handleLogin(credentials.username, credentials.password)
            } else {
                console.log('No credentials!')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            console.log('Keychain unable to be accessed.')
        }
    }

    const handleLogin = async (email, password) => {
        if (email && password) {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then(async () => {
                    await Keychain.setGenericPassword(email, password)
                    reload()
                })
                .catch(err => {
                    console.log(err)
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

    const handleSignup = async (username, email, password, confirmPassword) => {
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                firestore()
                    .collection('users')
                    .where('username', '==', username.toUpperCase())
                    .get()
                    .then(snapshot => {
                        if (snapshot.empty) {
                            return auth().createUserWithEmailAndPassword(email, password)
                        } else {
                            throw new Error('Username is already taken')
                        }
                    })
                    .then(createdUser => {
                        createdUser.user.updateProfile({
                            displayName: username
                        })
                        firestore()
                            .collection('users')
                            .doc(createdUser.user.uid)
                            .set({
                                email: email,
                                username: username.toUpperCase(),
                            })
                        createdUser.user.reload()
                        createdUser.user.sendEmailVerification()
                    })
                    .catch(err => {
                        if (err.code === 'auth/invalid-email') {
                            setError('Enter a valid email address')
                        } else if (err.code === 'auth/weak-password') {
                            setError('Invalid password. Password is too weak')
                        } else if (err.message === 'Username is already taken') {
                            setError(err.message)
                        } else {
                            setError('Unable to create account')
                            // // Delete user if error occurs
                            // currentUser.delete().then(() => {
                            //     console.log('deleted user account')
                            // })
                        }
                    })
            } else {
                setError('Passwords do not match')
            }
        } else {
            setError('Enter email, password, and confirm password')
        }
    }

    const deleteAccount = () => {
        // Delete from Auth
        // Delete Firestore data => document(user.id)
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
        checkKeychain,
        handleLogin,
        handleSignup,
        handleLogout,
        error,
        resetError,
        successMsg,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
}

export default AuthContext