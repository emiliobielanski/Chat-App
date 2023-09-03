import React, { useEffect, useState, useContext} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import  {AuthContext}  from './authentication/contexts/AuthContext';
import { Feather } from '@expo/vector-icons';



export const Messages = () => {
    const {
        userID,
        accessToken
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [userMessage, setUserMesssage] = useState("")
    const [messagesArray, setMessagesArray] = useState([])

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
                setMessagesArray(data.data);
                console.log("messages are fetched")
                setLoading(false);
            }
            
            
        } catch (error) {
           console.log("message fetch error: "
           + error)
        }
       }
       useEffect(() => {
        fetchMessages();
    }, []);

    const sendMessage = async (userMessage) => {
        try {
            const messageContent = {
                content: userMessage
            };

            const response = await fetch("https://chat-api-with-auth.up.railway.app/messages",{
                method: "POST",
                headers: {
                   'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
               },
               body: JSON.stringify(messageContent)
    
            })
            fetchMessages();
        } catch (error) {
            console.log(error)
        }
    }


    const messageItem = ({ item }) => {
        let isCurrentUserMessage = false;

        if (item.user && item.user._id === userID) {
            isCurrentUserMessage = true;
        }
        return (
          <View
            style={[styles.listContainer,
              isCurrentUserMessage ? styles.userMessage : styles.otherUserMessage]}>
            <Text style={{fontSize: 14, fontWeight: "bold"}}>{item.user ? item.user.username : 'Unknown User'}:</Text>
            <Text> {item.content}</Text>
          </View>
        );
    };
      
  
    if (loading) {
      return <Text style={{fontSize: 40}}>Loading...</Text>;
    }
  

    return (
        <View style={styles.screenContainer}>
            
           <FlatList 
           data={messagesArray}
           renderItem={messageItem}
           keyExtractor={(item) => (item._id)}
           />
            <View style= {styles.bottomBarContainer}>
            <TextInput placeholder={"Write something!"} style={styles.userTextInput}  onChangeText={(text) => (setUserMesssage(text))} />
               <Pressable onPress={() => sendMessage(userMessage)}>
                 <Feather name="send" size={32} color="black" />
                </Pressable> 
            </View>
          


        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: "azure"
    },
    listContainer: {
        borderColor: "black",
        borderWidth: 1,
        width: "45%",
        padding: 4,
        margin: 8,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
    },
    userTextInput: {
        fontSize: 24,
        flexDirection: "row",
        width: "80%"
    },
    bottomBarContainer: {
        borderWidth: 2,
        height: "6%",
        flexDirection: "row",
    },
    userMessage: {
        backgroundColor: "lightgreen"
    },
    otherUserMessage: {
        backgroundColor: "lightblue",

    }
})