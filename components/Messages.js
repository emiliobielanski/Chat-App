import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';


const Messages = ({ route }) => {
    const { token } = route.params;

    const navigation = useNavigation();

    return (
        <View>
            <Text>Messages Screen</Text>
        </View>
    );
}

export default Messages