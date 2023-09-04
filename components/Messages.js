import React, { useEffect, useState, useContext, useRef} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable, FlatList, Keyboard } from 'react-native'
import  {AuthContext}  from './authentication/contexts/AuthContext';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile } from './Profile';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export const Messages = () => {
    const Tab = createBottomTabNavigator();

    const {
        userID,
        accessToken
    } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [userMessage, setUserMesssage] = useState("")
    const [messagesArray, setMessagesArray] = useState([])
    const flatListRef = useRef(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`https://chat-api-with-auth.up.railway.app/messages`,{
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
                flatListRef.current.scrollToOffset({ offset: 0, animated: true });
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
            Keyboard.dismiss()
            setUserMesssage("");
            fetchMessages();
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMessage = async (itemID) => {
        try {
            const response = await fetch(`https://chat-api-with-auth.up.railway.app/messages/${itemID}`,{
                method: "DELETE",
                headers: {
                   'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
               }
            
            })
            const deleteData = response.json();
            console.log(deleteData)
        } catch (error) {
            console.log(error)
        }
    }



    const messageItem = ({ item }) => {

        return (
          <View style={[styles.listContainer,
                item.user && item.user._id === userID ? styles.userMessage : styles.otherUserMessage]}>
         <Text style={{fontSize: 14, fontWeight: "bold"}}>{item.user ? item.user.username : 'Unknown User'}:</Text>
           { item.user && item.user._id === userID
        ?  <Text> {item.content} <MaterialIcons name="delete-forever" size={30} color="black" onPress={() => deleteMessage(item._id)} /> </Text> 
        :  <Text> {item.content} </Text> }
          </View>
        );
    };
      
  
    if (loading) {
      return <Text style={{fontSize: 40}}>Loading...</Text>;
    }
  

    return (
        <Tab.Navigator>
            <Tab.Screen name="Messages" options={{ tabBarLabel: 'Messages', tabBarIcon: () => <MaterialCommunityIcons name="message" size={30} color="black" />, tabBarLabelStyle: {fontSize: 14,}}}>
            {() => (
             <View style={styles.screenContainer} >
            
                <FlatList 
                ref={flatListRef}
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
               )}
            </Tab.Screen >
        <Tab.Screen name="Profile" component={Profile}
           options={{
            tabBarIcon: () => <FontAwesome name="user-circle" size={30} color="black" /> ,
            tabBarLabelStyle: {fontSize: 14,}
          }} />
        </Tab.Navigator>
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
        backgroundColor: "lightgreen",
        justifyContent: "flex-end",
        borderBottomRightRadius: 0,
        marginLeft: "auto"
    },
    otherUserMessage: {
        backgroundColor: "lightblue",
        borderBottomLeftRadius: 0,
    }
})