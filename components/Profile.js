import React, {useContext, useState} from 'react'
import { Text, Pressable, View, StyleSheet } from 'react-native'
import { AuthContext } from './authentication/contexts/AuthContext'
import { FontAwesome } from '@expo/vector-icons';

export const Profile = () => {
  const {handleLogout} = useContext(AuthContext);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  return (
    <View>
       <FontAwesome name="user" size={180} color="black" />
    <Pressable onPress={() => handleLogout()}>
    <Text>Logout</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

})
