import React, { useEffect, useState, useContext} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from './authentication/contexts/AuthContext';




const Messages = () => {
    const {accessToken} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch("https://chat-api-with-auth.up.railway.app/messages",{
                method: "GET",
                headers: {
                   'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
               }
    
            })
            const data = await response.json();
            if (data.status == "200") {
               setMessages(data);
            }
            
            
        } catch (error) {
            console.log(error)
        }
       }
       useEffect(() => {
        fetchMessages();
    }, []);

    const messageItem = ({ item }) => (
        <View>
            <Text> {item.data.content}</Text>
        </View>
    )


    return (
        <View>
            <Text>Messages Screen</Text>
           <FlatList 
           data={messages}
           renderItem={messageItem}
           keyExtractor={(item) => (item.data._id)}
           />
        </View>
    );
}

export default Messages