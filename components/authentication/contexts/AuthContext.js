import React, { createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Messages } from '../../Messages';



 const AuthContext = createContext();

const AuthProvider = ({children, navigation}) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userID, setUserID] = useState("")
    const [username, setUsername] = useState("")
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
                const data = await response.json();
                
                
                if (data.status == 200) {
                await AsyncStorage.setItem('accessToken', data.data.accessToken)
                setAccessToken(data.data.accessToken)
                await AsyncStorage.setItem('userID', data.data._id)
                setUserID(data.data._id)
                await AsyncStorage.setItem("username", data.data.username)
                setUsername(data.data.username)
                console.log(username)
                navigation.navigate('Messages');

                } else if (data.status !== 200){
                    alert(data.message)
                }
                
            } catch (error) {
                console.log("Login error:", error);
            }
        
    }

    

    

   

    const handleLogout = async () => {
        console.log('handleLogout')
    
        try {
          await AsyncStorage.removeItem('accessToken')
          setAccessToken(null)
          await AsyncStorage.removeItem('userID')
          setUserID(null)
          await AsyncStorage.removeItem('username')
          setUsername(null)
        } catch(error) {
          console.log(error)
        }
    }
    
    const isLoggedIn = async () => {

        try {
          const token = await AsyncStorage.getItem('accessToken')
          setAccessToken(token)
          const loggedinID = await AsyncStorage.getItem('userID')
          setUserID(loggedinID)
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
            handleLogout,
            userID,
            username,
            setUsername}}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };