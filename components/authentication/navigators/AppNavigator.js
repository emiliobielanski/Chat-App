import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Messages} from '../../Messages';
import {Profile} from '../../Profile';

const AppNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (

    <Drawer.Navigator>
     <Drawer.Screen  name="Messages" component={Messages} />
    </Drawer.Navigator>

  )
}

export default AppNavigator