import React from 'react'
import { Text } from 'react-native'
import { AuthContext } from './authentication/contexts/AuthContext'

export const Settings = () => {
  const {handleLogout} = useContext(AuthContext);
  return (
    <Pressable onPress={() => handleLogout()}>
    <Text>Logout</Text>
    </Pressable>
  )
}

