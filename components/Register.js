import React from 'react'
import { Text, TextInput, View, StyleSheet, Button, Pressable } from 'react-native'
const Register = () => {
  return (
    <View style={styles.container}>

        <TextInput style={styles.username}/>
        <TextInput  style={styles.password}/>
      
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
        margin: 20,
    },
    password: {
        borderWidth: 2,
        borderColor: "black",
        width: "80%",
    }
})