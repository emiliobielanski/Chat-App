import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../../Login';
import Register from '../../Register';



const AuthNavigator = () => {
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator>
      <Stack.Screen  name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>

  )
}

export default AuthNavigator