import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Messages} from '../../Messages';
import {Settings} from '../../Settings';

const AppNavigator = () => {
  const Stack = createStackNavigator();
  return (

    <Stack.Navigator>
     <Stack.Screen  name="Messages" component={Messages} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>

  )
}

export default AppNavigator