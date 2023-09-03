import React, { useState} from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Register = () => {
    const navigation = useNavigation()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleRegister = async () => {

        try {

            const credentials = {
                username: username,
                password: password
            };

            const response = await fetch("https://chat-api-with-auth.up.railway.app/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            })

            const data = await response.json();
            if (data.status == "200") {
                alert("User Successfully Registered! Redirecting...")
                setTimeout(function(){
                   navigation.navigate("Login")
                }, 1000);
            }  else if (data.status !== 200) {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }

    }

  return (
    <View style={styles.container}>
        <FontAwesome name="user" size={180} color="black" />
        <Text style={{marginTop: 30, alignSelf: "flex-start", marginLeft: "10%"}}>Desired Username:</Text>
        <TextInput style={styles.username}  value={username}  onChangeText={setUsername}/>
        <Text style={{alignSelf: "flex-start", marginLeft: "10%"}}>Password:</Text>
        <TextInput  style={styles.password}  value={password} onChangeText={setPassword} secureTextEntry={true}/>
        <Text style={{alignSelf: "flex-start", marginLeft: "10%"}}>Confirm Password:</Text>
        <TextInput  style={styles.password} secureTextEntry={true} />
        <Pressable style={styles.registerButton} onPress={handleRegister} >
            <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}> Register User </Text>
        </Pressable>
      
    </View>
  )
}

export default Register



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    username: {
        borderWidth: 2,
        borderColor: "black",
        width: "80%",
        marginHorizontal: 20,
        marginBottom: 16,
        marginTop: 12,
    },
    password: {
        borderWidth: 2,
        borderColor: "black",
        width: "80%",
        margin: 10,
    },
    registerButton: {
        borderColor: "darkcyan",
        borderWidth: 2,
        backgroundColor: "cadetblue",
        width: "50%",
        height: "5%",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    }
})