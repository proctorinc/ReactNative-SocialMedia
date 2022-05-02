// import React from 'react';
// import { Text, StyleSheet } from 'react-native';

// import { useAuth } from '../contexts/AuthContext';
// import { View, Button } from '../components';
// import { Colors } from '../config';

// export const ConfirmEmail = () => {
//     const { currentUser, reload, sendVerification } = useAuth();

//     const handleSendVerification = async () => {
//         try {
//             await sendVerification();
//         } catch (error) { }
//         return handleSendVerification;
//     };

//     return (
//         <>
//             <View isSafe style={styles.container}>
//                 <View style={styles.center}>
//                     <Text style={styles.screenTitle}>Check your email</Text>
//                     <Text style={styles.screenInfo}>{currentUser.email}</Text>
//                     <Text style={styles.screenInfo}>
//                         We sent you an email with instructions on how to verify your email
//                         address. Click on the link in the email to get started.
//                     </Text>

//                     <Button
//                         style={styles.button}
//                         onPress={() => handleSendVerification()}>
//                         <Text style={styles.buttonText}>Resend</Text>
//                     </Button>
//                     <Button style={styles.button} onPress={reload}>
//                         <Text style={styles.buttonText}>Done</Text>
//                     </Button>
//                 </View>
//             </View>
//         </>
//     );
// };