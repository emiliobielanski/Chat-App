import React, { useEffect, useState} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';




const Messages = ({ route }) => {
    const { token } = route.params;
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const response = await fetch("https://chat-api-with-auth.up.railway.app/messages",{
                method: "GET",
                headers: {
                   'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
               }
    
            })
            console.log(response)
            const data = await response.json();
            console.log(data)
            if (data.status == "200") {
               setMessages(data);
            }
            
            
        } catch (error) {
            console.log(error)
        }
       }
       useEffect(() => {
        fetchMessages();
        console.log(token)
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