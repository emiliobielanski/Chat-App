import React, { createContext, useContext, useState} from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [accessToken, setAccessToken] = useState(null)
    const handleLogin = async () => {
       
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
                setAccessToken(data.data.accessToken);
                
                // Navigate to Messages screen and pass access token as a parameter
                navigation.navigate('Messages', { token: accessToken });
            } catch (error) {
                console.log("Login error:", error);
            }
        
    }
    const handleRegisterClick = () => {
        navigation.navigate("Register");
       }

    
    return (
        <AuthContext.Provider value={[accessToken, handleLogin, handleRegisterClick]}>
            {children}
        </AuthContext.Provider>
    )
}
