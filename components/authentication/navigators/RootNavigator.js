import React, { useContext } from 'react'
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {AuthContext} from "../contexts/AuthContext"
import App from '../../../App';

export const RootNavigator = () => {
    const {accessToken} = useContext(AuthContext);
    console.log(accessToken)
  return (
    <>
        {
            accessToken == null
        ? <AppNavigator />
        : <AuthNavigator />  
         }
    </>
    
  )
}
