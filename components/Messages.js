import React, { useEffect, useState, useContext} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import  {AuthContext}  from './authentication/contexts/AuthContext';




export const Messages = () => {
    const {
        messagesArray,
        handleLogout,
    } = useContext(AuthContext);

 
    

    const messageItem = ({ item }) => (
        <View>
            <Text> {item.data.content}</Text>
        </View>
    )


    return (
        <View>
            <Pressable onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </Pressable>
            <Text>Messages Screen</Text>
           <FlatList 
           data={messagesArray}
           renderItem={messageItem}
           keyExtractor={(item) => (item.data._id)}
           />
        </View>
    );
}
