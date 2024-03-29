import React from 'react'
import { Text, BlurView, View, TouchableOpacity, StyleSheet } from 'react-native'

const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <BlurView
            style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
            }}
            blurType="dark"
            blurAmount={10}
            blurRadius={25}
            overlayColor="transparent">
            {/* <BottomTabBar {...props} /> */}
            <Text>Hello</Text>
        </BlurView>
        // <View style={{ flexDirection: 'row', backgroundColor: "#F4AF5F", height: 50, borderRadius: 50, justifyContent: "center", alignItems: "center" }}>
        //     {state.routes.map((route, index) => {
        //         const { options } = descriptors[route.key];
        //         const label =
        //             options.tabBarLabel !== undefined
        //                 ? options.tabBarLabel
        //                 : options.title !== undefined
        //                     ? options.title
        //                     : route.name;

        //         const isFocused = state.index === index;

        //         const onPress = () => {
        //             const event = navigation.emit({
        //                 type: 'tabPress',
        //                 target: route.key,
        //             });

        //             if (!isFocused && !event.defaultPrevented) {
        //                 navigation.navigate(route.name);
        //             }
        //         };

        //         const onLongPress = () => {
        //             navigation.emit({
        //                 type: 'tabLongPress',
        //                 target: route.key,
        //             });
        //         };

        //         return (
        //             <TouchableOpacity
        //                 accessibilityRole="button"
        //                 accessibilityStates={isFocused ? ['selected'] : []}
        //                 accessibilityLabel={options.tabBarAccessibilityLabel}
        //                 testID={options.tabBarTestID}
        //                 onPress={onPress}
        //                 onLongPress={onLongPress}
        //                 style={{ flex: 1, alignItems: "center" }}
        //             >
        //                 <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
        //                     {label}
        //                 </Text>
        //             </TouchableOpacity>
        //         );
        //     })}
        // </View>
    );
}

export default TabBar