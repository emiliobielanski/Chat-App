import React, { createContext, useContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';



 const AuthContext = createContext();

 const AuthProvider = ({children, navigation}) => {

    const [accessToken, setAccessToken] = useState(null)
    const [messagesArray, setMessagesArray] = useState([])

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
                console.log(data)
                await AsyncStorage.setItem('accessToken', data.data.accessToken)
                setAccessToken(data.data.accessToken)
                console.log(accessToken)
                navigation.navigate('Messages');
            } catch (error) {
                console.log("Login error:", error);
            }
        
    }

    

    const fetchMessages = async () => {
        try {
            const response = await fetch("https://chat-api-with-auth.up.railway.app/messages",{
                method: "GET",
                headers: {
                   'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
               }
    
            })
            const data = await response.json();
            if (data.status == "200") {
                setMessagesArray(data);
            }
            
            
        } catch (error) {
           console.log(error)
        }
       }
       useEffect(() => {
        fetchMessages();
    }, []);

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
    
    return (
        <AuthContext.Provider value={[
            accessToken,
            handleLogin,
            handleRegisterClick, 
            fetchMessages,
            messagesArray,
            handleLogout,]}>
            {children}
        </AuthContext.Provider>
    )
}
export { AuthContext, AuthProvider };