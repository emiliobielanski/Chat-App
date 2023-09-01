import React, { useContext } from 'react'
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import {AuthContext} from "../contexts/AuthContext"


const RootNavigator = () => {
    const {isLoggedIn} = useContext(AuthContext);
    console.log(isLoggedIn)
  return (
    <View>
        {
            isLoggedIn == true
        ? <AppNavigator />
        : <AuthNavigator />  
         }
    </View>
    
  )
}

export default RootNavigator