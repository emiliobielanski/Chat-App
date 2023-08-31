import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Login';
import Register from '../../Register';
const Stack = createStackNavigator();


const AuthNavigator = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>

  )
}

export default AuthNavigator