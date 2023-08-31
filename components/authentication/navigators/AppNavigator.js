import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../Login';
import Register from '../../Register';
import Messages from '../../Messages';
import Settings from '../../Settings';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (

    <Stack.Navigator>
      <Stack.Screen  name="Messages" component={Messages} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>

  )
}

export default AppNavigator