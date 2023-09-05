import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Messages} from '../../Messages';
import {Profile} from '../../Profile';
import { createStackNavigator } from '@react-navigation/stack';
  import CameraView from '../../camera/CameraView';
import ImagePreview from '../../camera/ImagePreview';

const AppNavigator = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  return (

    <Drawer.Navigator>
     <Drawer.Screen  name="MessagesDrawer" component={Messages} options={{ drawerLabel:"Messages" }} />
     <Drawer.Screen  name="Profile" component={Profile} />
     <Stack.Screen name='CameraView' component={CameraView} options={{ drawerLabel: () => null }}/>
     <Stack.Screen name='ImagePreview' component={ImagePreview} options={{ drawerLabel: () => null }}/>
    </Drawer.Navigator>

  )
}

export default AppNavigator