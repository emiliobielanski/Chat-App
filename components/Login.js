import React, {useContext, useState} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'
import {AuthContext} from "./authentication/contexts/AuthContext"
import { useNavigation } from '@react-navigation/native';

export const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin} = useContext(AuthContext);
    const navigation = useNavigation();

    const handleRegisterClick = () => {
        navigation.navigate("Register");
    }
   

  return (
 <View style={styles.container}>

    <Text style={{alignSelf: "flex-start", marginHorizontal: "10%", fontSize: 20}}> Username </Text> 
        <TextInput style={styles.usernameTextInput}
        value={username} 
        onChangeText={setUsername}/>

    <Text  style={{alignSelf: "flex-start", marginHorizontal: "10%",fontSize: 20}}> Password </Text> 
     <TextInput  style={styles.passwordTextInput} 
     value={password}
     onChangeText={setPassword} 
     secureTextEntry={true} />

    <Pressable style={styles.loginButton} onPress={() => handleLogin(username, password)}>
        <Text style={{fontSize: 20, color: "white", fontWeight: "bold"}}>Login</Text>
    </Pressable>

    <Pressable style={styles.registerButton} onPress={() => handleRegisterClick()} >
        <Text  style={{fontSize: 18, color: "white", fontWeight: "bold"}}>Register</Text>
    </Pressable>
 </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    usernameTextInput: {
        borderWidth: 2,
        borderColor: "black",
        margin: 10,
        padding: 7,
        width: "80%",

    },
    passwordTextInput: {
        borderWidth: 2,
        borderColor: "black",
        margin: 10,
        padding: 7,
        width: "80%",
    },
    loginButton: {
        width: "60%",
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "lawngreen",
        backgroundColor: "limegreen",
        margin: 10,
        marginTop: 40,
        padding: 7,
        alignItems: "center"
    },
    registerButton: {
        width: "60%",
        borderWidth: 3,
        borderColor: "royalblue",
        borderRadius: 10,
        backgroundColor: "cadetblue",
        margin: 10,
        padding: 7,
        alignItems: "center",
    }
  });