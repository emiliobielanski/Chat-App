import React, { useContext } from 'react'
import { View } from 'react-native';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {AuthContext} from "../contexts/AuthContext.js"
import App from '../../../App';

export const RootNavigator = () => {
    const {accessToken} = useContext(AuthContext);
  return (
    <>
        {
            accessToken !== null
        ? <AppNavigator />
        : <AuthNavigator />  
         }
    </>
    
  )
}
