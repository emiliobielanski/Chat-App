import React, { createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Messages } from '../../Messages';


 const AuthContext = createContext();

const AuthProvider = ({children, navigation}) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userID, setUserID] = useState(null)

    const handleLogin = async (username, password) => {
       
            try {
                // Fetch access token from the API
                const credentials = {
                    username: username,
                    password: password
                };
        
                const response = await fetch("https://chat-api-with-auth.up.railway.app/auth/token", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(credentials),
                });
                if (data.status == 200) {
                    const data = await response.json();
                await AsyncStorage.setItem('accessToken', data.data.accessToken)
                setAccessToken(data.data.accessToken)
                setUserID(data.data._id)
                navigation.navigate('Messages');
                } else if (data.status !== 200){
                    alert(data.message)
                }
                
            } catch (error) {
                console.log("Login error:", error);
            }
        
    }

    

    

    const handleRegisterClick = () => {
        navigation.navigate("Register");
    }

    const handleLogout = async () => {
        console.log('handleLogout')
    
        try {
          await AsyncStorage.removeItem('accessToken')
          setAccessToken(null)
        } catch(error) {
          console.log(error)
        }
    }
    
    const isLoggedIn = async () => {

        try {
          const token = await AsyncStorage.getItem('accessToken')
          setAccessToken(token)
        } catch(error) {
          console.log(error)
        }
    }
    
    useEffect(() => {
        isLoggedIn();
    }, [])


    return (
        <AuthContext.Provider value={{
            accessToken,
            handleLogin,
            handleRegisterClick, 
            handleLogout,
            userID,}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };