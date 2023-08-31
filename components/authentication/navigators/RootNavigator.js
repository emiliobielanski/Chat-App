import React, { useContext } from 'react'
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';

import {AuthContext} from "../contexts/AuthContext"


const RootNavigator = () => {
    const {accessToken} = useContext(AuthContext);
    console.log(accessToken)
  return (
    <View>
        {
            accessToken !== null
        ? <AppNavigator />
        : <AuthNavigator />  
         }
    </View>
    
  )
}

export default RootNavigator