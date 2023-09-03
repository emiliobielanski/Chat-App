import React, { useEffect, useState, useContext} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import  {AuthContext}  from './authentication/contexts/AuthContext';




export const Messages = () => {
    const {
        handleLogout,
        accessToken
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);

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
                setMessagesArray(data);
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


    const messageItem = ({ messagesArray }) => (
      <View  style = {styles.listContainer}>
        <Text> {messagesArray.data.content}</Text>
      </View>
    );
  
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  

    return (
        <>
            <Pressable onPress={() => handleLogout()}>
                <Text>Logout</Text>
            </Pressable>


           <FlatList 
           data={messagesArray}
           renderItem={messageItem}
           keyExtractor={(item) => (item.data._id)}
           />

           
        </>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        backgroundColor: "yellow"
    },
})